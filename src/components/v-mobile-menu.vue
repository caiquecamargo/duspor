<template>
  <VMenuAsideButton class="text-black dark:text-white" :store="menuStore" />
  <VMenuAside :store="menuStore">
    <slot />
  </VMenuAside>
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { close, open, state, toggle } from '@/stores/aside-menu';
import VMenuAside from '@/components/v-menu-aside.vue';
import VMenuAsideButton from '@/components/v-menu-aside-button.vue';

const store = useStore(state);

const menuStore = {
  isOpen: store,
  open,
  close,
  toggle,
};
</script>

<style lang="postcss" scoped></style>
