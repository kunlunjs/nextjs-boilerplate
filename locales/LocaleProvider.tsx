import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { LocaleConfig } from './types'

interface LocaleProviderProps extends LocaleConfig {
  [key: string]: any
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  messages,
  locale,
  dayjsLocale,
  antdLocale
}) => {
  dayjs.locale(dayjsLocale)
  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
      <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
    </IntlProvider>
  )
}
