<template>
  <div :class="rootClassName">
    <div :class="`${name}__inner`">
      <div :class="`${name}-icon`" @click="onClickIcon">
        <span v-if="isDot" :class="`${name}-icon__dot`"></span>
        <div v-else :class="`${name}-icon__number`">
          <slot name="icon" >{{index + 1}}</slot></div>
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
import {
  computed,
  inject,
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import { StepItemProps, StepStatusEnum, TypeEnum } from './steps.interface';

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

    const parentType = computed(() => stepsProvide.type);

    const current = computed(() => (
      stepsProvide?.modelValue?.value
      || stepsProvide?.current?.value
      || stepsProvide?.defaultCurrent?.value
      || 0));

    const stepsStatus = computed(() => stepsProvide.status);
    const readonly = computed(() => stepsProvide.readonly);
    const rootClassName = computed(() => [name, readonly.value ? '' : `${name}--default`, curStatus.value ? `${name}--${curStatus.value}` : '']);

    const isDot = computed(() => parentType.value === 'dot' && stepsProvide.layout === 'vertical');

    const curStatus = computed(() => {
      let { status } = props;
      if (props.status) {
        return props.status;
      }
      if (index.value === current.value) {
        status = StepStatusEnum.Process;
        // TODO: corret type，暂时写成 any 为了打包编译通过
      } else if ((index.value as any) < current.value) {
        status = StepStatusEnum.Finish;
      } else {
        status = StepStatusEnum.Empty;
      }
      return status || '';
    });

    const onClickIcon  = (e: MouseEvent) => {
      if (parentType.value === TypeEnum.Dot) {
        return;
      }

      if (!readonly.value) {
        stepsProvide.onClickItem(index.value, current.value, e);
      }
    };

    return {
      name,
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
});
</script>
