import * as amplitude from '@amplitude/analytics-browser'

const initializeAmplitude = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'production')
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '')
}

export default initializeAmplitude
