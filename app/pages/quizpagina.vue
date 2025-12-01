<script setup lang="ts">
import { useRoute } from '#imports'
const route = useRoute()
const category = route.query.category ? String(route.query.category) : 'Onbekende categorie'

</script>

<template>
  
<HeaderComponent/>
<categorieLabelComponent :label="category" vraag="Vraag 1" />

<div class="w-full max-w-10xl mx-auto px-4 mt-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[275px] items-stretch">
    <XXLButtonComponent label="Antwoord A" :to="`/resultaten?category=${encodeURIComponent(category)}&score=1`" />
    <XXLButtonComponent label="Antwoord B" :to="`/resultaten?category=${encodeURIComponent(category)}&score=0`" />
    <XXLButtonComponent label="Antwoord C" :to="`/resultaten?category=${encodeURIComponent(category)}&score=0`" />
    <XXLButtonComponent label="Antwoord D" :to="`/resultaten?category=${encodeURIComponent(category)}&score=0`" />
  </div>
</div>
<FooterComponent/>
</template>

<style scoped>

</style>