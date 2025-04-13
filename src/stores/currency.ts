import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CurrencyApiResponse, CurrencyCode } from '@/types/currency'
import { currencyService } from '@/services/currencyService'

export const useCurrencyStore = defineStore('currency', () => {
  const rates = ref<CurrencyApiResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const baseCurrency = ref<CurrencyCode>('RUB')

  const fetchRates = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await currencyService.getRates()
      rates.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке курсов валют'
    } finally {
      isLoading.value = false
    }
  }

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (!rates.value) {
      throw new Error('Курсы валют не загружены')
    }

    if (fromCurrency === toCurrency) {
      return amount
    }

    const rateKey = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`
    const rate = rates.value[rateKey]

    if (rate) {
      return Number((amount * rate).toFixed(2))
    }

    const reverseKey = `${toCurrency.toLowerCase()}-${fromCurrency.toLowerCase()}`
    const reverseRate = rates.value[reverseKey]

    if (reverseRate) {
      return Number((amount / reverseRate).toFixed(2))
    }

    throw new Error('Курс валюты не найден')
  }

  return {
    rates,
    error,
    isLoading,
    baseCurrency,
    fetchRates,
    convertAmount
  }
})

