import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const url = new URL(request.url)
  const params = url.searchParams
  const query = params.get('query') ?? ''

  try {
    const response = await fetch(
      'https://serpapi.com/search.json?' +
        new URLSearchParams({
          engine: 'google',
          q: query,
          hl: 'en',
          gl: 'us',
          api_key: process.env.SERPAPI_API_KEY || '',
        }),
    )

    const body = await response.json()
    const parsedResults = parseResponse(body)
    const parsedResponse: ApiResponse = {
      resources: parsedResults,
    }

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({
      status: 500,
      statusText: 'Server Error',
    })
  }
}

type SerpapiBody = {
  organic_results: OrganicResult[]
}

type OrganicResult = {
  title?: string
  link?: string
  snippet?: string
  date?: string
}

export type ApiResponse = {
  resources: ApiResource[]
}

export type ApiResource = {
  title: string
  link: string
  snippet: string
  date?: number
}

const parseResponse = (body: SerpapiBody): ApiResource[] => {
  const results = body.organic_results
  const parsedResults = []
  for (let i = 0; i < results.length; i++) {
    const date = results[i].date
    const resource: ApiResource = {
      title: results[i].title ?? '',
      link: results[i].link ?? '',
      snippet: results[i].snippet ?? '',
      ...(date && { date: new Date(date).getTime() }),
    }

    parsedResults.push(resource)
  }
  return parsedResults
}
