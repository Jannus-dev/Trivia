<script setup lang="ts">
defineProps<{
  label: string
  vraag: string
}>()
</script>


<template>
    <br></br>
<div class="flex items-center justify-center">
    <span class=" 
      
      bg-[url('../img/Blauwbg.svg')]
      bg-cover
      bg-center
      bg-no-repeat
      
      text-space-tekst font-bold py-2 px-6 rounded-full text-xs shadow-md border-2 border-space-purple">
      {{ label }}
    </span>
  </div>
<br></br>
  <h1 class="text-space-tekst py-2 px-6 text-4xl text-center ">
    {{ vraag }}
  </h1>
</template>


<style scoped>

</style>