<template>
  <div class="cluster-layout">
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
.cluster-layout > * {
  margin: calc(var(--s-2) / 2 * -1);
}

.cluster-layout > * > * {
  display: inline-block;
  margin: calc(var(--s-2) / 2);
}
</style>
