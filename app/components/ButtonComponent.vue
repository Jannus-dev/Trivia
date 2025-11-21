<script setup lang="ts">
defineProps<{
  label: string // De tekst die op de knop komt
  to: string    // Het adres van de vervolgpagina (route)
}>()
</script>

<template>
  <NuxtLink :to="to" class="bg-space-highlight">
    {{ label }}
  </NuxtLink>
</template>

<style scoped>

</style>