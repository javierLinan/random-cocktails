<script setup lang="ts">
import ModalLayout from "./ModalLayout.vue";
import SkeletonLine from "./SkeletonLine.vue";
</script>

<template>
  <ModalLayout @close="$emit('close')">
    <template v-slot:title><SkeletonLine :width="80" /></template>
    <template v-slot:description>
      <p><SkeletonLine :width="80" /></p>
      <p><SkeletonLine :width="90" /></p>
      <p><SkeletonLine :width="100" /></p>
      <p><SkeletonLine :width="100" /></p>
      <p><SkeletonLine :width="50" /></p>
    </template>
  </ModalLayout>
</template>
