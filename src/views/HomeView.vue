<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { RouterLink } from "vue-router";

type Recipe = {
  idDrink: string;
  strDrink: string;
};

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";
const drinks: Ref<Recipe[]> = ref([]);

onBeforeMount(async () => {
  drinks.value = await Promise.all([
    loadRandomDrink(),
    loadRandomDrink(),
    loadRandomDrink(),
  ]);
});

async function loadRandomDrink(): Promise<Recipe> {
  const url = `${API_URL}/random.php`;
  return (await (await fetch(url)).json()).drinks[0];
}
</script>

<template>
  <header>
    <h1>Random drinks</h1>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <h2>Drinks</h2>
      <article v-for="drink in drinks" :key="drink.idDrink">
        <h3>{{ drink.strDrink }}</h3>
      </article>
    </section>
  </main>
</template>
