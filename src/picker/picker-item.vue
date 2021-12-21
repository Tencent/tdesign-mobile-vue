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
    const curIndex = ref(props.value);
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
        defaultIndex: props.value,
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
