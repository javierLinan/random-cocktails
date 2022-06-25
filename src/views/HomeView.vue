<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { DrinksResource } from "../api/DrinkResource";
import SiteHeader from "../components/SiteHeader.vue";
import GridLayout from "../components/GridLayout.vue";
import DrinkCard from "../components/DrinkCard.vue";
import type { Drink } from "../models/Drink";

const drinks: Ref<Drink[]> = ref([]);

onBeforeMount(async () => {
  await fetchRandomDrinks();
});

async function fetchRandomDrinks() {
  drinks.value = await DrinksResource.Instance.getThreeRandomDrinks();
}
</script>

<template>
  <SiteHeader @refresh="fetchRandomDrinks()" />
  <main class="screen static" tabindex="-1">
    <GridLayout>
      <DrinkCard v-for="drink in drinks" :key="drink.id" :drink="drink" />
    </GridLayout>
  </main>
</template>

<style>
.card__overlapped-content {
  --stack-gap: var(--s-2);
}
</style>
