<script setup lang="ts">
import type { Book } from '@/types'
import BookItem from './BookItem.vue'

defineProps<{
  books: Book[] | 'No publications'
  range: string
}>()
</script>
<template>
  <div class="mt-8">
    <h3 class="text-xl font-semibold text-[#0c0c3e] border-b-2 border-[#db651a] pb-1">
      BOOKS PUBLISHED BETWEEN {{ range }}
    </h3>
    <ul v-if="Array.isArray(books)" class="mt-4 space-y-2">
      <!-- Show sorted books in a single decade -->
      <BookItem v-for="book in books" :key="book.name" :book="book" />
    </ul>
      <!-- show when no books in a single decade -->
    <p v-else class="mt-4 text-[#38261a]">{{ books }}</p>
  </div>
</template>
