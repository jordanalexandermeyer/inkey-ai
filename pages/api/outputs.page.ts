initializeFirebaseApp()
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import initializeFirebaseApp from '../../lib/initializeFirebase'
import { EssayId } from '../templates/templates'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(request: Request, response: Response) {
  const {
    id,
    userId,
    inputs: { prompt },
    references,
  } = await request.json()

  let openaiPrompt
  let model

  switch (id) {
    case EssayId.GENERAL_ESSAY_ID:
      openaiPrompt = `Write an essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.THESIS_ID:
      openaiPrompt = `Write a one sentence thesis statement that contains three supporting points for an essay with the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.COLLEGE_APP_ESSAY_ID:
      openaiPrompt = `Write a college application essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.PERSUASIVE_ESSAY_ID:
      openaiPrompt = `Write a persuasive essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.EXPOSITORY_ESSAY_ID:
      openaiPrompt = `Write an expository essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.COMPARE_CONTRAST_ESSAY_ID:
      openaiPrompt = `Write a compare and contrast essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.ARGUMENTATIVE_ESSAY_ID:
      openaiPrompt = `Write an argumentative essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.CAUSE_EFFECT_ESSAY_ID:
      openaiPrompt = `Write a cause and effect essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.NARRATIVE_ESSAY_ID:
      openaiPrompt = `Write a narrative essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.DEFINITION_ESSAY_ID:
      openaiPrompt = `Write a definition essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.DESCRIPTIVE_ESSAY_ID:
      openaiPrompt = `Write a descriptive essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    case EssayId.LITERARY_ESSAY_ID:
      openaiPrompt = `Write a literary essay that answers the following prompt: "${prompt}"`
      model = 'text-davinci-003'
      break
    default:
      return new Response(null, {
        status: 400,
        statusText: 'Bad Request',
      })
  }

  if (references) {
    openaiPrompt +=
      ' Provide data to support your claims with specific sources. Provide references at the end of the essay citing your sources.'
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        stream: true,
        model: model,
        prompt: openaiPrompt,
        temperature: 1,
        top_p: 0.9,
        max_tokens: 1500,
        user: userId || '',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    })

    const stream = response.body

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let chunkNumber = 0
    let output = ''
    let incompleteChunk = ''

    const transformedResponse = stream!.pipeThrough(
      new TransformStream({
        start(controller) {},
        transform(chunk, controller) {
          // get chunk in string format
          const textChunk = decoder.decode(chunk)

          // separate chunks into lines of data
          const listOfChunks = textChunk.split('\n\n')

          // iterate through chunks
          for (let i = 0; i < listOfChunks.length; i++) {
            // if string is empty, continue
            if (!listOfChunks[i]) continue

            let fullChunk = listOfChunks[i]

            // if incompleteChunk not empty, append it to front of chunk then clear incompleteChunk
            if (incompleteChunk) {
              fullChunk = incompleteChunk + listOfChunks[i]
              incompleteChunk = ''
            }

            // if chunk is last chunk, break
            if (fullChunk.slice(6) == '[DONE]') {
              break
            }

            // if chunk is data, parse it and append it to output
            try {
              const parsedData = JSON.parse(fullChunk.slice(6))
              const text = parsedData.choices[0].text
              if (text == '\n' && chunkNumber < 2) continue // beginning response usually has 2 new lines
              controller.enqueue(encoder.encode(text))
              output += text
              chunkNumber++
            } catch (error) {
              // if chunk is incomplete, store it in incompleteChunk and continue
              incompleteChunk = fullChunk
              continue
            }
          }
        },
        async flush(controller) {
          await updateUserWordsGenerated(userId, output.split(' ').length)
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
