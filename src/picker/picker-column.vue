<template>
  <div :class="className" ref="root">
    <ul :class="wrapperClassName">
      <li :class="itemClassName" v-for="(option, index) in options" :key="index" >
        {{formatter(optionKey ? option[optionKey] : option)}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, onMounted, watch, nextTick, toRefs, defineComponent } from 'vue';
import {
  PickerColumnProps,
  IPickerColumnProps,
} from './picker.interface';
import config from '../config';
import Picker from './picker.class';

const { prefix } = config;
const name = `${prefix}-picker-column`;

export default defineComponent({
  props: PickerColumnProps,
  setup(props: IPickerColumnProps, context: SetupContext) {
    let picker: Picker|null = null;
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
