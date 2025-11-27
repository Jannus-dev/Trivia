<script setup lang="ts">

</script>

<template>
  
<div class="flex flex-col">
  <div class="w-full px-4">
    <div class="flex items-center gap-4 pb-0 max-w-9xl mx-auto w-full">
      <a href="/" class="flex items-center">
        <img src="../assets/img/Logo.svg" alt="Logo" class="h-16 w-auto"/>
      </a>

      <div class="flex flex-col justify-start flex-1 pl-2">
        <h1 class="text-3xl decoration-4">OmniVerse</h1>
        <p class="text-base text-space-tekst">One Universe, Endless trivia</p>
      </div>

      <div class="flex items-center my-4">
        <smalButtonComponent label="Home" to="/categorie" />
      </div>
      
    </div>
     <hr class="h-px my-0 border-space-highlight border-2 rounded-2xl">
  </div>
</div>

</template>

<style scoped>

</style>