<script setup lang="ts">
import type { ApiBook } from '@/types'

defineProps<{ book: ApiBook }>()
</script>

<template>
  <li
    class="px-4 py-2 mb-2 bg-[#fdfcf8] border-l-4 border-[#40497e] rounded-md text-[#38261a] hover:bg-[#f1ede2] transition-colors"
  >
    <strong>{{ book.title }}</strong> by {{ book.author }} ({{ book.publishedYear }})
  </li>
</template>
