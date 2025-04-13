<template>
  <!-- Карточка валюты -->
  <div class="card">
    <!-- Заголовок карточки с названием валюты и курсом -->
    <div class="card__header">
      <h3 class="card__title">{{ currency }}</h3>
      <span class="card__rate">{{ rate }}</span>
    </div>
    <!-- Тело карточки с описанием -->
    <div class="card__body">
      <p class="card__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrencyCode } from '@/types/currency'

// Пропсы компонента
defineProps<{
  currency: CurrencyCode
  rate: string
  description: string
}>()
</script>

<style lang="scss">
.card {
  background-color: var(--cc-bg-light);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    color: var(--cc-text-primary);
  }

  &__rate {
    font-size: 16px;
    color: var(--cc-text-secondary);
  }

  &__body {
    margin-top: 10px;
  }

  &__description {
    margin: 0;
    font-size: 14px;
    color: var(--cc-text-secondary);
  }
}
</style>
