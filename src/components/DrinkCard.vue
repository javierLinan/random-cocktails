<script setup lang="ts">
import { defineProps } from "vue";
import StackLayout from "./StackLayout.vue";
import type { Drink } from "../models/Drink";
import TagItem from "./TagItem.vue";
import CardLayout from "./CardLayout.vue";
import { RouterLink } from "vue-router";
import { labelToKey } from "../helpers/labelToKey";

defineProps<{
  drink: Drink;
}>();
</script>

<template>
  <article class="drink-card">
    <StackLayout>
      <h3 class="text-center one-line-clamp">
        {{ drink.name }}
      </h3>
      <CardLayout>
        <template v-slot:image>
          <RouterLink :to="{ name: 'drink', params: { id: drink.id } }"
            ><img :src="drink.thumbnail"
          /></RouterLink>
        </template>

        <StackLayout class="drink-card__ingredients">
          <div
            v-for="ingredient in drink.ingredients.slice(0, 3)"
            :key="`drink-card-ingredient-${labelToKey(ingredient)}`"
          >
            <TagItem>{{ ingredient }}</TagItem>
          </div>

          <div v-if="drink.ingredients.length > 3">
            <TagItem>...</TagItem>
          </div>
        </StackLayout>
      </CardLayout>
    </StackLayout>
  </article>
</template>

<style>
.drink-card__ingredients {
  --stack-gap: var(--s-1);
}
</style>
