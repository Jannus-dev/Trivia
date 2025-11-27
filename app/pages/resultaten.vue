<script setup lang="ts">
import { useRoute } from '#imports'
const route = useRoute()
const category = route.query.category ? String(route.query.category) : 'Onbekende categorie'
const score = route.query.score ? parseInt(String(route.query.score)) : 0
const totalQuestions = 5

</script>

<template>
  
<HeaderComponent/>

<CategorieLabelComponent
:label="category"
vraag=""
/>

<p class="text-space-tekst text-center text-4xl underline decoration-space-blue decoration-2 rounded-2xl">Resultaten</p>
<br></br><br></br><br></br><br></br><br></br>

<div class="flex justify-center">
  <div class="bg-[url('../img/Blauwbg.svg')] bg-cover bg-center bg-no-repeat text-space-tekst font-bold py-12 px-12 rounded-2xl text-3xl shadow-lg border-2 border-space-purple text-center">
    <p>Je hebt <span class="text-space-highlight font-bold">{{ score }}</span> van de <span class="text-space-highlight font-bold">{{ totalQuestions }}</span> vragen correct beantwoord!</p>
  </div>
</div>
<br></br><br></br><br></br><br></br>

<div class="flex justify-center">
  <NuxtLink to="/categorie" class="bg-[url('/assets/img/3.png')] ease-in-out border-2 border-space-highlight bg-center bg-cover bg-no-repeat px-8 py-3 rounded-2xl hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 duration-600 flex items-center justify-center text-space-tekst font-bold text-xl">
    Terug naar categoriën
  </NuxtLink>
</div>
<br></br><br></br><br></br><br></br>


<FooterComponent/>

</template>

<style scoped>

</style>