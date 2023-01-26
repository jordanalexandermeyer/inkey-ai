import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const body = await request.json()
  const userId = body.userId
  const prompt = body.prompt
  const thesis = body.thesis
  const args = body.arguments

  let formattedArgs = ''
  for (let i = 0; i < args.length; i++) {
    formattedArgs += args[i] + '\n'
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `You are an essay writer who has been presented the prompt, "${prompt}". Your thesis is, "${thesis}". Your current talking points are:\n${formattedArgs}\nWrite another unique talking point to support your thesis.\n`,
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

    return NextResponse.json({ argument: text.trim() })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
