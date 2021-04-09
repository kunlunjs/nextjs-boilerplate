import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-listformat/locale-data/en'
import '@formatjs/intl-displaynames/locale-data/en'
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-datetimeformat/locale-data/en'

import enUS from 'antd/lib/locale/en_US'
import { LocaleConfig } from './types'
import messages from './en-US.json'

const enConfig: LocaleConfig = {
  dayjsLocale: 'en',
  locale: 'en-US',
  antdLocale: enUS,
  messages
}
export default enConfig
