<template>
  <div :class="rootClassName">
    <div :class="`${name}__inner`">
      <div :class="`${name}-icon`" @click="onClickIcon">
        <span v-if="isDot" :class="`${name}-icon__dot`"></span>
        <div v-else :class="`${name}-icon__number`">
          <slot name="icon">{{ index + 1 }}</slot>
        </div>
      </div>
      <div :class="`${name}-content`">
        <div :class="`${name}-title`">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="`${name}-description`">
          <slot name="content">{{ content }}</slot>
        </div>
        <div :class="`${name}-extra`">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, inject, defineComponent, getCurrentInstance, ComponentInternalInstance } from 'vue';
import StepItemProps from './step-item-props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-step`;

export default defineComponent({
  name,
  props: StepItemProps,
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const stepsProvide: any = inject('stepsProvide');
    stepsProvide.relation(proxy);
    const index = computed(() => stepsProvide.state.children.indexOf(proxy));

    const theme = computed(() => stepsProvide.theme);

    const current = computed(() => stepsProvide.current.value || stepsProvide.defaultCurrent || 0);

    const stepsStatus = computed(() => stepsProvide.status);
    const readonly = computed(() => stepsProvide.readonly);

    const rootClassName = computed(() => [
      name,
      { [`${name}--default`]: !readonly.value },
      { [`${name}--${curStatus.value}`]: curStatus.value },
    ]);

    const isDot = computed(() => theme.value === 'dot' && stepsProvide.layout === 'vertical');

    const curStatus = computed(() => {
      const { status } = props;
      if (status !== 'default') return status;
      if (index.value < current.value) return 'finish';
      if (index.value === current.value) return 'process';
      return '';
    });

    const onClickIcon = (e: MouseEvent) => {
      if (!readonly.value && theme.value !== 'dot') {
        stepsProvide.onClickItem(index.value, current.value, e);
      }
    };

    return {
      name,
      current,
      curStatus,
      index,
      onClickIcon,
      theme,
      rootClassName,
      stepsStatus,
      readonly,
      isDot,
    };
  },
});
</script>
