<template>
  <TransitionRoot appear :show="isOpen" as="aside">
    <Dialog as="div" @close="close">
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="h-full px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-neutral-800 bg-opacity-10" />
          </TransitionChild>

          <span class="inline-block h-full align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="transform -translate-x-full"
            enter-to="transform translate-x-0"
            leave="duration-300 ease-in"
            leave-from="transform translate-x-0"
            leave-to="transform -translate-x-full"
          >
            <div
              class="fixed top-0 bottom-0 left-0 z-40 overflow-hidden will-change-auto"
            >
              <slot :is-open="isOpen" />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { PropType, Ref } from 'vue';
import { computed, onMounted } from 'vue';
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue';

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

const close = () => props.store.close();
const isOpen = computed(() => props.store.isOpen.value);

onMounted(() => {
  document.addEventListener('astro:after-swap', () => {
    close();
  });
});
</script>

<style lang="postcss" scoped></style>
