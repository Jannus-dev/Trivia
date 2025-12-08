<script setup lang="ts">
import { useRoute } from '#imports'
import { supabase } from '../../utils/supabase'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// URL category (naam)
const categoryName = ref(route.query.category ? String(route.query.category) : '');

// RANDOM vraag + keuzes
const question = ref(null as any);
const choices = ref([] as any[]);

// 🔥 Stap 1 — Haal Categorie ID op
async function fetchCategoryId() {
  const { data, error } = await supabase
      .from('category')
      .select('id')
      .eq('name', categoryName.value)
      .single();

  if (error || !data) {
    console.error("Categorie niet gevonden:", error);
    return null;
  }
  return data.id;
}

// 🔥 Stap 2 — Haal random vraag binnen categorie op
async function fetchRandomQuestion() {
  const categoryId = await fetchCategoryId();
  if (!categoryId) return;

  const { data: questions, error } = await supabase
      .from('quistion')
      .select('*')
      .eq('catagory_id', categoryId);

  if (error || !questions?.length) {
    console.error("Geen vragen gevonden", error);
    return;
  }

  // Random index
  const randIndex = Math.floor(Math.random() * questions.length);
  question.value = questions[randIndex];

  // Haal keuzes op
  const { data: choiceData } = await supabase
      .from('choice')
      .select('*')
      .eq('quistion_id', question.value.id);

  choices.value = choiceData ?? [];
}

// 🔥 Start bij laden pagina
onMounted(async () => {
  await fetchRandomQuestion();
});

// KEYBOARD SHORTCUTS — jouw code
const navigeerNaarAntwoord = (targetRoute: string) => {
  router.push(targetRoute);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) return;

  // Dynamisch gebaseerd op choices
  const num = parseInt(event.key);
  if (num >= 1 && num <= choices.value.length) {
    const choice = choices.value[num - 1];
    if (!choice) return;

    const score = choice.is_correct ? 1 : 0;
    const target = `/resultaten?category=${encodeURIComponent(categoryName.value)}&score=${score}`;
    event.preventDefault();
    navigeerNaarAntwoord(target);
  }
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown));
</script>


<template>
  <div class="min-h-screen">
    <HeaderComponent/>

    <categorieLabelComponent :label="categoryName" vraag="Vraag 1" />

    <div v-if="!question" class="text-center mt-10 text-lg">
      Vraag wordt geladen...
    </div>

    <div v-else class="w-full max-w-10xl mx-auto px-4 mt-6">
      <h2 class="text-2xl font-bold mb-4">{{ question.text }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[275px] items-stretch">
        <XXLButtonComponent
            v-for="(choice, index) in choices"
            :key="choice.id"
            :label="choice.text"
            :to="`/resultaten?category=${encodeURIComponent(categoryName)}&score=${choice.is_correct ? 1 : 0}`"
        />
      </div>
    </div>

    <FooterComponent/>
  </div>
</template>


<style scoped>

</style>