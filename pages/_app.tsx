import React from 'react'
import App, { AppContext } from 'next/app'
import Router from 'next/router'
import Helmet from 'react-helmet'
import { IncomingMessage } from 'http'
import accept from '@hapi/accept'
import NProgress from 'nprogress'
import {
  defaultLocaleProvider,
  getLocale,
  LocaleConfig,
  LocaleProvider,
  SupportedLocale
} from '@/locales'
import {
  DEFAULT_LOCALE,
  KEY_OF_LOCALE,
  SUPPORTED_LOCALES
} from '@/locales/constants'

import '../styles/globals.css'

/**
 * 加载动画
 */
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

interface AppProps {
  localeConfig: LocaleConfig
  [key: string]: any
}

function detectLocaleCookie(req: IncomingMessage) {
  if (req.headers.cookie && req.headers.cookie.includes(KEY_OF_LOCALE)) {
    const detectedLocale = (req as any).cookies[KEY_OF_LOCALE]
    return SUPPORTED_LOCALES.find(
      (locale: string) => detectedLocale.toLowerCase() === locale.toLowerCase()
    )
  }
}

function detectLocale(req: IncomingMessage) {
  const detectedLocale = detectLocaleCookie(req)
  const acceptPreferredLocale = accept.language(
    req.headers['accept-language'],
    SUPPORTED_LOCALES
  )

  // locale获取优先级: Cookie > header > 默认Locale
  return (detectedLocale ||
    acceptPreferredLocale ||
    DEFAULT_LOCALE) as SupportedLocale
}

class _App extends App<AppProps> {
  static async getInitialProps(appContext: AppContext) {
    const {
      ctx: { req }
    } = appContext
    const locale =
      ((req as any)?.locale as SupportedLocale) ?? appContext.ctx.req
        ? detectLocale(appContext.ctx.req)
        : getLocale()
    const localeConfig =
      (await defaultLocaleProvider.getConfig(locale)) ??
      defaultLocaleProvider.defaultConfig
    const appProps = await App.getInitialProps(appContext)

    return {
      ...(appProps as any),
      localeConfig
    }
  }

  state: { [key: string]: any } = {}

  componentDidMount() {
    // TODO: componentDidMount
  }

  render() {
    const { Component, pageProps, localeConfig } = this.props
    const { locale } = localeConfig
    return (
      <>
        <Helmet
          title="Hello World"
          htmlAttributes={{ lang: locale }}
          meta={[
            {
              name: 'renderer',
              content: 'webkit'
            },
            {
              name: 'force-rendering',
              content: 'webkit'
            },
            {
              name: 'X-UA-Compatible',
              content: 'IE=Edge,chrome=1'
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1'
            },
            { property: 'og:title', content: 'Hello World!' }
          ]}
        >
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/styles/nprogress.css"
          />
        </Helmet>
        {/* {'ActiveXObject' in global && (
          <Alert
            message="Error Text"
            description="Error Description Error Description Error Description Error Description Error Description Error Description"
            type="error"
            closable
          />
        )} */}
        <LocaleProvider {...localeConfig}>
          <Component {...pageProps} />
        </LocaleProvider>
      </>
    )
  }
}

export default _App
