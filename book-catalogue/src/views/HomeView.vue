<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import BookModal from '@/components/BookModal.vue'
import BookListSection from '@/components/BookListSection.vue'
import type { Book } from '../types'
import { fetchBooks } from '@/services/fetchBooks'
import { categorizeBooksByDecade } from '@/stores/bookUtils'

const showModal = ref(false)
const apibooks = ref<Book[]>([])
const loading = ref(true) // Loading state for the book list till data from API has not arrived

const categorizedBooks = computed(() => {
  return categorizeBooksByDecade(apibooks.value)   
})

function saveBook(book: Book) {
  // Add the new book to the list (temp) to avoid calling the fetchBooks API again or to reload app
  apibooks.value.push(book)
  showModal.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    apibooks.value = await fetchBooks()
  } catch (error) {
    console.error('Failed to fetch books:', error)
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div class="min-h-screen bg-white font-sans flex flex-col">
    <!-- Sticky Button -->
    <header class="bg-white z-10 sticky top-0 px-4 py-4 shadow-md">
      <div class="flex justify-center">
        <button
          @click="showModal = true"
          class="bg-[#0e3993] hover:bg-[#5c76b7] text-white font-semibold text-lg px-6 py-2 rounded-lg transition-colors"
        >
          Add a Book
        </button>
      </div>
    </header>

    <!-- Scrollable Book list -->
    <main class="flex-1 overflow-y-auto px-4 py-6">
      <template v-if="loading"> <!-- handle when Book list is currently loading-->
        <div class="text-center text-gray-400 text-lg mt-10">Loading books...</div>
      </template>
      <template v-else-if="apibooks.length === 0">
        <div class="text-center text-gray-500 text-lg mt-10">No books found in the Catalogue!</div>
      </template>

    <!-- Show books List-->
      <template v-else>
        <BookListSection
          v-for="(books, range) in categorizedBooks"
          :key="range"
          :range="range.toString()"
          :books="books"
        />
      </template>
    </main>

    <!-- add new books functonality-->
    <BookModal
      v-if="showModal"
      :visible="showModal"
      @submit="saveBook"
      @cancel="showModal = false"
    />
  </div>
</template>
