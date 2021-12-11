import { isRef, Ref, ref } from 'vue';

export type ToggleValueType = string | number | boolean | undefined | null;

export function useToggle(
  values: Array<ToggleValueType> = [false, true],
  defaultValue?: ToggleValueType | Ref<ToggleValueType>,
) {
  let state = ref(defaultValue || values[0]) as Ref<ToggleValueType>;
  if (isRef(defaultValue)) {
    state = defaultValue;
  }
  const toggle = (value?: ToggleValueType) => {
    if (value !== undefined) {
      state.value = value;
    } else {
      state.value = state.value === values[0] ? values[1] : values[0];
    }
  };
  return {
    state,
    toggle,
  };
}
