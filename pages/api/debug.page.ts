import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore'
import {
  CodingLanguages,
  EssayLength,
  PoemType,
  PointOfView,
  QuoteMap,
  SummaryMethod,
  UsageDetails,
} from 'types'
import initializeFirebaseApp from '../../utils/initializeFirebase'
import { TemplateId } from '../templates/templates'

export const config = {
  runtime: 'edge',
}

initializeFirebaseApp()

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
    coding_language: codingLanguage,
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
    coding_language: CodingLanguages
  } = await request.json()

  // if (!(await isUserValid(userId))) {
  //   console.error('User', userId, 'does not exist')
  //   return new Response(null, {
  //     status: 401,
  //     statusText: 'Unauthorized',
  //   })
  // }

  // const {
  //   monthly_allowance: monthlyAllowance,
  //   monthly_usage: monthlyUsage,
  //   bonus_allowance: bonusAllowance,
  // } = await getUsageDetails(userId)

  // if (monthlyUsage >= monthlyAllowance + bonusAllowance) {
  //   console.error(userId, 'usage limit reached')
  //   return new Response(null, {
  //     status: 400,
  //     statusText: 'Usage limit reached',
  //   })
  // }

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
      openaiPrompt = `Rewrite the following using different words:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.SUMMARIZER_ID:
      switch (summaryMethod) {
        // couldn't use SummaryMethod here because of edge runtime doesn't support the eval() function
        case SummaryMethod.BULLET_POINTS:
          openaiPrompt = `Summarize the following with bullet points:\n\n${prompt}`
          break
        case SummaryMethod.TLDR:
          openaiPrompt = `${prompt}\n\nTl;dr\n`
          break
        case SummaryMethod.PARAGRAPH:
          openaiPrompt = `Summarize the following:\n\n${prompt}`
          break
        default:
          openaiPrompt = `Summarize the following:\n\n${prompt}`
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
      openaiPrompt = `You are Inkey, an AI assistant for students. Reply to the following prompt:\n\n${prompt}`
      model = 'text-davinci-003'
      temperature = 0.25
      break
    case TemplateId.TRANSLATOR_ID:
      openaiPrompt = `Translate the following into ${language}:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.STORY_ID:
      openaiPrompt = `Write a story with the following title: "${prompt}".`
      model = 'text-davinci-003'
      break
    case TemplateId.BODY_PARAGRAPH_ID:
      openaiPrompt = `Write a paragraph expanding on the following idea:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.INTRODUCTION_PARAGRAPH_ID:
      openaiPrompt = `Write a long introduction paragraph for the following thesis:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.CONCLUSION_PARAGRAPH_ID:
      openaiPrompt = `Write a long conclusion paragraph for the following essay:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.DISCUSSION_BOARD_RESPONSE_ID:
      openaiPrompt = `Respond to the following discussion board post/s:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.LINKEDIN_BIO_ID:
      openaiPrompt = `Write a LinkedIn bio for someone with the following resume:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.COVER_LETTER_ID:
      openaiPrompt = `Write a cover letter for someone with the following resume:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.RESUME_BULLET_POINTS_ID:
      openaiPrompt = `Write resume bullet points for someone with the following experience:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.CODING_QUESTION_SOLVER_ID:
      openaiPrompt = `Answer the following coding question. Show an optimized version and an unoptimized version. Give big o notation for each solution. Explain your work.\n\n${prompt}`
      temperature = 0.25
      model = 'text-davinci-003'
      break
    case TemplateId.FUNCTION_ID:
      openaiPrompt = `Write a function that does the following:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.CLASS_ID:
      openaiPrompt = `Write a class that represents the following:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.SCRIPT_ID:
      openaiPrompt = `Write a script that does the following:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.REGEX_ID:
      openaiPrompt = `Write a regular expression that matches the following:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    case TemplateId.EXPLAIN_CODE_ID:
      openaiPrompt = `Rewrite the following code with comments explaining each line:\n\n${prompt}`
      model = 'text-davinci-003'
      break
    default:
      return new Response(null, {
        status: 400,
        statusText: 'Bad Request',
      })
  }

  if (length == EssayLength.LONG) {
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

  if (language && id != TemplateId.TRANSLATOR_ID) {
    openaiPrompt += ` Write in ${language}.`
  }

  if (codingLanguage) {
    openaiPrompt += ` Write in ${codingLanguage}.`
  }

  try {
    console.log('Fetching ouput for', userId)
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
          console.log('Output fetched for', userId)
          console.log('Output:', output)
          await updateUserWordsGenerated(
            userId,
            Math.round(output.length / 4.5),
          )
        },
      }),
    )

    return new Response(transformedResponse, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    return new Response(null, {
      status: 500,
      statusText: 'Server Error',
    })
  }
}

const isError = (chunk: string) => {
  try {
    if (JSON.parse(chunk).error) return true
  } catch (e) {}
  return false
}

async function updateUserWordsGenerated(
  userId: string,
  numberOfWordsGenerated: number,
) {
  console.log('Updating words generated for ', userId)

  const db = getFirestore()
  const usageDetailsDocRef = doc(db, 'usage_details', userId)
  const docSnapshot = await getDoc(usageDetailsDocRef)

  if (docSnapshot.exists()) {
    const {
      monthly_allowance: monthlyAllowance,
      monthly_usage: monthlyUsage,
      bonus_allowance: bonusAllowance,
    } = docSnapshot.data() as UsageDetails

    // case: monthly usage < allowance
    // add to monthly usage (if > allowance, set equal to allowance)
    if (monthlyUsage < monthlyAllowance) {
      if (monthlyUsage + numberOfWordsGenerated > monthlyAllowance) {
        await updateDoc(usageDetailsDocRef, {
          monthly_usage: monthlyAllowance,
          total_usage: increment(numberOfWordsGenerated),
        })
      } else {
        await updateDoc(usageDetailsDocRef, {
          monthly_usage: increment(numberOfWordsGenerated),
          total_usage: increment(numberOfWordsGenerated),
        })
      }
    } else {
      // case: monthly usage > allowance
      // double check to make sure bonus allowance is not 0, then subtract from bonus allowance (if > bonus allowance, set bonus allowance to 0)
      if (bonusAllowance <= 0) {
        console.log(
          'Error: user should not have been able to call this: ',
          userId,
        )
      } else {
        if (numberOfWordsGenerated > bonusAllowance) {
          await updateDoc(usageDetailsDocRef, {
            bonus_allowance: 0,
            total_usage: increment(numberOfWordsGenerated),
          })
        } else {
          await updateDoc(usageDetailsDocRef, {
            bonus_allowance: increment(-1 * numberOfWordsGenerated),
            total_usage: increment(numberOfWordsGenerated),
          })
        }
      }
    }
  } else {
    console.log("Error: document doesn't exist for user: ", userId)
  }
}

async function isUserValid(userId: string) {
  const db = getFirestore()
  const usageDetailsDocRef = doc(db, 'usage_details', userId)
  const docSnapshot = await getDoc(usageDetailsDocRef)
  return docSnapshot.exists()
}

async function getUsageDetails(userId: string): Promise<UsageDetails> {
  const db = getFirestore()
  const usageDetailsDocRef = doc(db, 'usage_details', userId)
  const docSnapshot = await getDoc(usageDetailsDocRef)
  return docSnapshot.data() as UsageDetails
}
