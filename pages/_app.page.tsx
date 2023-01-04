initializeFirebaseApp()
initializeAmplitude()
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import initializeFirebaseApp from '../utils/initializeFirebase'
import initializeAmplitude from '../utils/initializeAmplitude'
import Script from 'next/script'
import { MyUserContextProvider } from 'utils/useUser'
import { ReferralContextProvider } from 'utils/useReferral'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_VERCEL_ENV == 'production' && (
        <>
          <Script>{`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)}; a.queue=[];var s='script';r=t.createElement(s);r.async=!0; r.src=n;var u=t.getElementsByTagName(s)[0]; u.parentNode.insertBefore(r,u);})(window,document, 'https://sc-static.net/scevent.min.js'); snaptr('init', '1481660c-0fd2-4b12-ba82-4c6881dadcb5', { 'user_email': '__INSERT_USER_EMAIL__' }); snaptr('track', 'PAGE_VIEW');`}</Script>
          <Script>{`!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load('CEDV9SBC77UD28TR4L90'); ttq.page(); }(window, document, 'ttq');`}</Script>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JRR52Z158H"
          />
          <Script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-JRR52Z158H');`}</Script>
        </>
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
