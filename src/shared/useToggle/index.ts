import { toggleElem } from 'esm/collapse/util';
import { isRef, Ref, ref } from 'vue';

export type ToggleValueType = string | number | boolean | undefined;

export function useToggle<T extends ToggleValueType>(values: Array<T>, defaultValue?: T | Ref<T>) {
  const innerValues = values || [true, false];
  let state = ref(defaultValue || innerValues[1]) as Ref<T>;
  if (isRef(defaultValue)) {
    state = defaultValue;
  }
  const toggle = (value?: T) => {
    if (value !== undefined) {
      state.value = value;
    } else {
      state.value = state.value === innerValues[1] ? innerValues[0] : innerValues[1];
    }
  };
  return {
    state,
    toggle,
  };
}
