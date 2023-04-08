import '../styles/globals.css'
import './documents/new-essay/components/date-picker.css'
import type { AppProps } from 'next/app'
import initializeFirebaseApp from '../utils/initializeFirebase'
import initializeAmplitude from '../utils/initializeAmplitude'
import Script from 'next/script'
import { MyUserContextProvider } from 'utils/useUser'
import { ReferralContextProvider } from 'utils/useReferral'
import { useEffect } from 'react'
import Router from 'next/router'
import { EventName, page, track } from 'utils/segment'

initializeFirebaseApp()
initializeAmplitude()

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  useEffect(() => {
    window.addEventListener('beforeunload', (e) => track(EventName.USER_LEFT))
    window.addEventListener('unload', (e) => track(EventName.USER_LEFT))
    Router.events.on('routeChangeComplete', () => {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlSearchParams.entries())
      page(params)
    })
  }, [])

  return (
    <>
      {process.env.NEXT_PUBLIC_VERCEL_ENV == 'production' && (
        <>
          <Script>{`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)}; a.queue=[];var s='script';r=t.createElement(s);r.async=!0; r.src=n;var u=t.getElementsByTagName(s)[0]; u.parentNode.insertBefore(r,u);})(window,document, 'https://sc-static.net/scevent.min.js'); snaptr('init', '1481660c-0fd2-4b12-ba82-4c6881dadcb5', { 'user_email': '__INSERT_USER_EMAIL__' }); snaptr('track', 'PAGE_VIEW');`}</Script>
          <Script>{`!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load('CEDV9SBC77UD28TR4L90'); ttq.page(); }(window, document, 'ttq');`}</Script>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GTM-NPDFFWT"
          />
          <Script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-JRR52Z158H');`}</Script>
          <Script>{`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="FEfeA0XI98qeBP2G2vj3thnF2dyKOpqB";analytics.SNIPPET_VERSION="4.15.3";analytics.load("FEfeA0XI98qeBP2G2vj3thnF2dyKOpqB");analytics.page()}}();`}</Script>
        </>
      )}
      {process.env.NEXT_PUBLIC_VERCEL_ENV != 'production' && (
        <Script>{`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="y1wRDrDCHPkaaJiM5n3MCbWyWgZRiosq";analytics.SNIPPET_VERSION="4.15.3";analytics.load("y1wRDrDCHPkaaJiM5n3MCbWyWgZRiosq");analytics.page()}}();`}</Script>
      )}

      <MyUserContextProvider>
        <ReferralContextProvider>
          <Component {...pageProps} />
        </ReferralContextProvider>
      </MyUserContextProvider>
    </>
  )
}

export default MyApp
