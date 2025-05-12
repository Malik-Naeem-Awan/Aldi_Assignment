<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Book } from '@/types'
import { createBook } from '@/services/createBook'
import { useToast } from 'vue-toastification'

/**
 * Emits custom events:
 * - 'submit' with a Book object after a successful save.
 * - 'cancel' when the form/modal is dismissed without submission.
 */
const emit = defineEmits<{
  (e: 'submit', book: Book): void
  (e: 'cancel'): void
}>()
const toast = useToast()

const props = defineProps<{ visible: boolean }>()

const form = ref<Book>({ name: '', author: '', publishYear: 1999, category: '', ratings: [] })

/** Reference to the title input for autofocus */
const titleRef: Ref<HTMLInputElement | null> = ref(null)
const error = ref('')

async function saveBook() {
  const { name, author, publishYear, category } = form.value
  const currentYear = new Date().getFullYear()
  if (publishYear > currentYear) {
    error.value = `Books from the future cannot be added! Allowed year: ${currentYear} or earlier!`
    return
  }
  if (!name || !author || !publishYear || !category) {
    error.value = 'Please fill in all required fields marked with *'
    return
  }

  try {
    const savedBook = await createBook(form.value)
    console.log('Book saved:', savedBook)
    toast.success('Book saved successfully!')
    emit('submit', { ...form.value })
    form.value = { name: '', author: '', publishYear: 0, category: '', ratings: [] }
    error.value = ''
  } catch (err) {
    error.value = 'Error saving book. Please try again.' + (err as string)
    console.error(error.value)
    toast.error('Error saving book. Please try again.')
  }
}

function addRating() {
  form.value.ratings?.push({ source: '', value: 0 })
}

function removeRating(index: number) {
  form.value.ratings?.splice(index, 1)
}

function cancel() {
  emit('cancel')
}

onMounted(() => {
  titleRef.value?.focus()
})
</script>
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    v-if="props.visible"
    @click.self="cancel"
  >
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-xl space-y-4">
      <h2 class="text-xl font-bold text-center text-blue-900">Add a New Book</h2>
      <form @submit.prevent="saveBook" class="space-y-4">
        <p class="text-sm text-gray-500">
          Fields marked with <span class="text-red-500">*</span> are required.
        </p>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Title<span class="text-red-500">*</span>
          </label>
          <input
            ref="titleRef"
            v-model="form.name"
            type="text"
            placeholder="Publication Title"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Author<span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.author"
            type="text"
            placeholder="Author Name"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Published Year<span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="form.publishYear"
            type="number"
            placeholder="1999"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Genre<span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.category"
            type="text"
            placeholder="Fantasy"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Ratings (optional)</label>
          <div v-for="(rating, index) in form.ratings" :key="index" class="flex gap-2 mb-2">
            <input
              v-model="rating.source"
              type="text"
              placeholder="Source (e.g., Goodreads)"
              class="flex-1 border border-gray-300 rounded-md px-2 py-1"
            />
            <input
              v-model.number="rating.value"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating (e.g., 4.5)"
              class="w-24 border border-gray-300 rounded-md px-2 py-1"
            />
            <button type="button" @click="removeRating(index)" class="text-red-600 font-bold">
              X
            </button>
          </div>
          <button
            type="button"
            @click="addRating"
            class="text-blue-700 hover:underline text-sm mt-1"
          >
            + Add Rating
          </button>
        </div>

        <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>

        <div class="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            class="flex-1 bg-[#db651a] hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
          <button
            type="button"
            @click="cancel"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
