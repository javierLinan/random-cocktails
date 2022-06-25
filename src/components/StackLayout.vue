<template>
  <div class="stack-layout">
    <slot />
  </div>
</template>

<style>
.stack-layout {
  display: flex;
  flex-direction: column;
}

.stack-layout > * + * {
  margin: 0;
  margin-top: var(--stack-gap, var(--s1));
}
</style>
