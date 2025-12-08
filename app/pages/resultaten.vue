<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const isCorrect = route.query.correct === '1'
const totalAnswered = parseInt(localStorage.getItem('questionCount') || '0')
const score = parseInt(localStorage.getItem('score') || '0')
const MAX_QUESTIONS = 5

const gaVerder = () => {
  if (totalAnswered >= MAX_QUESTIONS) {
    localStorage.removeItem('score')
    localStorage.removeItem('questionCount')
    localStorage.removeItem('answeredQuestions')
    router.push('/')
  } else {
    router.push('/categorie')
  }
}

const progressPercent = Math.min((totalAnswered / MAX_QUESTIONS) * 100, 100)

// Animatie van de balk
const animatedProgress = ref(0)

onMounted(() => {
  const duration = 800 // animatie duur in ms
  const start = performance.now()

  const animate = (time: number) => {
    const elapsed = time - start
    const progress = Math.min(elapsed / duration, 1)
    animatedProgress.value = progress * progressPercent
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<template>
  <div class="min-h-screen bg-space-pattern">
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

    <!-- Space progress bar -->
    <div class="max-w-md mx-auto mt-8">
      <div class="w-full bg-space-bg rounded-full h-6 overflow-hidden relative shadow-lg">
        <div
            class="h-full text-white text-center font-bold flex items-center justify-center space-bar-gradient transition-all duration-500"
            :style="{ width: animatedProgress + '%' }"
        >
          {{ totalAnswered }} / {{ MAX_QUESTIONS }}
        </div>

        <!-- Kleine sterren overlay -->
        <div class="absolute inset-0 pointer-events-none">
          <span v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                :style="{ top: Math.random()*100 + '%', left: Math.random()*100 + '%' }"></span>
        </div>
      </div>
    </div>

    <p class="text-center mt-6 text-lg text-space-tekst">
      Je hebt nu {{ totalAnswered }} van {{ MAX_QUESTIONS }} vragen beantwoord.
    </p>

    <p class="text-center mt-2 text-xl text-space-tekst">
      Totaal score: {{ score }}
    </p>

    <div class="flex justify-center mt-16">
      <button
          @click="gaVerder"
          class="px-10 py-4 bg-space-purple text-white text-2xl rounded-2xl font-bold hover:bg-space-blue transition-colors"
      >
        {{ totalAnswered >= MAX_QUESTIONS ? 'Einde quiz' : 'Volgende vraag' }}
      </button>
    </div>
  </div>

  <FooterComponent />
</template>

<style scoped>
.bg-space-bg {
  background-color: #111133;
}

.space-bar-gradient {
  background: linear-gradient(90deg, #4f46e5, #9333ea);
}

/* Twinkling stars animatie */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
.animate-twinkle {
  animation: twinkle 1.5s infinite;
}
</style>
