<template>
  <div class="tag-item">
    <slot />
  </div>
</template>

<style>
.tag-item {
  background-color: #000;
  padding-left: var(--s-3);
  padding-right: var(--s-3);
  padding-top: var(--s-5);
  padding-bottom: var(--s-5);
  display: inline;
  border-radius: var(--r2);
  font-size: var(--s-1);
}
</style>
