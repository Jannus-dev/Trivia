<script setup lang="ts">
defineProps<{
  label: string
  to?: string
  onClick?: () => void
}>()
</script>

<template>
  <!-- Als er een 'to' is, render NuxtLink -->
  <NuxtLink
      v-if="to"
      :to="to"
      class="bg-[url('/assets/img/3.png')] bg-cover bg-center bg-no-repeat w-full h-full rounded-2xl hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 duration-600 flex items-center justify-center px-4"
  >
    <span class="text-2xl sm:text-3xl md:text-4xl text-center break-words leading-tight text-space-tekst">{{ label }}</span>
  </NuxtLink>

  <!-- Als er een onClick is, render button met dezelfde styling -->
  <button
      v-else-if="onClick"
      @click="onClick"
      class="bg-[url('/assets/img/3.png')] bg-cover bg-center bg-no-repeat w-full h-full rounded-2xl hover:bg-[url('/assets/img/2.png')] transform transition-transform hover:-translate-y-1 duration-600 flex items-center justify-center px-4"
  >
    <span class="text-2xl sm:text-3xl md:text-4xl text-center break-words leading-tight text-space-tekst">{{ label }}</span>
  </button>
</template>
