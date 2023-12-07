<template>
  <button
    :type="type"
    class="flex items-center gap-1 text-sm transition-colors duration-300 rounded md:hover:duration-150"
    :class="[
      resolveSize,
      active ? `${activeColor} ${textColorActive}` : '',
      disabled
        ? `bg-gray-400 hover:bg-gray-400 text-gray-200`
        : `${$attrs.class}`,
      flexDirection,
    ]"
    :disabled="disabled"
    v-on="{ click: $attrs.onClick }"
  >
    <slot name="icon" />
    <p v-if="label" v-text="label" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, toRefs } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  textColorActive: {
    type: String,
    default: 'text-white',
  },
  label: String,
  activeColor: {
    type: String,
    default: 'bg-primary',
  },
  reversed: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
  },

  large: {
    type: Boolean,
    default: false,
  },
  medium: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: true,
  },
});

const { large, small, medium } = toRefs(props);

const resolveSize = computed(() => {
  if (large.value)
    return 'px-6 py-3';
  if (medium.value)
    return 'px-4 py-2';
  if (small.value)
    return 'px-2 py-1';

  return 'px-4 py-2';
});

const flexDirection = computed(() =>
  !props.reversed
    ? 'flex-row justify-start'
    : 'flex-row-reverse justify-between',
);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
