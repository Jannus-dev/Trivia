<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center justify-center bg-[url('/assets/img/3.png')] bg-center bg-cover bg-no-repeat text-center px-6 py-2 rounded-2xl whitespace-pre-wrap hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-600 text-space-tekst"
  >
    {{ label }}
  </NuxtLink>
</template>

<style scoped>

</style>