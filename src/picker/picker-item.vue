<template>
  <div ref="root" :class="className">
    <ul :class="wrapperClassName">
      <li v-for="(option, index) in options" :key="index" :class="itemClassName">
        {{ formatter(typeof option === 'object' ? option.label : option) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch, nextTick, toRefs, defineComponent } from 'vue';
import config from '../config';
import Picker from './picker.class';
import { PickerItemProps } from './props';

const { prefix } = config;
const name = `${prefix}-picker-item`;

export default defineComponent({
  name,
  props: PickerItemProps,
  emits: ['change'],
  setup(props, context) {
    let picker: Picker | null = null;
    const el = document.createElement('div');
    const root = ref(el);

    const getDefaultIndex = (val: number | string | undefined) => {
      let defaultIndex = 0;
      if (val !== undefined) {
        defaultIndex =
          typeof val === 'object'
            ? props.options.findIndex((item: any) => item.value === val)
            : props.options.indexOf(val);
      }
      return defaultIndex < 0 ? 0 : defaultIndex;
    };

    const defaultIndex: number = getDefaultIndex(props.value);
    const curIndex = ref(defaultIndex);
    const className = computed(() => `${name}`);
    const wrapperClassName = computed(() => [`${name}__wrapper`]);
    const itemClassName = computed(() => [`${name}__item`]);

    watch(
      () => props.options,
      () => {
        nextTick(() => {
          if (picker) picker.update();
        });
      },
    );

    watch(
      () => props.value,
      (val) => {
        nextTick(() => {
          if (picker) picker.updateIndex(getDefaultIndex(val));
        });
      },
    );

    onMounted(() => {
      picker = new Picker({
        el: root.value,
        defaultIndex: +(defaultIndex || 0),
        onChange: (index: number) => {
          curIndex.value = index;
          const curItem = props.options[index];
          const curValue = typeof curItem === 'object' ? curItem.value : curItem;
          context.emit('change', {
            value: curValue,
            index,
          });
        },
      });
    });

    return {
      root,
      className,
      wrapperClassName,
      itemClassName,
      curIndex,
      ...toRefs(props),
    };
  },
});
</script>
