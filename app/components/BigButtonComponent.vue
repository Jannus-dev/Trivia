<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="bg-[url('/assets/img/3.png')] ease-in-out bg-center bg-cover bg-no-repeat w-full h-full rounded-2xl hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-600 flex items-center justify-center text-space-tekst px-4"
  >
    <span class="text-xl sm:text-4xl md:text-6xl lg:text-6xl text-center break-words leading-tight">
      {{ label }}
    </span>
  </NuxtLink>
</template>

<style scoped>

</style>