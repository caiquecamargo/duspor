<template>
  <VMenuAsideButton class="text-black" :store="menuStore" />
  <VMenuAside :store="menuStore">
    <slot />
  </VMenuAside>
</template>

<script setup lang="ts">
import VMenuAsideButton from '@/components/v-menu-aside-button.vue';
import VMenuAside from '@/components/v-menu-aside.vue';
import { close, open, state, toggle } from '@/stores/aside-menu';
import { useStore } from '@nanostores/vue';

const store = useStore(state);

const menuStore = {
  isOpen: store,
  open,
  close,
  toggle,
};
</script>

<style lang="postcss" scoped></style>
