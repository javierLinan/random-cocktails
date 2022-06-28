<template>
  <div class="grid-layout">
    <slot />
  </div>
</template>

<style>
.grid-layout {
  display: grid;
  width: 100%;
  grid-gap: var(--grid-gap, var(--s2));
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
}

.grid-layout > * {
  list-style: none;
}

@media screen and (min-width: 1200px) {
  .grid-layout {
    width: 80%;
  }
}
</style>
