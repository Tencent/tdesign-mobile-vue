import { computed, ref, watch, WritableComputedRef } from 'vue';
import { camelCase } from 'lodash-es';

function getDefaultName(key: string): string {
  const str = camelCase(key);
  return `default${str[0].toLocaleUpperCase() + str.slice(1)}`;
}

// eventName is keybase, change -> onChange; visible-change -> onVisibleChange
function getEventPropsName(eventName: string): string {
  const str = camelCase(eventName);
  return `on${str[0].toLocaleUpperCase()}${str.slice(1)}`;
}

/**
 * 受控和非受控逻辑处理，包含 value / modelValue / events
 * @param props 属性
 * @param emit 触发方法，context.emit
 * @param key 受控属性名称
 * @param eventName 事件名称
 * @example const [value, setValue] = useDefault();
 * @returns [value, setValue]
 */
export function useDefault<V, T>(props: T, emit: (...args: any[]) => void, key: string, eventName: string) {
  const modelValue = 'modelValue';
  const defaultName = getDefaultName(String(key));
  const innerValue = ref<V>();

  let isUsedModelValue = props[modelValue] !== undefined;
  let isUsedKey = props[key] !== undefined;

  watch(
    [() => props[modelValue], () => props[key]],
    ([newModelValue, newKeyValue], [oldModelValue, oldKeyValue]) => {
      if (newModelValue !== oldModelValue) {
        isUsedModelValue = true;
        innerValue.value = newModelValue;
      } else if (newKeyValue !== oldKeyValue) {
        isUsedKey = true;
        innerValue.value = newKeyValue;
      } else {
        innerValue.value = props[defaultName];
      }
    },
    { immediate: true },
  );

  function emitEvents<T extends Array<any>>(value: V, ...arg: T) {
    const updateKeys = [`update:${key}`];
    if (isUsedModelValue) {
      updateKeys.push(`update:${modelValue}`);
    }
    // Props Event exists in Vue3. `props.onChange()` is equal `context.emit('change')`
    updateKeys.forEach((updateKey) => {
      emit(updateKey, value, ...arg);
    });
    const propsEventName = getEventPropsName(eventName);
    props[propsEventName]?.(value, ...arg);
  }

  function setInnerValue<M extends Array<any>>(value: V, ...arg: M) {
    if (!isUsedKey && !isUsedModelValue) {
      innerValue.value = value;
    }
    emitEvents<M>(value, ...arg);
  }

  const innerValueRef = computed<V>({
    get() {
      return innerValue.value as V;
    },
    set(value: V) {
      setInnerValue(value);
    },
  });

  return [innerValueRef, setInnerValue] as [WritableComputedRef<V>, typeof setInnerValue];
}
