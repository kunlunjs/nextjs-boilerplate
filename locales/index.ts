// loading format polyfill
import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-listformat/polyfill'
import '@formatjs/intl-displaynames/polyfill'
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-datetimeformat/polyfill'

import { LocaleConfig, LocaleConfigProvider, SupportedLocale } from './types'
import enConfig from './en-US'
import zhConfig from './zh-CN'
import { KEY_OF_LOCALE } from './constants'

export * from './LocaleProvider'
export * from './types'

export const defaultLocaleProvider: LocaleConfigProvider = {
  defaultConfig: enConfig,
  async getConfig(locale?: SupportedLocale): Promise<LocaleConfig> {
    if (locale === 'zh-CN') {
      return zhConfig
    }

    if (locale === 'en-US') {
      return enConfig
    }

    return this.defaultConfig
  }
}

function getCookie(cname: string) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const setLocale = (locale: SupportedLocale) => {
  document.cookie = `${KEY_OF_LOCALE}=${locale}; expires=Thu, 14 Nov 2120 09:41:48 GMT; path=/`

  // Reload the page
  location.reload()
}

export const getLocale = (): SupportedLocale => {
  return getCookie(KEY_OF_LOCALE) as SupportedLocale
}
