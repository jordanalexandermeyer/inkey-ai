initializeFirebaseApp()
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  COLLEGE_APP_ESSAY_ID,
  COMPARE_CONTRAST_ESSAY_ID,
  EXPOSITORY_ESSAY_ID,
  GENERAL_ESSAY_ID,
  PERSUASIVE_ESSAY_ID,
  THESIS_ID,
} from '../../lib/constants'
import initializeFirebaseApp from '../../lib/initializeFirebase'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(request: Request, response: Response) {
  const {
    id,
    userId,
    inputs: { prompt },
  } = await request.json()

  let openaiPrompt
  let model

  switch (id) {
    case GENERAL_ESSAY_ID:
      openaiPrompt = `Write an essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case THESIS_ID:
      openaiPrompt = `Write a one sentence thesis statement that contains three supporting points for an essay with the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case COLLEGE_APP_ESSAY_ID:
      openaiPrompt = `Write a college application essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
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
      return new Response(null, {
        status: 400,
        statusText: 'Bad Request',
      })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        stream: true,
        model: model,
        prompt: openaiPrompt,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 1000,
        stop: '##',
        frequency_penalty: 0.75,
        user: userId || '',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    })

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = response.body

    let chunkNumber = 0
    let chunks = ''

    const transformedResponse = stream!.pipeThrough(
      new TransformStream({
        start(controller) {},
        transform(chunk, controller) {
          const readableChunk = decoder.decode(chunk)
          const listOfData = getListedDataFromChunk(readableChunk)
          for (let i = 0; i < listOfData.length; i++) {
            const data = listOfData[i]
            if (data == '[DONE]') {
              break
            }
            const parsedData = JSON.parse(data)
            const text = parsedData.choices[0].text
            if (text == '\n' && chunkNumber < 2) continue // beginning response usually has 2 new lines
            controller.enqueue(encoder.encode(text))
            chunks += text
            chunkNumber++
          }
        },
        async flush(controller) {
          await updateUserWordsGenerated(userId, chunks.split(' ').length)
        },
      }),
    )

    return new Response(transformedResponse, {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(null, {
      status: 500,
      statusText: 'Server Error',
    })
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
