<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { $supabase } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const categoryName = ref(route.query.category ? String(route.query.category) : '')
const question = ref<any | null>(null)
const choices = ref<any[]>([])
const loading = ref(true)

const MAX_QUESTIONS = 5

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
      .eq('category_id', categoryId)

  if (error || !questions?.length) {
    console.error('Geen vragen gevonden:', error)
    loading.value = false
    return
  }

  const answeredIds = JSON.parse(localStorage.getItem('answeredQuestions') || '[]')
  const remainingQuestions = questions.filter(q => !answeredIds.includes(q.id))
  if (!remainingQuestions.length) {
    console.warn('Alle vragen in deze categorie zijn al beantwoord')
    loading.value = false
    return
  }

  const randIndex = Math.floor(Math.random() * remainingQuestions.length)
  question.value = remainingQuestions[randIndex]

  const { data: choiceData } = await $supabase
      .from('choice')
      .select('*')
      .eq('question_id', question.value.id)

  choices.value = shuffleArray(choiceData ?? [])

// Hulpfunctie om een array te husselen
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }


  choices.value = choiceData ?? []
  loading.value = false
}

const handleChoiceSelect = (choice: any) => {
  const isCorrect = choice.is_correct ? 1 : 0
  const currentScore = parseInt(localStorage.getItem('score') || '0')
  const currentCount = parseInt(localStorage.getItem('questionCount') || '0')

  localStorage.setItem('score', String(currentScore + isCorrect))
  localStorage.setItem('questionCount', String(currentCount + 1))

  const answered = JSON.parse(localStorage.getItem('answeredQuestions') || '[]')
  answered.push(question.value.id)
  localStorage.setItem('answeredQuestions', JSON.stringify(answered))

  localStorage.setItem('lastCategory', categoryName.value)

  router.push(`/resultaten?correct=${isCorrect}`)
}

// keyboard shortcuts
const handleKeyDown = (event: KeyboardEvent) => {
  if (['INPUT','TEXTAREA','SELECT'].includes((event.target as HTMLElement).tagName)) return
  const num = parseInt(event.key)
  if (num >= 1 && num <= choices.value.length) {
    handleChoiceSelect(choices.value[num - 1])
  }
}

onMounted(() => {
  fetchRandomQuestion()
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <div class="min-h-screen">
    <HeaderComponent />
    <div class="starfield">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    <CategorieLabelComponent :label="categoryName" vraag="Vraag" />

    <div v-if="loading" class="mt-10 text-center">Vraag wordt geladen...</div>
    <div v-else-if="!question" class="mt-10 text-center text-red-600">Geen vraag gevonden.</div>

    <div v-else class="w-full max-w-5xl mx-auto px-4 mt-6">
      <h2 class="text-3xl text-center font-bold mb-6">{{ question.text }}</h2>

      <div class="flex flex-wrap gap-6">
        <div
            v-for="choice in choices"
            :key="choice.id"
            class="w-full sm:w-[calc(50%-0.75rem)] h-[275px] flex"
        >
          <XXLButtonComponent
              :label="choice.text"
              :onClick="() => handleChoiceSelect(choice)"
              class="flex-1"
          />
        </div>
      </div>




    </div>
  </div>
  <FooterComponent />
</template>
