import { NextRequest, NextResponse } from 'next/server'
import {
  Paragraph,
  Paragraphs,
} from '../../pages/documents/new-essay/components/NewEssayContextProvider'
import romans from 'romans'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const prompt = body.prompt
  const thesis = body.thesis
  const paragraphs: Paragraphs = body.paragraphs
  const args = paragraphs.map((paragraph) => paragraph.argument)

  const prompts = [
    `Prompt: ${prompt}\nThesis: ${thesis}\nWrite a title for an essay with the above prompt and thesis. Do not provide context.\n`,
    `${convertArgsToOutline(
      args,
    )}\nThe contents of an essay are outlined above. The essay prompt is "${prompt}" and your thesis is, "${thesis}". Write an introduction paragraph for the essay. First, write a hook which leads the reader into your essay and gives a sense of the topic you’re writing about and why it’s interesting. Next, give your reader the context they need to understand your topic and argument. Depending on the subject of your essay, this might include historical, geographical, or social context, an outline of the debate you’re addressing, a summary of relevant theories or research about the topic, or definitions of key terms. Next, write your thesis statement. The thesis statement is a sentence that plainly and concisely explains the main topic of the essay. Next, provide the reader with a "road map" of the essay in a logical order. This helps the reader know what to expect in each body paragraph. Write in paragraph form.\n`,
  ]

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i]
    const paragraphPrompt = `${convertParagraphToOutline(
      paragraph,
    )}\nConvert the above outline into a descriptive and extensive paragraph. Use specific examples to support arguments made. Use varied sentence structures and vocabulary. Refrain from using the same word or phrase more than once. If there is text in the outline that is surrounded by parentheses, include it.\n`
    prompts.push(paragraphPrompt)
  }

  prompts.push(
    `${convertArgsToOutline(
      args,
    )}\nThe contents of an essay are outlined above. The essay prompt is "${prompt}" and your thesis is, "${thesis}". Write a conclusion paragraph for the essay. Begin by restating your thesis. Next, broaden back out to a general topic. End with a closing statement. Write in paragraph form.\n`,
  )

  const responses = await Promise.all(
    prompts.map(async (prompt) => {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt,
          temperature: 0.25,
          top_p: 1,
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

  let essay = ''

  const generatedTitle = responses[0].choices[0].text
    .trim()
    .replace(/['"]+/g, '')
  for (let i = 1; i < responses.length; i++) {
    const text = responses[i].choices[0].text.trim()
    essay += text
    if (i != responses.length - 1) {
      essay += '\n\n'
    }
  }

  return NextResponse.json({ essay, title: generatedTitle })
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
      if (sentence.trim() != '') {
        outline += `${convertIndexToSentencePrefix(j) + sentence}\n`
      }
    }
  }
  return outline
}

const convertIndexToParagraphComponentPrefix = (index: number) => {
  return romans.romanize(index + 1) + '. '
}

const convertIndexToSentencePrefix = (index: number) => {
  return String.fromCharCode(65 + index) + '. '
}

const convertArgsToOutline = (args: string[]) => {
  let outline = ''
  args.forEach(
    (arg, index) =>
      (outline += convertIndexToParagraphComponentPrefix(index) + arg + '\n'),
  )
  return outline
}
