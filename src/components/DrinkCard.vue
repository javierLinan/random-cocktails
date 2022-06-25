<script setup lang="ts">
import { defineProps } from "vue";
import StackLayout from "./StackLayout.vue";
import type { DrinkDto } from "../dtos/DrinkDto";
import TagItem from "./TagItem.vue";
import CardItem from "./CardItem.vue";

defineProps<{
  drink: DrinkDto;
}>();
</script>

<template>
  <article class="drink-card">
    <StackLayout>
      <h3 class="text-center one-line-clamp">{{ drink.strDrink }}</h3>
      <CardItem>
        <template v-slot:image>
          <img :src="drink.strDrinkThumb" />
        </template>

        <StackLayout>
          <div v-if="!!drink.strIngredient1">
            <TagItem>{{ drink.strIngredient1 }}</TagItem>
          </div>
          <div v-if="!!drink.strIngredient2">
            <TagItem>{{ drink.strIngredient2 }}</TagItem>
          </div>
          <div v-if="!!drink.strIngredient3">
            <TagItem>{{ drink.strIngredient3 }}</TagItem>
          </div>
          <div v-if="!!drink.strIngredient4">
            <TagItem>...</TagItem>
          </div>
        </StackLayout>
      </CardItem>
    </StackLayout>
  </article>
</template>

<style></style>
