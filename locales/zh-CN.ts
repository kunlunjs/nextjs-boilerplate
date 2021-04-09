import '@formatjs/intl-pluralrules/locale-data/zh'
import '@formatjs/intl-relativetimeformat/locale-data/zh'
import '@formatjs/intl-listformat/locale-data/zh'
import '@formatjs/intl-displaynames/locale-data/zh'
import '@formatjs/intl-numberformat/locale-data/zh'
import '@formatjs/intl-datetimeformat/locale-data/zh'

import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { LocaleConfig } from './types'
import messages from './zh-CN.json'

const zhConfig: LocaleConfig = {
  dayjsLocale: 'zh-cn',
  locale: 'zh-CN',
  antdLocale: zhCN,
  messages
}
export default zhConfig
