<template>
  <div class="card-layout">
    <div class="card-layout__image">
      <slot name="image"></slot>
      <div class="card-layout__overlapped-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.card-layout__image {
  position: relative;
  overflow: hidden;
  border-radius: var(--r2);
}

.card-layout__image img {
  transition-duration: 150ms;
  border-radius: var(--r2);
}
.card-layout__image img:hover {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-property: transform;
  transition-duration: 150ms;
  transform: scale(1.1);
}

.card-layout__overlapped-content {
  position: absolute;
  bottom: 0;
  padding: var(--s0);
}
</style>
