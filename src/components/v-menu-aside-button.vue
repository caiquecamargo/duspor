<template>
  <div>
    <slot :toggle="toggle">
      <VButton @click.prevent="toggle">
        <template #default>
          <span class="sr-only">Mobile Menu</span>
        </template>
        <template #icon>
          <div class="relative w-5 h-5">
            <transition
              enter-active-class="transition duration-100 ease-out delay-200"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuIcon v-if="!isOpen" class="absolute w-5 h-5" />
              <CloseIcon v-else class="absolute w-5 h-5" />
            </transition>
          </div>
        </template>
      </VButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType, Ref } from 'vue';
import { computed } from 'vue';
import VButton from './v-button.vue';
import MenuIcon from '~icons/heroicons/bars-3';
import CloseIcon from '~icons/heroicons/x-circle';

interface AsideMenuStore {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const props = defineProps({
  store: {
    type: Object as PropType<AsideMenuStore>,
    required: true,
  },
});

const toggle = () => props.store.toggle();
const isOpen = computed(() => props.store.isOpen.value);
</script>
