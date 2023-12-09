import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app'
import theme from '../styles/theme'

function App(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
