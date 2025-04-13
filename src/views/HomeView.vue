<template>
  <div class="rates">
    <h1 class="rates__title">Курсы валют</h1>
    <div v-if="store.isLoading" class="rates__loading">
      Загрузка курсов валют...
    </div>
    <div v-else-if="store.error" class="rates__error">
      {{ store.error }}
    </div>
    <div v-else-if="store.rates" class="rates__grid">
      <div v-for="currency in displayCurrencies" :key="currency" class="rates__card">
        <div class="rates__card-amount">1 {{ currency }}</div>
        <div class="rates__card-value">
          {{ getRate(currency) }}
          {{ store.baseCurrency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCurrencyStore } from '@/stores/currency'
import type { CurrencyCode } from '@/types/currency'

// Инициализация хранилища
const store = useCurrencyStore()

// Список доступных валют
const currencies: CurrencyCode[] = ['USD', 'EUR', 'RUB']

// Фильтрация валют для отображения (исключаем базовую валюту)
const displayCurrencies = computed(() => {
  return currencies.filter(currency => currency !== store.baseCurrency)
})

// Получение курса валюты
const getRate = (currency: CurrencyCode): string => {
  if (!store.rates) return '0.00'

  const rateKey = `${currency.toLowerCase()}-${store.baseCurrency.toLowerCase()}`
  const rate = store.rates[rateKey]

  if (rate) {
    return rate.toFixed(2)
  }

  const reverseKey = `${store.baseCurrency.toLowerCase()}-${currency.toLowerCase()}`
  const reverseRate = store.rates[reverseKey]

  if (reverseRate) {
    return (1 / reverseRate).toFixed(2)
  }

  return '0.00'
}

// Загрузка курсов при монтировании компонента
onMounted(() => {
  store.fetchRates()
})
</script>

<style lang="scss" scoped>
.rates {
  padding: 2rem;

  &__title {
    color: var(--cc-text-primary);
    text-align: center;
    margin-bottom: 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem auto 0;
    max-width: 600px;
  }

  &__card {
    padding: 1rem;
    background-color: var(--cc-white);
    border-radius: 8px;
    box-shadow: 0 2px 4px var(--cc-shadow);

    &-amount {
      font-size: 1.2rem;
      color: var(--cc-text-secondary);
      margin-bottom: 0.5rem;
    }

    &-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--cc-text-primary);
    }
  }

  &__loading {
    text-align: center;
    color: var(--cc-text-secondary);
    margin-top: 2rem;
  }

  &__error {
    text-align: center;
    color: var(--cc-danger);
    margin-top: 2rem;
  }
}
</style>
