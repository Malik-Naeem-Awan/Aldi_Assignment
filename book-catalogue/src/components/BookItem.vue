<script setup lang="ts">
import type { Book } from '@/types'

defineProps<{ book: Book }>()
</script>

<template>
  <li
    class="px-4 py-2 mb-2 bg-[#fdfcf8] border-l-4 border-[#40497e] rounded-md text-[#38261a] hover:bg-[#f1ede2] transition-colors"
  >
    <strong>{{ book.name }}</strong> by {{ book.author }} ({{ book.publishYear }})
  </li>
</template>
