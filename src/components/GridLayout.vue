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
  --grid-min: 15rem;
}

.grid-layout > * {
  list-style: none;
}

@supports (width: min(var(--minimum), 100%)) {
  .grid-layout {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(var(--grid-min), 100%), 1fr)
    );
  }
}
</style>
