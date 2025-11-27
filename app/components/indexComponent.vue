<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center justify-center content-center">
   <img src="../assets/img/Logo.svg" alt="Logo" class="self-center" />
   <h1 class="text-center text-9xl underline decoration-space-highlight decoration-8" >
      OmniVerse
    </h1>
    <p class="text-center text-6xl underline decoration-space-blue decoration-5 mb-5">
      One Universe, Endless Trivia
    </p>
    <div class="w-full flex justify-center mt-6">
      <ButtonComponent
        label="Start Trivia"
        to="/categorie"
      />
    </div>
    
  </div>
</template>

<style scoped>

</style>