<script setup lang="ts">
import { useRoute } from '#imports'
const route = useRoute()

import { supabase } from '../../utils/supabase'

import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

// 1. Initialiseer de Nuxt Router
const router = useRouter();

// 2. Definieer de 'category' variabele (pas dit aan op basis van hoe je deze variabele vult)
// Dit is nodig om de volledige URL's op te bouwen.
const category = ref(route.query.category ? String(route.query.category) : 'Onbekende categorie');

// 3. Definieer de vier specifieke target URLs
// Deze URL's zijn statisch voor de huidige vraag en komen exact overeen met de ':to' props.
const antwoord1Route = `/resultaten?category=${encodeURIComponent(category.value)}&score=1`;
const antwoord2Route = `/resultaten?category=${encodeURIComponent(category.value)}&score=0`;
const antwoord3Route = `/resultaten?category=${encodeURIComponent(category.value)}&score=0`;
const antwoord4Route = `/resultaten?category=${encodeURIComponent(category.value)}&score=0`;

/**
 * Stuurt de gebruiker door naar de resultatenpagina via de router.
 * Dit simuleert de actie van het klikken op de knop.
 * @param targetRoute - De URL (de waarde van de :to prop) waarnaar genavigeerd moet worden.
 */
const navigeerNaarAntwoord = (targetRoute: string) => {
  // Gebruik router.push() om de navigatie programmatisch uit te voeren
  router.push(targetRoute);
};

/**
 * Hoofdfunctie om toetsaanslagen te verwerken.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  // AANBEVOLEN: Negeer de toetsaanslag als de gebruiker in een invoerveld typt
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) {
    return;
  }

  // Wijs de toetsen 1 t/m 4 toe aan de bijbehorende URL
  switch (event.key) {
    case '1':
      event.preventDefault(); // Voorkom standaard browseracties
      navigeerNaarAntwoord(antwoord1Route);
      break;
    case '2':
      event.preventDefault();
      navigeerNaarAntwoord(antwoord2Route);
      break;
    case '3':
      event.preventDefault();
      navigeerNaarAntwoord(antwoord3Route);
      break;
    case '4':
      event.preventDefault();
      navigeerNaarAntwoord(antwoord4Route);
      break;
    default:
      break;
  }
};

// 🌟 Lifecycle Hook: Voeg de listener toe wanneer de component geladen is
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

// 🗑️ Lifecycle Hook: Verwijder de listener voordat de component wordt vernietigd
// Dit is CRUCIAAL om memory leaks en dubbele acties te voorkomen.
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
<div class="min-h-screen">
<HeaderComponent/>
<categorieLabelComponent :label="category" vraag="Vraag 1" />

<div class="w-full max-w-10xl mx-auto px-4 mt-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[275px] items-stretch">
    <XXLButtonComponent label="Antwoord A" :to="antwoord1Route" />
    <XXLButtonComponent label="Antwoord B" :to="antwoord2Route" />
    <XXLButtonComponent label="Antwoord C" :to="antwoord3Route" />
    <XXLButtonComponent label="Antwoord D" :to="antwoord4Route" />
  </div>
</div>
</div>
<FooterComponent/>
</template>

<style scoped>

</style>