<template>
  <div ref="root" :class="className">
    <ul :class="wrapperClassName">
      <li v-for="(option, index) in options" :key="index" :class="itemClassName">
        {{ formatter(optionKey ? option[optionKey] : option) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch, nextTick, toRefs, defineComponent } from 'vue';
import config from '../config';
import Picker from './picker.class';
import { pickerColumnProps } from './picker.interface';

const { prefix } = config;
const name = `${prefix}-picker-column`;

export default defineComponent({
  props: pickerColumnProps,
  emits: ['change'],
  setup(props, context) {
    let picker: Picker | null = null;
    const el = document.createElement('div');
    const root = ref(el);
    const curIndex = ref(props.defaultIndex);
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

    onMounted(() => {
      picker = new Picker({
        el: root.value,
        defaultIndex: props.defaultIndex,
        onChange: (index: number) => {
          curIndex.value = index;
          context.emit('change', {
            value: props.options[index],
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
