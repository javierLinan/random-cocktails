<script setup lang="ts">
import { defineProps } from "vue";
import StackLayout from "./StackLayout.vue";
import type { Drink } from "../models/Drink";
import TagItem from "./TagItem.vue";
import CardItem from "./CardItem.vue";

function toKey(label: string) {
  return label.replace(" ", "-");
}

defineProps<{
  drink: Drink;
}>();
</script>

<template>
  <article class="drink-card">
    <StackLayout>
      <h3 class="text-center one-line-clamp">{{ drink.name }}</h3>
      <CardItem>
        <template v-slot:image>
          <img :src="drink.thumbnail" />
        </template>

        <StackLayout class="drink-card__ingredients">
          <div
            v-for="ingredient in drink.ingredients.slice(0, 3)"
            :key="`drink-card-ingredient-${toKey(ingredient)}`"
          >
            <TagItem>{{ ingredient }}</TagItem>
          </div>

          <div v-if="drink.ingredients.length > 3">
            <TagItem>...</TagItem>
          </div>
        </StackLayout>
      </CardItem>
    </StackLayout>
  </article>
</template>

<style>
.drink-card__ingredients {
  --stack-gap: var(--s-1);
}
</style>
