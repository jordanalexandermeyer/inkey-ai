import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const prompt = body.prompt
  const thesis = body.thesis
  const argument = body.argument
  const sentences = body.sentences

  let formattedSentences = ''
  for (let i = 0; i < sentences.length; i++) {
    formattedSentences += sentences[i] + '\n'
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `You are an essay writer who has been presented the prompt, "${prompt}". Your thesis is, "${thesis}". You are writing a paragraph about the topic, "${argument}". Your current sentences are:\n${formattedSentences}\nWrite another unique sentence to support your topic.\n`,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 1000,
        user: userId || '',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    })

    const body = await response.json()
    const text = body.choices[0].text.trim()

    return NextResponse.json({ sentence: text.trim() })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
