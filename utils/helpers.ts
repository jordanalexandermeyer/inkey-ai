import { useState } from 'react'

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z') // Unix epoch start.
  t.setSeconds(secs)
  return t
}

export const capitalizeFirstLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1)
}

export const roundToTwoDecimals = (input: number) => {
  return Math.floor(input * 100) / 100
}

export const convertBytesToKilobytes = (bytes: number) => {
  return bytes / 1000
}

export const strip = (html: string) => {
  let doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export function useExtendedState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)
  const getLatestState = () => {
    let latestState = state
    setState((s) => {
      latestState = s
      return s
    })
    return latestState
  }

  return [state, setState, getLatestState] as const
}
