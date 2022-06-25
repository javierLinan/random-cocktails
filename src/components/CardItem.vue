<template>
  <div class="card-item">
    <div class="card-item__image">
      <slot name="image"></slot>
      <div class="card-item__overlapped-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.card-item__image {
  position: relative;
  overflow: hidden;
  border-radius: 0.6em;
}

.card-item__image img {
  transition-duration: 150ms;
  border-radius: 0.6em;
}
.card-item__image img:hover {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-property: transform;
  transition-duration: 150ms;
  transform: scale(1.1);
}

.card-item__overlapped-content {
  position: absolute;
  bottom: 0;
  padding: var(--s0);
}
</style>
