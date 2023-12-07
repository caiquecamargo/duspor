import { action, map } from 'nanostores';
import { useStore } from '@nanostores/vue';
import { optimizedResizeEvent } from '@/utils/optimized-resized-event';

const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;
const xxl = 1536;

const screen = {
  sm,
  md,
  lg,
  xl,
  xxl,
  mobile: md,
  tablet: lg,
  desktop: xxl,
};

export type Screen = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'mobile' | 'tablet' | 'desktop';

const state = map({
  sm: false,
  md: false,
  lg: false,
  xl: false,
  xxl: false,
  mobile: true,
  tablet: false,
  desktop: false,
  innerWidth: 0,
});

function isBetween(min: Screen, max: Screen) {
  const minValue = screen[min];
  const maxValue = screen[max];

  const localState = state.get();

  return localState.innerWidth >= minValue && localState.innerWidth < maxValue;
};

function is(screen: Screen) {
  const localState = state.get();
  return localState[screen];
};

const update = action(state, 'update', (store) => {
  const width = window.innerWidth;

  store.setKey('innerWidth', width);

  store.setKey('sm', width >= sm && width < md);
  store.setKey('md', width >= md && width < lg);
  store.setKey('lg', width >= lg && width < xl);
  store.setKey('xl', width >= xl && width < xxl);
  store.setKey('xxl', width >= xxl);

  store.setKey('mobile', width < md);
  store.setKey('tablet', width >= md && width < lg);
  store.setKey('desktop', width >= lg);
});

export function useVueResponsive() {
  update();
  optimizedResizeEvent.add(update);

  const store = useStore(state);

  return {
    is,
    isBetween,
    store,
    state,
  };
}
