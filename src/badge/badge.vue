<template>
  <div v-if="showBadge" :class="badgeClasses">
    <div v-if="showDot" :class="badgeInnerClasses" :style="badgeStyles">
      <t-node :content="countContent"></t-node>
    </div>
    <t-node :content="badgeContent"></t-node>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs } from 'vue';
import { renderContent, renderTNode, TNode } from '../shared';
import BadgeProps from './props';
import config from '../config';

const name = `${config.prefix}-badge`;

export default defineComponent({
  name,
  components: { TNode },
  props: BadgeProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const badgeContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const countContent = computed(() => {
      if (props.dot) {
        return '';
      }
      return renderTNode(internalInstance, 'count');
    });
    // 是否独立使用
    const isIndependent = computed(() => badgeContent.value === undefined);

    // 是否展示徽标
    const showBadge = computed(() => badgeContent.value !== undefined);

    // 是否展示红点角标
    const showDot = computed(() => props.dot || props.count !== 0 || props.showZero);

    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${name}`]: true,
      [`${name}__ribbon--outer`]: props.shape === 'ribbon',
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${name}__inner`]: true,
      [`${name}--has-children`]: !isIndependent.value,
      [`${name}--${props.size}`]: props.size,
      [`${name}--${props.shape}`]: props.shape && !props.dot,
      [`${name}--dot`]: props.dot,
    }));

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      if (!props.offset) {
        return { background: props.color };
      }
      let [xOffset, yOffset]: Array<string | number> = props.offset;
      xOffset = isNaN(Number(xOffset)) ? xOffset : `${xOffset}px`;
      yOffset = isNaN(Number(yOffset)) ? yOffset : `${yOffset}px`;
      return {
        background: props.color,
        right: xOffset,
        top: yOffset,
      };
    });

    return {
      badgeContent,
      showBadge,
      showDot,
      badgeStyles,
      badgeClasses,
      badgeInnerClasses,
      ...toRefs(props),
      countContent,
    };
  },
});
</script>
