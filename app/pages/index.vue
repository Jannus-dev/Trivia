<script setup lang="ts">
onMounted(() => {
  localStorage.removeItem('score')
  localStorage.removeItem('questionCount')
  localStorage.removeItem('answeredQuestions')
  localStorage.removeItem('lastCategory')
})
</script>

<template>
  <div class="starfield">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
  <indexComponent/>
  <FooterComponent/>
</template>

<style scoped>

</style>