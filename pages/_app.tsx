import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app'
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
// import 'lazysizes'
// import { hotjar } from 'react-hotjar'
// import ReactGA from 'react-ga'
import theme from '../style/theme'
import { getServerState } from '../helpers/helpers'
import { defaultLanguage } from '../constants/constants'
// import config from '../constants/config'
import { isServer } from '../helpers/helpers'
import Layout from '../components/Layout'
import IntlProvider from '../components/IntlProvider'
import OverlayProvider from '../context/Overlay'

function getLocale(language: string | undefined): string {
  // server side
  if (isServer) {
    if (language) {
      return language
    }
    return defaultLanguage
  }
  // browser side
  const state = getServerState()
  if (state && state.language) {
    return state.language
  }
  return defaultLanguage
}

function getMessages(messages: string | undefined) {
  // server side
  if (messages) {
    return messages
  }
  // browser side
  const state = getServerState()
  if (state && state.messages) {
    return state.messages
  }
}

// <GoogleReCaptchaProvider
//   reCaptchaKey={config.RECAPTCHA_CLIENT_SIDE}
//   language={locale}
// >
// </GoogleReCaptchaProvider>
function App(props: AppProps) {
  // componentDidMount() {
  // if (isProd) {
  // hotjar.initialize(process.env.HOT_JAR_SITE_ID || '', 'v1')
  // ReactGA.initialize(process.env.GA_TRACKING_ID || '')
  // ReactGA.pageview(window.location.pathname + window.location.search)
  // }
  // }
  const { Component, pageProps } = props
  const locale = getLocale(pageProps.language)
  const messages = getMessages(pageProps.messages)
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <OverlayProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </OverlayProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext)
//   return { ...appProps }
// }

export default App
