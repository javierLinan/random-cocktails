<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { RouterLink } from "vue-router";
import { DrinksResource } from "../api/DrinkResource";
import type { DrinkDto } from "../dtos/DrinkDto";

const drinks: Ref<DrinkDto[]> = ref([]);

onBeforeMount(async () => {
  drinks.value = await DrinksResource.Instance.getThreeRandomDrinks();
});
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
