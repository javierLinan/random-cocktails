<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { DrinksResource } from "../api/DrinkResource";
import type { DrinkDto } from "../dtos/DrinkDto";
import SiteHeader from "../components/SiteHeader.vue";
import GridLayout from "../components/GridLayout.vue";
import DrinkCard from "../components/DrinkCard.vue";

const drinks: Ref<DrinkDto[]> = ref([]);

onBeforeMount(async () => {
  await fetchRandomDrinks();
});

async function fetchRandomDrinks() {
  drinks.value =
    (await DrinksResource.Instance.getThreeRandomDrinks()) as DrinkDto[];
}
</script>

<template>
  <SiteHeader @refresh="fetchRandomDrinks()" />
  <main class="screen static" tabindex="-1">
    <GridLayout>
      <DrinkCard v-for="drink in drinks" :key="drink.idDrink" :drink="drink" />
    </GridLayout>
  </main>
</template>

<style>
.card__overlapped-content {
  --stack-gap: var(--s-2);
}
</style>
