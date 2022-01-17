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
    let defaultIndex: number = 0;
    if (props.value) {
      defaultIndex =
        typeof props.value === 'object'
          ? props.options.findIndex((item: any) => item.value === props.value)
          : props.options.indexOf(props.value);
    }
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
          let defaultIndex: number = 0;
          if (val) {
            defaultIndex =
              typeof val === 'object'
                ? props.options.findIndex((item: any) => item.value === val)
                : props.options.indexOf(val);
          }
          if (picker) picker.updateIndex(defaultIndex);
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
