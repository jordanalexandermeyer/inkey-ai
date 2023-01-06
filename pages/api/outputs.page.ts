import {
  CodingLanguages,
  EssayLength,
  PoemType,
  PointOfView,
  QuoteMap,
  SummaryMethod,
} from 'types'
import { TemplateId } from '../templates/templates'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request, response: Response) {
  const {
    id,
    userId,
    inputs: { prompt },
    quotes,
    length,
    tone,
    point_of_view: pointOfView,
    summary_method: summaryMethod,
    poem_type: poemType,
    language,
    coding_language: codingLanguage,
    content,
  }: {
    id: TemplateId | string
    userId: string
    inputs: { prompt: string }
    quotes?: QuoteMap
    length: EssayLength
    tone: string
    point_of_view: PointOfView
    summary_method: SummaryMethod
    poem_type: PoemType
    language: string
    coding_language: CodingLanguages
    content: string
  } = await request.json()

  let openaiPrompt
  let model
  let temperature
  let tokens

  switch (id) {
    case TemplateId.GENERAL_ESSAY_ID:
      openaiPrompt = `Write an essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.THESIS_ID:
      openaiPrompt = `Write a one sentence thesis statement that contains three supporting points for an essay with the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.COLLEGE_APP_ESSAY_ID:
      openaiPrompt = `Write a college application essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.PERSUASIVE_ESSAY_ID:
      openaiPrompt = `Write a persuasive essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.EXPOSITORY_ESSAY_ID:
      openaiPrompt = `Write an expository essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.COMPARE_CONTRAST_ESSAY_ID:
      openaiPrompt = `Write a compare and contrast essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.ARGUMENTATIVE_ESSAY_ID:
      openaiPrompt = `Write an argumentative essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.CAUSE_EFFECT_ESSAY_ID:
      openaiPrompt = `Write a cause and effect essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.NARRATIVE_ESSAY_ID:
      openaiPrompt = `Write a narrative essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.DEFINITION_ESSAY_ID:
      openaiPrompt = `Write a definition essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.DESCRIPTIVE_ESSAY_ID:
      openaiPrompt = `Write a descriptive essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.LITERARY_ESSAY_ID:
      openaiPrompt = `Write a literary essay that answers the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.SCIENTIFIC_ESSAY_ID:
      openaiPrompt = `Write a scientific essay that answers the following prompt. Use long scientific words.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.BLOG_ID:
      openaiPrompt = `Write a blog post with the following title.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.PARAPHRASER_ID:
      openaiPrompt = `Rewrite the following using different words.\n${prompt}\n`
      model = 'text-davinci-003'
      tokens = 2000
      break
    case TemplateId.SUMMARIZER_ID:
      switch (summaryMethod) {
        // couldn't use SummaryMethod here because of edge runtime doesn't support the eval() function
        case SummaryMethod.BULLET_POINTS:
          openaiPrompt = `Summarize the following with bullet points.\n${prompt}\n`
          break
        case SummaryMethod.PARAGRAPH:
          openaiPrompt = `Summarize the following.\n${prompt}\n`
          break
        default:
          openaiPrompt = `Summarize the following.\n${prompt}\n`
          break
      }
      model = 'text-davinci-003'
      break
    case TemplateId.POEM_ID:
      openaiPrompt = `Write a/an ${poemType} with the following title.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.SPEECH_ID:
      openaiPrompt = `Write a speech with the following title.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case 'ask-inkey':
      openaiPrompt = `You are Inkey, an AI assistant for students. You can write essays, solve coding questions, do homework, and more. Reply to the following prompt.\n${prompt}\n`
      model = 'text-davinci-003'
      temperature = 0.25
      break
    case TemplateId.TRANSLATOR_ID:
      openaiPrompt = `Translate the following into ${language}.\n${prompt}\n`
      model = 'text-davinci-003'
      tokens = 2000
      break
    case TemplateId.STORY_ID:
      openaiPrompt = `Write a story with the following title.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.BODY_PARAGRAPH_ID:
      openaiPrompt = `Write a paragraph expanding on the following idea.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.INTRODUCTION_PARAGRAPH_ID:
      openaiPrompt = `Write a long introduction paragraph for the following thesis.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.CONCLUSION_PARAGRAPH_ID:
      openaiPrompt = `Write a long conclusion paragraph for the following essay:\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.DISCUSSION_BOARD_RESPONSE_ID:
      openaiPrompt = `Respond to the following discussion board post/s.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.LINKEDIN_BIO_ID:
      openaiPrompt = `Write a LinkedIn bio for someone with the following resume.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.COVER_LETTER_ID:
      openaiPrompt = `Write a cover letter for someone with the following resume.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.RESUME_BULLET_POINTS_ID:
      openaiPrompt = `Write resume bullet points for someone with the following experience.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.CODING_QUESTION_SOLVER_ID:
      openaiPrompt = `Answer the following coding question. Show an unoptimized version first, then an optimized version. After writing solutions, give the big O notation for each solution. Explain why the optimized solution is more efficient.\n${prompt}\n`
      temperature = 0.25
      tokens = 2000
      model = 'text-davinci-003'
      break
    case TemplateId.FUNCTION_ID:
      openaiPrompt = `Write a function that does the following.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.CLASS_ID:
      openaiPrompt = `Write a class that represents the following.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.SCRIPT_ID:
      openaiPrompt = `Write a script that does the following.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.REGEX_ID:
      openaiPrompt = `Write a regular expression that matches the following.\n${prompt}\n`
      model = 'text-davinci-003'
      break
    case TemplateId.EXPLAIN_CODE_ID:
      openaiPrompt = `Rewrite the following code with comments explaining each line.\n${prompt}\n`
      tokens = 2000
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
    openaiPrompt += ' Include each of the following quotes only once: \n'
    for (const index in Object.keys(quotes)) {
      openaiPrompt += quotes[index].value + '\n'
    }
    openaiPrompt += "Don't include any other quotes."
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

  if (content) {
    openaiPrompt += ` Incorporate the following content.\n${content}\n`
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
        max_tokens: tokens || 1000,
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
              chunkNumber++
            } catch (error) {
              // if chunk is incomplete, store it in incompleteChunk and continue
              incompleteChunk = fullChunk
              continue
            }
          }
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
