import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const prompt = body.prompt
  const title = body.title
  const args: string[] = body.arguments
  const prompts = args.map((arg, index) => {
    if (index == 0) {
      return `I. Topic Sentences\nA. \nB. \n\nII. Evidence and Analysis\nA. \nB. \nC. \n\nIII. Summary Sentences\nA. \nB. \n\nYou are writing an essay in response to the prompt, "${prompt}". Your thesis is, "${title}". Using the above format, write an outline for a paragraph discussing the topic, "${arg}" that supports your thesis. Start by writing topic sentences. Next, write sentences that analyze the topic, "${arg}" and provide evidence to support your analysis. Then, summarize key points.\n\n`
    } else {
      return `I. Transition Sentence\nA. \n\nII. Evidence and Analysis\nA. \nB. \nC. \n\nIII. Summary Sentences\nA. \nB. \n\nYou are writing an essay in response to the prompt, "${prompt}". Your thesis is, "${title}". The previous paragraph discussed, "${
        args[index - 1]
      }". Using the above format, write an outline for a paragraph discussing the topic, "${arg}" that supports your thesis. Start with a sentence transitioning the previous topic, "${
        args[index - 1]
      }", to the current one, "${arg}". Next, write sentences that analyze the topic, "${arg}" and provide evidence to support your analysis. Then, summarize key points.\n\n`
    }
  })

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

  const paragraphOutlines = []

  for (let i = 0; i < responses.length; i++) {
    const paragraphMap = getParagraphMapFromResponseBody(responses[i])
    paragraphOutlines.push({ argument: args[i], paragraph: paragraphMap })
  }

  return NextResponse.json({ paragraphs: paragraphOutlines })
}

const getParagraphMapFromResponseBody = (body: any) => {
  const text = body.choices[0].text.trim()
  const paragraphs = text.split('\n\n')
  const paragraphMap = paragraphs.map((paragraph: string) => {
    const sentences = paragraph.split('\n')
    const parsed: { title: string; sentences: string[] } = {
      title: sentences[0].replace(/(I\.\s|II\.\s|III\.\s|IV\.\s|V\.\s)/, ''),
      sentences: [],
    }
    for (let i = 1; i < sentences.length; i++) {
      parsed.sentences.push(sentences[i].replace(/[A-F]\.\s/, ''))
    }
    return parsed
  })
  return paragraphMap
}
