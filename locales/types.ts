import { Locale as AntdLocale } from 'antd/lib/locale-provider'
import { IntlConfig } from 'react-intl'

export type SupportedLocale = 'en-US' | 'zh-CN'

export interface LocaleConfig extends Pick<IntlConfig, 'messages'> {
  locale: SupportedLocale
  antdLocale: AntdLocale
  dayjsLocale: string
}

export interface LocaleConfigProvider {
  defaultConfig: LocaleConfig
  getConfig: (locale?: SupportedLocale) => Promise<LocaleConfig>
}
