<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close"]);

onMounted(() => {
  document.addEventListener("keydown", escapeHandler);
});

onUnmounted(() => {
  document.removeEventListener("keydown", escapeHandler);
});

function escapeHandler(event: KeyboardEvent) {
  if (event.key === "Escape") {
    emit("close");
  }
}
</script>

<template>
  <div role="dialog" aria-modal="true">
    <div
      class="modal-layout__background-overlay"
      @click.prevent="$emit('close')"
    />
    <div class="modal-layout__content">
      <div class="modal-layout__content-title">
        <h1 v-if="$slots.title">
          <slot name="title" />
        </h1>
        <button @click.prevent="$emit('close')">
          <img
            alt="Close"
            src="@/assets/images/close-line.svg"
            width="30"
            height="30"
          />
        </button>
      </div>

      <div v-if="$slots.description" class="modal-layout__content-body">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<style>
.modal-layout__background-overlay {
  background: #000;
  opacity: 80%;
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-index_modal) - 1);
}

.modal-layout__content {
  background-color: #fff;
  border-radius: var(--r2);
  padding: var(--s2);
  inline-size: 37.5rem;
  max-block-size: 90vh;
  block-size: fit-content;
  position: fixed;
  inset-block-end: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, 50%);
  box-shadow: var(--shadow3);
  color: #000;
  z-index: var(--z-index_modal);
  display: flex;
  flex-direction: column;
}

.modal-layout__content-title {
  display: flex;
  inline-size: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.modal-layout__content-title > h1 {
  inline-size: 100%;
}

.modal-layout__content-title > button {
  border: none;
  padding: 0;
  margin: 0;
}

.modal-layout__content-title > button:hover {
  opacity: 0.5;
}

.modal-layout__content-body {
  margin: var(--s1) 0;
  flex: auto;
}

@media screen and (max-width: 599px) {
  .modal-layout__content {
    inline-size: 100%;
    padding-block: var(--s2);
    padding-inline-start: var(--s2);
    max-block-size: 60%;
    inset-block-end: 25%;
    inset-inline-start: 0;
    transform: translate(0, 0);
    border-radius: var(--r2) var(--r2) 0 0;
  }
}

@media screen and (min-width: 1200px) {
  .modal-layout__content {
    inline-size: 56.25rem;
  }
}
</style>
