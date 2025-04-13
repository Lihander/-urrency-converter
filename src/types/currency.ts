export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'RUB'

export interface CurrencyRate {
  code: CurrencyCode
  rate: number
}

export type CurrencyApiResponse = Record<CurrencyCode, number>
