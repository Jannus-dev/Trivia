<script setup lang="ts">
const { $supabase } = useNuxtApp()

const { data: categories } = await useAsyncData('categories', async () => {
  const { data, error } = await $supabase
      .from('category')
      .select('*')
      .order('name')

  if (error) throw error
  return data
})
</script>

<template>
  <HeaderComponent />
  <div class="starfield">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
  <br />

  <p class="text-space-tekst text-center text-4xl underline decoration-space-blue decoration-2 rounded-2xl">
    Kies een categorie!
  </p>

  <br /><br /><br /><br />

  <div class="max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 auto-rows-[250px] items-stretch">
      <BigButtonComponent
          v-for="cat in categories"
          :key="cat.id"
          :label="cat.name"
          :to="`/quizpagina?category=${encodeURIComponent(cat.name)}`"
      />
    </div>
  </div>

  <FooterComponent />
</template>
