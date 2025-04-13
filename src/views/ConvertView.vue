<template>
  <div class="converter">
    <h1 class="converter__title">Конвертация валют</h1>
    <div v-if="store.isLoading" class="converter__loading">
      Загрузка курсов валют...
    </div>
    <div v-else-if="store.error" class="converter__error">
      {{ store.error }}
    </div>
    <div v-else-if="!store.rates" class="converter__loading">
      Загрузка курсов валют...
    </div>
    <div v-else class="converter__form">
      <div class="converter__row">
        <select v-model="fromCurrency" class="converter__select">
          <option v-for="currency in availableFromCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          v-model.number="amount"
          type="number"
          min="0"
          step="1"
          class="converter__input"
          :class="{ 'converter__input--error': amountError }"
          @input="handleAmountInput"
        />
        <span v-if="amountError" class="converter__error-message">{{ amountError }}</span>
      </div>
      <div class="converter__row">
        <select v-model="toCurrency" class="converter__select">
          <option v-for="currency in availableToCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          v-model="convertedAmount"
          type="number"
          readonly
          class="converter__input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCurrencyStore } from '@/stores/currency'
import type { CurrencyCode } from '@/types/currency'

const store = useCurrencyStore()
const currencies: CurrencyCode[] = ['USD', 'EUR', 'RUB']
const amount = ref<number>(1)
const fromCurrency = ref<CurrencyCode>('USD')
const toCurrency = ref<CurrencyCode>('RUB')
const amountError = ref<string | null>(null)

const availableFromCurrencies = computed(() => {
  return currencies.filter(currency => currency !== toCurrency.value)
})

const availableToCurrencies = computed(() => {
  return currencies.filter(currency => currency !== fromCurrency.value)
})

const convertedAmount = computed(() => {
  if (!store.rates || !amount.value) return '0.00'

  try {
    return store.convertAmount(amount.value, fromCurrency.value, toCurrency.value)
  } catch (error) {
    return '0.00'
  }
})

const handleAmountInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = parseFloat(input.value)
  if (!isNaN(value)) {
    amount.value = Number(value.toFixed(2))
  }
}

onMounted(() => {
  if (!store.rates) {
    store.fetchRates()
  }
})
</script>

<style lang="scss" scoped>
.converter {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;

  &__title {
    color: var(--cc-text-primary);
    text-align: center;
    margin-bottom: 2rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  &__row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    position: relative;

    &:first-child {
      margin-bottom: 0;
    }
  }

  &__select {
    width: 100px;
    padding: 0.5rem;
    border: 1px solid var(--cc-border);
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: var(--cc-border-focus);
    }
  }

  &__input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--cc-border);
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--cc-border-focus);
    }

    &--error {
      border-color: var(--cc-border-error);
    }
  }

  &__error-message {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: var(--cc-danger);
    font-size: 0.875rem;
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
