import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const url = new URL(request.url)
  const params = url.searchParams
  const userId = params.get('userId')
  const prompt = params.get('prompt')

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          prompt +
          '\nWrite a thesis statement for an essay with the above prompt. Do not provide context.\n',
        temperature: 1,
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
    const text = body.choices[0].text.trim().replace(/['"]+/g, '')

    return NextResponse.json({ title: text })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}
