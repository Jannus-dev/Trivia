<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink :to="to" class="bg-[url('/assets/img/3.png')] ease-in-out bg-center bg-cover bg-no-repeat text-center text-2xl w-3/6 pr-7 pl-7 pt-6 pb-6 rounded-2xl whitespace-pre-wrap hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none duration-600">
    {{ label }}
  </NuxtLink>
</template>

<style scoped>

</style>