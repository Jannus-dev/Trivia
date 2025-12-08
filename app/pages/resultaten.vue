<script setup lang="ts">
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

const isCorrect = route.query.correct === '1'
const totalAnswered = parseInt(localStorage.getItem('questionCount') || '0')
const score = parseInt(localStorage.getItem('score') || '0')

const MAX_QUESTIONS = 5

const gaVerder = () => {
  if (totalAnswered >= MAX_QUESTIONS) {
    // Quiz klaar → reset en ga naar index
    localStorage.removeItem('score')
    localStorage.removeItem('questionCount')
    localStorage.removeItem('answeredQuestions')
    router.push('/')
  } else {
    // Nog niet 5 → terug naar categorie voor volgende vraag
    router.push('/categorie')
  }
}
</script>

<template>
  <div class="min-h-screen">
    <HeaderComponent />
    <div class="starfield">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    <CategorieLabelComponent label="Resultaten" vraag="" />

    <h1 class="text-center text-4xl mt-10 underline decoration-space-blue">
      {{ isCorrect ? '🎉 Goed gedaan!' : '❌ Helaas fout!' }}
    </h1>

    <p class="text-center mt-6 text-lg">
      Je hebt nu {{ totalAnswered }} van {{ MAX_QUESTIONS }} vragen beantwoord.
    </p>

    <p class="text-center mt-2 text-xl">
      Totaal score: {{ score }}
    </p>

    <div class="flex justify-center mt-16">
      <button
          @click="gaVerder"
          class="px-10 py-4 bg-space-purple text-white text-2xl rounded-2xl font-bold"
      >
        {{ totalAnswered >= MAX_QUESTIONS ? 'Einde quiz' : 'Volgende vraag' }}
      </button>
    </div>
  </div>
  <FooterComponent />
</template>
