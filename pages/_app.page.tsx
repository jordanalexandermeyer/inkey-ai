initializeFirebaseApp()
initializeAmplitude()
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import initializeFirebaseApp from '../lib/initializeFirebase'
import Script from 'next/script'
import initializeAmplitude from '../lib/initializeAmplitude'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Script id="reddit-pixel">
        {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_upkfw5bq', {"optOut":false,"useDecimalCurrencyValues":true});rdt('track', 'PageVisit');`}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
