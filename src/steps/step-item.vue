<template>
  <div :class="rootClassName">
    <div :class="`${baseClassName}__inner`">
      <div :class="`${baseClassName}-icon`" @click="onClickIcon">
        <slot name="icon" >
          <span v-if="isDot" :class="`${baseClassName}-icon__dot`"></span>
          <span v-else :class="`${baseClassName}-icon__number`">{{index + 1}}</span>
        </slot>
      </div>
      <div :class="`${baseClassName}-content`">
        <div :class="`${baseClassName}-title`">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="`${baseClassName}-description`">
          <slot name="content">{{ content }}</slot>
        </div>
        <div :class="`${baseClassName}-extra`">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, inject, SetupContext } from 'vue';
import { StepItemProps } from './steps.interface';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-steps-item`;

export default {
  name,
  props: StepItemProps,
  setup(props: StepItemProps, context: SetupContext) {
    const { attrs } = context;
    const index = ref(attrs.index);

    const stepsProvide: any = inject('stepsProvide', undefined);

    const baseClassName = computed(() => name);

    const parentType = computed(() => stepsProvide.type);
    const current = computed(() => (stepsProvide?.modelValue?.value || stepsProvide?.current?.value || 0));
    const stepsStatus = computed(() => stepsProvide.status);
    const rootClassName = computed(() => [name, curStatus.value ? `${name}--${curStatus.value}` : '']);
    const readonly = computed(() => stepsProvide.readonly);

    const isDot = computed(() => parentType.value === 'dot' && stepsProvide.direction === 'vertical');

    let { status } = props;
    const curStatus = computed(() => {
      if (props.status) {
        return props.status;
      }
      if (index.value === current.value) {
        status = 'process';
      } else if (index.value < current.value) {
        status = 'finish';
      } else {
        status = '';
      }
      return status || '';
    });

    const onClickIcon  = () => {
      if (
        stepsProvide.direction === 'vertical'
        || parentType.value !== 'default') {
        return;
      }

      if (!readonly.value) {
        stepsProvide.onClickItem(index.value);
      }
    };

    return {
      baseClassName,
      current,
      curStatus,
      index,
      onClickIcon,
      parentType,
      rootClassName,
      stepsStatus,
      readonly,
      isDot,
    };
  },
};
</script>
