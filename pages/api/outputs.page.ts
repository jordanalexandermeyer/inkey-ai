initializeFirebaseApp()
import axios from 'axios'
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  COMMON_APP_ESSAY_ID,
  COMPARE_CONTRAST_ESSAY_ID,
  EXPOSITORY_ESSAY_ID,
  FIVE_PARAGRAPH_ESSAY_ID,
  PERSUASIVE_ESSAY_ID,
  THESIS_ID,
} from '../../lib/constants'
import initializeFirebaseApp from '../../lib/initializeFirebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    id,
    userId,
    inputs: { prompt },
  } = req.body

  let openaiPrompt
  let model

  switch (id) {
    case FIVE_PARAGRAPH_ESSAY_ID:
      openaiPrompt = `Write an essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case THESIS_ID:
      openaiPrompt = `Write a one sentence thesis statement that contains three supporting points for an essay with the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case COMMON_APP_ESSAY_ID:
      openaiPrompt = `${prompt}\n\n###\n\n`
      model = 'davinci:ft-personal-2022-11-05-02-06-03'
      break
    case PERSUASIVE_ESSAY_ID:
      openaiPrompt = `Write a persuasive essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EXPOSITORY_ESSAY_ID:
      openaiPrompt = `Write an expository essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case COMPARE_CONTRAST_ESSAY_ID:
      openaiPrompt = `Write a compare and contrast essay that answers the following prompt: ${prompt}`
      model = 'text-davinci-003'
      break
    default:
      res.status(400).json('Bad Request')
      res.end()
      return
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        stream: true,
        model: model,
        prompt: openaiPrompt,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 1000,
        stop: '##',
        frequency_penalty: 0.75,
        user: userId || '',
      },
      {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      },
    )

    const stream = response.data

    let chunkNumber = 0
    let chunks = ''

    for await (const chunk of stream) {
      const readableChunk = chunk.toString()
      try {
        const listOfData = getListedDataFromChunk(readableChunk)
        for (let i = 0; i < listOfData.length; i++) {
          const data = listOfData[i]
          if (data == '[DONE]') {
            break
          }
          const parsedData = JSON.parse(data)
          const text = parsedData.choices[0].text
          if (text == '\n' && chunkNumber < 2) continue // beginning response usually has 2 new lines
          res.write(text)
          chunks += text
        }
      } catch (error) {
        console.log(error)
      }
      chunkNumber++
    }

    await updateUserWordsGenerated(userId, chunks.split(' ').length)

    return res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).json('Server Error')
    return res.end()
  }
}

function getListedDataFromChunk(chunk: string): Array<string> {
  const datum = [...chunk.matchAll(/(?<=data: ).*$/gm)]
  const listOfData: Array<string> = []
  for (let i = 0; i < datum.length; i++) {
    listOfData.push(datum[i][0])
  }
  return listOfData
}

async function updateUserWordsGenerated(
  userId: string,
  numberOfWordsGenerated: number,
) {
  const db = getFirestore()
  const counterRef = doc(db, 'counters', userId)
  const counterSnap = await getDoc(counterRef)

  if (counterSnap.exists()) {
    await updateDoc(counterRef, {
      words_generated: increment(numberOfWordsGenerated),
    })
  } else {
    await setDoc(counterRef, {
      words_generated: numberOfWordsGenerated,
    })
  }
}
