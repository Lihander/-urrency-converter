<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__nav">
        <RouterLink to="/" class="header__nav-link">Главная</RouterLink>
        <RouterLink to="/convert" class="header__nav-link">Конвертер</RouterLink>
      </nav>
      <div class="header__currency">
        <label for="baseCurrency" class="header__currency-label">Базовая валюта:</label>
        <select
          id="baseCurrency"
          v-model="store.baseCurrency"
          @change="handleCurrencyChange"
          class="header__currency-select"
        >
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCurrencyStore } from '@/stores/currency'
import type { CurrencyCode } from '@/types/currency'

// Инициализация хранилища
const store = useCurrencyStore()

// Доступные валюты
const currencies: CurrencyCode[] = ['USD', 'EUR', 'RUB']

// Обработчик изменения базовой валюты
const handleCurrencyChange = () => {
  store.fetchRates()
}
</script>

<style lang="scss">
.header {
  background-color: var(--cc-bg-primary);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    display: flex;
    gap: 1rem;
  }

  &__nav-link {
    color: var(--cc-text-primary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--cc-bg-hover);
    }

    &.router-link-active {
      background-color: var(--cc-bg-active);
      color: var(--cc-primary);
    }
  }

  &__currency {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__currency-label {
    color: var(--cc-text-primary);
  }

  &__currency-select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--cc-border);
    background-color: var(--cc-bg-light);
    color: var(--cc-text-primary);
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: var(--cc-primary);
    }
  }
}
</style>
