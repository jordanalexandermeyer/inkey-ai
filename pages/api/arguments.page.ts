import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const url = new URL(request.url)
  const params = url.searchParams
  const userId = params.get('userId')
  const prompt = params.get('prompt')
  const title = params.get('title')

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Write 5 sequential talking points based on the title, "${title}" in response to the prompt "${prompt}". Use the following format.\n\n1.\n2.\n3.\n4.\n5.\n`,
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
    const args = text.split('\n')
    const argsWithoutNumbers = args.map((arg: string) =>
      arg.replace(/^[0-9]\.\s/gm, ''),
    )

    return NextResponse.json({ arguments: argsWithoutNumbers })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
