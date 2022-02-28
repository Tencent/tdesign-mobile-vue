<template>
  <div :class="rootClassName">
    <div :class="innerClassName" @click="onClickIcon">
      <div :class="`${name}-icon`">
        <div :class="iconClassName">
          <t-node :content="iconContent"></t-node>
        </div>
      </div>
      <div :class="`${name}-content`">
        <div :class="`${name}-title`">
          <t-node :content="titleContent"></t-node>
        </div>
        <div :class="`${name}-description`">
          <t-node :content="descContent"></t-node>
        </div>
        <div :class="`${name}-extra`">
          <t-node :content="extraContent"></t-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, inject, defineComponent, getCurrentInstance, ComponentInternalInstance } from 'vue';
import StepItemProps from './step-item-props';
import { renderTNode, TNode } from '../shared';

import config from '../config';

const { prefix } = config;
const name = `${prefix}-step`;

export default defineComponent({
  name,
  components: { TNode },
  props: StepItemProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const { proxy } = internalInstance as ComponentInternalInstance;
    const stepsProvide: any = inject('stepsProvide', undefined);
    stepsProvide.relation(proxy);

    const index = computed(() => stepsProvide.state.children.indexOf(proxy));
    const theme = computed(() => stepsProvide.theme);
    const dot = computed(() => theme.value === 'dot' && stepsProvide.layout === 'vertical');
    const iconNode = computed(() => renderTNode(internalInstance, 'icon'));

    const iconContent = computed(() => {
      if (dot.value) {
        return '';
      }
      if (typeof iconNode.value === 'boolean') {
        return iconNode.value ? index.value + 1 : '';
      }
      return iconNode.value;
    });
    const titleContent = computed(() => renderTNode(internalInstance, 'title'));
    const descContent = computed(() => renderTNode(internalInstance, 'content'));
    const extraContent = computed(() => renderTNode(internalInstance, 'extra'));

    const current = computed(() => stepsProvide.current.value || stepsProvide.defaultCurrent || 0);

    const stepsStatus = computed(() => stepsProvide.status);
    const readonly = computed(() => stepsProvide.readonly);

    const rootClassName = computed(() => [
      name,
      { [`${name}--default`]: !readonly.value },
      { [`${name}--${currentStatus.value}`]: currentStatus.value },
    ]);
    const innerClassName = computed(() => {
      if (typeof iconNode.value === 'boolean') {
        return [`${name}__inner`];
      }
      return [`${name}__inner`, `${name}__inner__icon`];
    });
    const iconClassName = computed(() => [`${name}-icon__number`, { [`${name}-icon__dot`]: dot.value }]);

    const currentStatus = computed(() => {
      const { status } = props;
      if (status !== 'default') return status;
      if (index.value < current.value) return 'finish';
      if (index.value === current.value) return 'process';
      return '';
    });

    const onClickIcon = (e: MouseEvent) => {
      if (!readonly.value && !dot.value) {
        stepsProvide.onClickItem(index.value, current.value, e);
      }
    };

    return {
      dot,
      name,
      theme,
      index,
      current,
      readonly,
      iconNode,
      stepsStatus,
      descContent,
      iconContent,
      onClickIcon,
      titleContent,
      extraContent,
      rootClassName,
      currentStatus,
      iconClassName,
      innerClassName,
    };
  },
});
</script>
