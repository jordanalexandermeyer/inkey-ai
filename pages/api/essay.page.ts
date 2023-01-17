import { NextRequest, NextResponse } from 'next/server'
import {
  Paragraph,
  Paragraphs,
} from 'pages/documents/new-essay/components/NewEssayContextProvider'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const title = body.title
  const paragraphs: Paragraphs = body.paragraphs

  const prompts = [
    `Write an introduction paragraph for an essay titled, "${title}". It must contain an attention grabber for the reader. Ensure that the intro moves from general to specific in regards to the topic. Provide the reader with a "road map" of the essay in a logical order. At the end there should be a thesis statement. The thesis statement states the aim of the paper and may give insight into the author's examples and evidence.`,
  ]

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i]
    const paragraphPrompt = `Convert the following into a descriptive and extensive paragraph.\n${convertParagraphToOutline(
      paragraph,
    )}`
    prompts.push(paragraphPrompt)
  }

  prompts.push(`Write a conclusion paragraph for an essay titled, "${title}".`)

  const responses = await Promise.all(
    prompts.map(async (prompt) => {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt,
          temperature: 1,
          top_p: 0.9,
          max_tokens: 1000,
          user: userId || '',
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      })
      return await response.json()
    }),
  )

  let essayBody = ''

  for (let i = 0; i < responses.length; i++) {
    const text = responses[i].choices[0].text.trim()
    essayBody += text + '\n\n'
  }

  return NextResponse.json({ body: essayBody })
}

const convertParagraphToOutline = (paragraph: Paragraph) => {
  const argument = paragraph.argument
  const paragraphComponents = paragraph.paragraph
  let outline = `Topic: ${argument}\n`
  for (let i = 0; i < paragraphComponents.length; i++) {
    const paragraphComponent = paragraphComponents[i]
    const title = paragraphComponent.title
    const sentences = paragraphComponent.sentences
    outline += `${convertIndexToParagraphComponentPrefix(i) + title}\n`
    for (let j = 0; j < sentences.length; j++) {
      const sentence = sentences[j]
      outline += `${convertIndexToSentencePrefix(j) + sentence}\n`
    }
  }
  return outline
}

const convertIndexToParagraphComponentPrefix = (index: number) => {
  if (index === 0) return 'I. '
  if (index === 1) return 'II. '
  if (index === 2) return 'III. '
  if (index === 3) return 'IV. '
  if (index === 4) return 'V. '
  throw { message: 'Cannot convert index to roman outline character', index }
}

const convertIndexToSentencePrefix = (index: number) => {
  if (index === 0) return 'A. '
  if (index === 1) return 'B. '
  if (index === 2) return 'C. '
  if (index === 3) return 'D. '
  if (index === 4) return 'E. '
  throw { message: 'Cannot convert index to alpha outline character', index }
}
