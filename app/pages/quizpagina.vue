<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { $supabase } = useNuxtApp()

const route = useRoute()
const router = useRouter()

// Category naam uit URL
const categoryName = ref(
    route.query.category ? String(route.query.category) : ''
)

const question = ref<any | null>(null)
const choices = ref<any[]>([])
const loading = ref(true)

// 🔥 1. Category ID ophalen
async function fetchCategoryId() {
  const { data, error } = await $supabase
      .from('category')
      .select('id')
      .eq('name', categoryName.value)
      .single()

  if (error || !data) {
    console.error('Categorie niet gevonden:', error)
    return null
  }

  return data.id
}

// 🔥 2. Random vraag + keuzes ophalen
async function fetchRandomQuestion() {
  loading.value = true

  const categoryId = await fetchCategoryId()
  if (!categoryId) {
    loading.value = false
    return
  }

  const { data: questions, error } = await $supabase
      .from('question')
      .select('*')
      .eq('category_id', categoryId)   // ✅ JUISTE kolomnaam

  if (error || !questions?.length) {
    console.error('Geen vragen gevonden:', error)
    loading.value = false
    return
  }

  // Random vraag pakken
  const randIndex = Math.floor(Math.random() * questions.length)
  question.value = questions[randIndex]

  // Choices ophalen
  const { data: choiceData } = await $supabase
      .from('choice')
      .select('*')
      .eq('question_id', question.value.id)

  choices.value = choiceData ?? []
  loading.value = false
}

onMounted(async () => {
  await fetchRandomQuestion()
})


// 🔥 Keyboard shortcuts 1–4
const handleKeyDown = (event: KeyboardEvent) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) return

  const num = parseInt(event.key)
  if (num >= 1 && num <= choices.value.length) {
    const choice = choices.value[num - 1]
    if (!choice) return

    const score = choice.is_correct ? 1 : 0

    router.push(
        `/resultaten?category=${encodeURIComponent(categoryName.value)}&score=${score}`
    )
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))
</script>


<template>
  <div class="min-h-screen">
    <HeaderComponent />

    <categorieLabelComponent
        :label="categoryName"
        vraag="Vraag 1"
    />

    <!-- Loading -->
    <div v-if="loading" class="text-center mt-10 text-lg">
      Vraag wordt geladen...
    </div>

    <!-- Geen vraag -->
    <div v-else-if="!question" class="text-center mt-10 text-red-600 text-lg">
      Geen vraag gevonden.
    </div>

    <!-- Vraag + keuzes -->
    <div v-else class="w-full max-w-10xl mx-auto px-4 mt-6">
      <h2 class="text-2xl font-bold mb-4">
        {{ question.text }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[275px] items-stretch">
        <XXLButtonComponent
            v-for="(choice, index) in choices"
            :key="choice.id"
            :label="choice.text"
            :to="`/resultaten?category=${encodeURIComponent(categoryName)}&score=${choice.is_correct ? 1 : 0}`"
        />
      </div>
    </div>

    <FooterComponent />
  </div>
</template>
