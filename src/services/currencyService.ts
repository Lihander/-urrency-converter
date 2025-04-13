import type { CurrencyApiResponse, CurrencyCode } from '@/types/currency'

const API_URL = 'https://status.neuralgeneration.com/api/currency'

export const currencyService = {
  async getRates(): Promise<CurrencyApiResponse> {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Не удалось получить курсы валют')
      }
      return await response.json()
    } catch (error) {
      console.error('Ошибка при загрузке курсов валют:', error)
      throw error
    }
  },

  convertAmount(amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode, rates: Record<CurrencyCode, number>): number {
    if (fromCurrency === toCurrency) return amount

    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]

    if (!fromRate || !toRate) {
      throw new Error('Неверные курсы валют')
    }

    return Number(((amount * toRate) / fromRate).toFixed(2))
  }
}
