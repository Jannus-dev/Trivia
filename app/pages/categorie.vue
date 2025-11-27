<script setup lang="ts">

</script>

<template>
  
<HeaderComponent/>
<br></br>
<p class=" text-space-tekst text-center text-4xl underline decoration-space-blue decoration-2 rounded-2xl">Kies een categorie!</p>
<br></br><br></br><br></br><br></br>

<div class="max-w-7xl mx-auto w-full">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-10 auto-rows-[250px] items-stretch">
		<BigButtonComponent label="Algemene Kennis" :to="`/quizpagina?category=${encodeURIComponent('Algemene Kennis')}`" />
		<BigButtonComponent label="Wetenschap" :to="`/quizpagina?category=${encodeURIComponent('Wetenschap')}`" />
		<BigButtonComponent label="Geschiedenis" :to="`/quizpagina?category=${encodeURIComponent('Geschiedenis')}`" />
		<BigButtonComponent label="Aardrijkskunde" :to="`/quizpagina?category=${encodeURIComponent('Aardrijkskunde')}`" />
		<BigButtonComponent label="Kunst & Literatuur" :to="`/quizpagina?category=${encodeURIComponent('Kunst & Literatuur')}`" />
		<BigButtonComponent label="Muziek" :to="`/quizpagina?category=${encodeURIComponent('Muziek')}`" />
		<BigButtonComponent label="Films & Series" :to="`/quizpagina?category=${encodeURIComponent('Films & Series')}`" />
		<BigButtonComponent label="Games" :to="`/quizpagina?category=${encodeURIComponent('Games')}`" />
		<BigButtonComponent label="Eten & Drinken" :to="`/quizpagina?category=${encodeURIComponent('Eten & Drinken')}`" />
		<BigButtonComponent label="Sprookjes" :to="`/quizpagina?category=${encodeURIComponent('Sprookjes')}`" />
	</div>
</div>
<FooterComponent/>

</template>

<style scoped>

</style>