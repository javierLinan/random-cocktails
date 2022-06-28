<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  width?: number;
}>();
</script>

<template>
  <span class="skeleton-line" :style="{ width: `${width || 100}%` }"></span>
</template>

<style>
.skeleton-line {
  display: inline-block;
  block-size: 1rem;
  position: relative;
  overflow: hidden;
  background-color: hsl(210, 14.3%, 94.5%);
  border-radius: var(--r2);
}

.skeleton-line::after {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    hsl(203 34.4% 12% / 0%) 0,
    hsl(203 34.4% 12% / 30%) 10%,
    hsl(203 34.4% 12% / 40%) 40%,
    hsl(203 34.4% 12% / 30%) 60%,
    hsl(203 34.4% 12% / 30%) 90%,
    hsl(203 34.4% 12% / 0%)
  );
  animation: shimmer 1.5s ease-in-out infinite;
  content: "";
}

@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
