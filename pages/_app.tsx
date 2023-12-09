import React from 'react'
import { AppProps } from 'next/app'
import theme from '../styles/theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ErrorBoundary from '../components/ErrorBoundary'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
    * {
      font-family: 'Roboto', sans-serif;
    }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    display: inline;
    margin: 0;
    padding: 0;
  }

  button:hover,
  button:focus {
    text-decoration: none;
  }
  .grecaptcha-badge {
    display: none;
  }
`

function App(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_CLIENT_SIDE}
      language='fr'
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  )
}

export default App

