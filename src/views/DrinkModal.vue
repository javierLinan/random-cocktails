<script setup lang="ts">
import ModalLayout from "../components/ModalLayout.vue";
import ClusterLayout from "../components/ClusterLayout.vue";
import { inject } from "vue";
import type { Drink } from "@/models/Drink";
import { labelToKey } from "../helpers/labelToKey";
import StackLayout from "../components/StackLayout.vue";
import { useRouter } from "vue-router";

const selectedDrink = inject<Drink>("selectedDrink");

const router = useRouter();

function navigateToHomePage() {
  router.push({ name: "home" });
}
</script>

<template>
  <ModalLayout @close="navigateToHomePage">
    <template v-slot:title>{{ selectedDrink?.name }}</template>
    <template v-slot:description>
      <StackLayout>
        <p>{{ selectedDrink?.instructions }}</p>
        <ClusterLayout>
          <div
            v-for="(ingredient, index) in selectedDrink?.ingredients"
            :key="`drink-modal-ingredient-${labelToKey(ingredient)}`"
          >
            {{ selectedDrink?.measures[index] }}
            <strong>{{ ingredient }}</strong
            ><span v-if="index < (selectedDrink?.ingredients || []).length - 1"
              >,</span
            >
          </div>
        </ClusterLayout>
        <p><strong>Glass :</strong> {{ selectedDrink?.glass }}</p>
      </StackLayout>
    </template>
  </ModalLayout>
</template>
