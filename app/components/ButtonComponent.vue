<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink :to="to" class="bg-[url('/assets/img/Button.png')] bg-center bg-contain bg-no-repeat text-center text-2xl w-1/7 pr-5 pl-5 pt-7 pb-7 rounded-2xl whitespace-pre-wrap hover:bg-[url('/assets/img/ButtonHover.png')]">
    {{ label }}
  </NuxtLink>
</template>

<style scoped>

</style>