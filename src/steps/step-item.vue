<template>
  <div :class="rootClassName" @click="onClickIcon">
    <!-- icon -->
    <div :class="iconWrapperClassName">
      <div v-if="dot" :class="dotClass"></div>
      <div v-else :class="iconClassName">
        <t-node :content="iconContent"></t-node>
      </div>
    </div>
    <!-- content -->
    <div :class="contentClass">
      <div :class="tilteClass">
        <t-node :content="titleContent"></t-node>
        <t-node :content="titleRightContent" />
      </div>
      <div :class="descriptionClass">
        <t-node :content="descContent"></t-node>
      </div>
      <div :class="extraClass">
        <t-node :content="extraContent"></t-node>
      </div>
    </div>
    <!-- line -->
    <div v-if="!isLastChild" :class="isLastChildClass"></div>
  </div>
</template>

<script lang="ts">
import { computed, inject, defineComponent, getCurrentInstance, ComponentInternalInstance, h, onUnmounted } from 'vue';
import { CloseIcon, CheckIcon } from 'tdesign-icons-vue-next';

import StepItemProps from './step-item-props';
import { renderTNode, TNode } from '../shared';

import config from '../config';

const { prefix } = config;
const name = `${prefix}-step-item`;

export default defineComponent({
  name,
  components: { TNode },
  props: StepItemProps,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const { proxy } = internalInstance as ComponentInternalInstance;
    const stepsProvide: any = inject('stepsProvide', undefined);
    stepsProvide.relation(proxy);
    const iconDefault = {
      check: h(CheckIcon),
      close: h(CloseIcon),
    };

    const index = computed(() => stepsProvide.state.children.indexOf(proxy));
    const isLastChild = computed(() => {
      return stepsProvide.state.children.length - 1 === index.value;
    });

    const theme = computed(() => stepsProvide.theme);
    const dot = computed(() => theme.value === 'dot');
    const icon = computed(() => props.icon || context.slots.icon);
    const iconNode = computed(() => renderTNode(internalInstance, 'icon'));

    const iconContent = computed(() => {
      if (icon.value) {
        return iconNode.value;
      }
      if (currentStatus.value === 'error') {
        return iconDefault.close;
      }
      if (currentStatus.value === 'finish') {
        return iconDefault.check;
      }
      return index.value + 1;
    });
    const titleContent = computed(() => renderTNode(internalInstance, 'title'));
    const titleRightContent = computed(() => renderTNode(internalInstance, 'titleRight'));
    const descContent = computed(() => renderTNode(internalInstance, 'content'));
    const extraContent = computed(() => renderTNode(internalInstance, 'extra'));

    const current = computed(() => stepsProvide.current.value || stepsProvide.defaultCurrent || 0);
    const stepsStatus = computed(() => stepsProvide.currentStatus);
    const readonly = computed(() => stepsProvide.readonly);
    const currentStatus = computed(() => {
      const { status } = props;
      if (status !== 'default') return status;
      if (index.value === current.value) return stepsStatus.value;
      if (index.value < current.value) return 'finish';
      return status;
    });

    const rootClassName = computed(() => [
      name,
      `${name}--${stepsProvide.layout}`,
      { [`${name}--default`]: readonly.value },
      { [`${name}--${currentStatus.value}`]: currentStatus.value },
    ]);
    const iconWrapperClassName = computed(() => [`${name}__anchor`, `${name}__anchor--${stepsProvide.layout}`]);
    const dotClass = computed(() => [`${name}__dot`, `${name}__dot--${currentStatus.value}`]);

    const iconClassName = computed(() => [
      { [`${name}__icon`]: icon.value },
      { [`${name}__icon--${currentStatus.value}`]: icon.value },
      { [`${name}__circle`]: !icon.value },
      { [`${name}__circle--${currentStatus.value}`]: !icon.value },
    ]);
    const contentClass = computed(() => [
      `${name}__content`,
      `${name}__content--${stepsProvide.layout}`,
      {
        [`${name}__content--${stepsProvide.layout}`]: isLastChild.value,
      },
      {
        [`${name}__content--last`]: isLastChild.value,
      },
    ]);
    const tilteClass = computed(() => [
      `${name}__title`,
      `${name}__title--${currentStatus.value}`,
      `${name}__title--${stepsProvide.layout}`,
    ]);
    const descriptionClass = computed(() => [
      `${name}__description`,
      `${name}__description--${currentStatus.value}`,
      `${name}__description--${stepsProvide.layout}`,
    ]);
    const extraClass = computed(() => [
      `${name}__extra`,
      `${name}__extra--${currentStatus.value}`,
      `${name}__extra--${stepsProvide.layout}`,
    ]);
    const isLastChildClass = computed(() => [
      name,
      `${name}__line`,
      `${name}__line--${currentStatus.value}`,
      `${name}__line--${stepsProvide.layout}`,
      `${name}__line--${stepsProvide.theme}`,
    ]);

    const onClickIcon = (e: MouseEvent) => {
      if (!readonly.value) {
        stepsProvide.onClickItem(index.value, current.value, e);
      }
    };

    onUnmounted(() => {
      stepsProvide.removeRelation(proxy);
    });

    return {
      isLastChild,
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
      titleRightContent,
      extraContent,
      rootClassName,
      currentStatus,
      dotClass,
      iconWrapperClassName,
      iconClassName,
      isLastChildClass,
      contentClass,
      tilteClass,
      descriptionClass,
      extraClass,
    };
  },
});
</script>
