import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const title = body.title
  const args: string[] = body.arguments
  const prompts = args.map(
    (arg) =>
      `You are writing an essay titled, "${title}". Write an outline for a paragraph discussing this topic, "${arg}". Use the following format.\n\nI. Topic Sentences\nA.\nB.\n\nII. INSERT TOPIC HERE\nA.\nB.\nC.\n\nIII. INSERT TOPIC HERE\nA.\nB.\nC.\n\nIV. Concluding Sentences\nA.\nB.\n`,
  )

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

  const paragraphOutlines = []

  for (let i = 0; i < responses.length; i++) {
    const paragraphMap = getParagraphMapFromResponseBody(responses[i])
    paragraphOutlines.push({ argument: args[i], paragraph: paragraphMap })
  }

  return NextResponse.json({ paragraphs: paragraphOutlines })
}

const getParagraphMapFromResponseBody = (body: any) => {
  console.log(body)
  const text = body.choices[0].text.trim()
  const paragraphs = text.split('\n\n')
  const paragraphMap = paragraphs.map((paragraph: string) => {
    const sentences = paragraph.split('\n')
    const parsed: { title: string; sentences: string[] } = {
      title: sentences[0].replace(/(I\.\s|II\.\s|III\.\s|IV\.\s|V\.\s)/, ''),
      sentences: [],
    }
    for (let i = 1; i < sentences.length; i++) {
      parsed.sentences.push(sentences[i].replace(/[A-D]\.\s/, ''))
    }
    return parsed
  })
  return paragraphMap
}
