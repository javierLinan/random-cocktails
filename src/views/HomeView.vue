<script setup lang="ts">
import { onBeforeMount, ref, type Ref, onMounted, onUnmounted } from "vue";
import { DrinksResource } from "../api/DrinkResource";
import type { DrinkDto } from "../dtos/DrinkDto";

const drinks: Ref<DrinkDto[]> = ref([]);

const windowTop = ref(0);

onBeforeMount(async () => {
  drinks.value =
    (await DrinksResource.Instance.getThreeRandomDrinks()) as DrinkDto[];
});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

function onScroll() {
  windowTop.value = window?.scrollY || 0;
}
</script>

<template>
  <header
    class="padded fixed bottom-separator"
    :class="{ 'bottom-separator--active': !!windowTop }"
  >
    <img
      class="spaced-h"
      alt="Random cocktails logo"
      src="@/assets/images/logo.svg"
      width="60"
      height="60"
    />
    <h1>Random cocktails</h1>
  </header>
  <main class="screen static" tabindex="-1">
    <div class="grid">
      <article class="stack" v-for="drink in drinks" :key="drink.idDrink">
        <h3 class="text-center one-line-clamp">{{ drink.strDrink }}</h3>
        <div class="card">
          <div class="card__image">
            <img :src="drink.strDrinkThumb" />
            <div class="card__overlapped-content">
              <div class="stack">
                <div v-if="!!drink.strIngredient1">
                  <span class="tag font-smaller">{{
                    drink.strIngredient1
                  }}</span>
                </div>
                <div v-if="!!drink.strIngredient2">
                  <span class="tag font-smaller">{{
                    drink.strIngredient2
                  }}</span>
                </div>
                <div v-if="!!drink.strIngredient3">
                  <span class="tag font-smaller">{{
                    drink.strIngredient3
                  }}</span>
                </div>
                <div v-if="!!drink.strIngredient4">
                  <span class="tag font-smaller">...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<style>
header {
  --padding: var(--s0);
  --spaced: var(--s0);
  display: flex;
  align-items: center;
}

.card__overlapped-content {
  --stack-gap: var(--s-2);
}
</style>
