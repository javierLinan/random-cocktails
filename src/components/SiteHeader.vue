<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const windowTop = ref(0);

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

function onScroll() {
  windowTop.value = window?.scrollY || 0;
}
</script>

<template>
  <header
    class="site-header padded fixed"
    :class="{ 'site-header--with-border-bottom': !!windowTop }"
  >
    <img
      class="spaced-h"
      alt="Random cocktails logo"
      src="@/assets/images/logo.svg"
      width="60"
      height="60"
    />
    <h1>Random cocktails</h1>
    <div class="padded-h pushed-right">
      <button icon="pushed-right" @click="$emit('refresh')">
        Refresh cocktails
      </button>
    </div>
  </header>
</template>

<style>
.site-header {
  --padding: var(--s-2);
  --spaced: var(--s0);
  display: flex;
  align-items: center;
  border-bottom: 2px solid #000;
}

.site-header--with-border-bottom {
  border-bottom: 2px solid #fff;
}
</style>
