initializeFirebaseApp()
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore'
import {
  EssayLength,
  PoemType,
  PointOfView,
  QuoteMap,
  SummaryMethod,
} from 'types'
import initializeFirebaseApp from '../../utils/initializeFirebase'
import { TemplateId } from '../templates/templates'

export const config = {
  runtime: 'experimental-edge',
}

const isError = (chunk: string) => {
  try {
    if (JSON.parse(chunk).error) return true
  } catch (e) {}
  return false
}

export default async function handler(request: Request, response: Response) {
  const {
    id,
    userId,
    inputs: { prompt },
    references,
    quotes,
    length,
    tone,
    point_of_view: pointOfView,
    summary_method: summaryMethod,
    poem_type: poemType,
    language,
  }: {
    id: TemplateId | string
    userId: string
    inputs: { prompt: string }
    references: boolean
    quotes?: QuoteMap
    length: EssayLength
    tone: string
    point_of_view: PointOfView
    summary_method: SummaryMethod
    poem_type: PoemType
    language: string
  } = await request.json()

  let openaiPrompt
  let model
  let temperature

  switch (id) {
    case TemplateId.GENERAL_ESSAY_ID:
      openaiPrompt = `Write an essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.THESIS_ID:
      openaiPrompt = `Write a one sentence thesis statement that contains three supporting points for an essay with the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.COLLEGE_APP_ESSAY_ID:
      openaiPrompt = `Write a college application essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.PERSUASIVE_ESSAY_ID:
      openaiPrompt = `Write a persuasive essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.EXPOSITORY_ESSAY_ID:
      openaiPrompt = `Write an expository essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.COMPARE_CONTRAST_ESSAY_ID:
      openaiPrompt = `Write a compare and contrast essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.ARGUMENTATIVE_ESSAY_ID:
      openaiPrompt = `Write an argumentative essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.CAUSE_EFFECT_ESSAY_ID:
      openaiPrompt = `Write a cause and effect essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.NARRATIVE_ESSAY_ID:
      openaiPrompt = `Write a narrative essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.DEFINITION_ESSAY_ID:
      openaiPrompt = `Write a definition essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.DESCRIPTIVE_ESSAY_ID:
      openaiPrompt = `Write a descriptive essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.LITERARY_ESSAY_ID:
      openaiPrompt = `Write a literary essay that answers the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.SCIENTIFIC_ESSAY_ID:
      openaiPrompt = `Write a scientific essay that answers the following prompt: "${prompt}". Use long scientific words.`
      model = 'text-davinci-003'
      break
    case TemplateId.BLOG_ID:
      openaiPrompt = `Write a blog post with the following title: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.PARAPHRASER_ID:
      openaiPrompt = `Rewrite the following using different words: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.SUMMARIZER_ID:
      switch (summaryMethod) {
        // couldn't use SummaryMethod here because of edge runtime doesn't support the eval() function
        case 'bullet-points':
          openaiPrompt = `Summarize the following with bullet points: "${prompt}".`
          break
        case 'TLDR':
          openaiPrompt = `"${prompt}"\n\nTl;dr\n`
          break
        case 'paragraph':
          openaiPrompt = `Summarize the following: "${prompt}".`
          break
        default:
          openaiPrompt = `Summarize the following: "${prompt}".`
          break
      }
      model = 'text-davinci-003'
      break
    case TemplateId.POEM_ID:
      openaiPrompt = `Write a/an ${poemType} with the following title: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.SPEECH_ID:
      openaiPrompt = `Write a speech with the following title: "${prompt}".`
      model = 'text-davinci-003'
      break
    case 'ask-inkey':
      openaiPrompt = `You are Inkey, an AI writing assistant for students. Reply to the following prompt: "${prompt}".`
      model = 'text-davinci-003'
      temperature = 0.25
      break
    case TemplateId.TRANSLATOR:
      openaiPrompt = `Translate the following into ${language}: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.STORY:
      openaiPrompt = `Write a story with the following title: "${prompt}".`
      model = 'text-davinci-003'
      break
    default:
      return new Response(null, {
        status: 400,
        statusText: 'Bad Request',
      })
  }

  if (length == 'long') {
    // couldn't use EssayLength.LONG here because of edge runtime doesn't support the eval() function
    openaiPrompt =
      `In approximately 1000 words, ` +
      openaiPrompt[0].toLowerCase() +
      openaiPrompt.slice(1)

    openaiPrompt +=
      ' Use numerous examples for each argument presented. Please be as detailed as possible.'
  }

  if (quotes) {
    openaiPrompt += ' Include the following quotes: \n'
    for (const index in Object.keys(quotes)) {
      openaiPrompt += quotes[index].value + '\n'
    }
    openaiPrompt += "Don't include any other quotes."
  }

  if (references) {
    openaiPrompt +=
      ' Provide data to support your claims with specific sources. Provide references at the end of the essay citing your sources.'
  }

  if (tone) {
    openaiPrompt += ` Use the following tone: "${tone}".`
  }

  if (pointOfView) {
    openaiPrompt += ` Use ${pointOfView} person point of view.`
  }

  if (language && id != TemplateId.TRANSLATOR) {
    openaiPrompt += ` Write in ${language}.`
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        stream: true,
        model: model,
        prompt: openaiPrompt,
        temperature: temperature || 1,
        top_p: 0.9,
        max_tokens: 1000,
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
              if (isError(fullChunk)) {
                controller.enqueue(
                  encoder.encode(
                    'The chat has reached its maximum length. Please "Clear chat" to continue chatting with Inkey.',
                  ),
                )
                break
              }
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
        async flush() {
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
  const docRef = doc(db, 'usage_details', userId)
  const docSnapshot = await getDoc(docRef)

  if (docSnapshot.exists()) {
    await updateDoc(docRef, {
      monthly_usage: increment(numberOfWordsGenerated),
      total_usage: increment(numberOfWordsGenerated),
    })
  } else {
    console.log("Error: document doesn't exist for user: ", userId)
  }
}
