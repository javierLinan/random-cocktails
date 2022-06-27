<script setup lang="ts">
import { onBeforeMount, provide, ref, type Ref, computed } from "vue";
import { DrinksResource } from "../api/DrinkResource";
import SiteHeader from "../components/SiteHeader.vue";
import GridLayout from "../components/GridLayout.vue";
import DrinkCard from "../components/DrinkCard.vue";
import type { Drink } from "../models/Drink";
import { useRoute } from "vue-router";

const route = useRoute();

const drinks: Ref<Drink[]> = ref([]);

const selectedDrink = computed(() =>
  drinks.value.find((d) => d.id === route.params.id)
);

const isVisibleModal = computed(() => !!route.params.id);

provide("selectedDrink", selectedDrink);

onBeforeMount(async () => {
  await fetchDrinks();
});

async function fetchDrinks() {
  const promises = [
    DrinksResource.Instance.getRandomDrink(),
    DrinksResource.Instance.getRandomDrink(),
  ];

  if (route.params.id) {
    promises.push(
      DrinksResource.Instance.getDrinkById(route.params.id as string)
    );
  } else {
    promises.push(DrinksResource.Instance.getRandomDrink());
  }

  drinks.value = await Promise.all(promises);
}
</script>

<template>
  <div :class="{ 'home-view--with-open-modal': isVisibleModal }">
    <SiteHeader @refresh="fetchDrinks()" />
    <main class="screen static" tabindex="-1">
      <GridLayout>
        <DrinkCard v-for="drink in drinks" :key="drink.id" :drink="drink" />
      </GridLayout>
    </main>
    <RouterView />
  </div>
</template>

<style>
.card__overlapped-content {
  --stack-gap: var(--s-2);
}

.home-view--with-open-modal {
  height: 100vh;
  overflow-y: hidden;
}
</style>
