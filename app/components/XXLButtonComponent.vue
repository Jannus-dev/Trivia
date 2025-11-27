<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="bg-[url('/assets/img/3.png')] ease-in-out bg-center bg-cover bg-no-repeat w-full h-full rounded-2xl hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-600 flex items-center justify-center px-4"
  >
    <span class="text-2xl sm:text-3xl md:text-4xl text-center break-words leading-tight text-space-tekst">{{ label }}</span>
  </NuxtLink>
</template>

<style scoped>

</style>