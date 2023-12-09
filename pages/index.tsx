import React from 'react'
import polyfills from '../helpers/polyfills'
import * as Sentry from '@sentry/browser'
import adapter from 'webrtc-adapter'
import App from '../components/App'
import * as serviceWorker from '../helpers/serviceWorker'
import packageJSON from '../package.json'

if (!(typeof window === 'undefined')) {
  polyfills()
  serviceWorker.register({})

  if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
      release: packageJSON.version,
      dsn: 'https://d1fd979948f14a358a8b2695c5df3abe@o381364.ingest.sentry.io/5208585',
    })
  }

  Sentry.configureScope((scope) => {
    scope.setExtra(
      'adapter.browserDetails.browser',
      adapter.browserDetails.browser,
    )
    scope.setExtra(
      'adapter.browserDetails.version',
      adapter.browserDetails.version,
    )
  })
}

function Index() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

export default Index
