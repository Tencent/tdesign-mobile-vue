import { isRef, Ref, ref } from 'vue';

export type ToggleValueType = string | number | boolean | undefined;

export function useToggle<T extends ToggleValueType>(values: Array<T>, defaultValue?: T | Ref<T>) {
  const innerValues = values || [true, false];
  let state = ref();
  if (defaultValue === undefined) {
    state = ref(innerValues[1]);
  } else if (isRef(defaultValue)) {
    state = defaultValue;
  } else {
    state = ref(defaultValue);
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
