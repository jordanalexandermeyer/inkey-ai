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
        prompt: `You are an essay writer who has been presented the prompt, "${prompt}". Your thesis is, "${title}". Write 5 unique and sequential talking points to support your thesis. Use the following format.\n1.\n2.\n3.\n4.\n5.\n`,
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
      arg.replace(/^[0-9]\.\s?/gm, ''),
    )
    const argsWithoutEmptyStrings = argsWithoutNumbers.filter((arg: string) => {
      return arg.trim().length > 0
    })

    return NextResponse.json({ arguments: argsWithoutEmptyStrings })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
