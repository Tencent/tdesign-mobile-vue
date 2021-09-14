<template>
  <div v-if="showBadge" :class="badgeClasses">
    <div :class="badgeInnerClasses" :style="badgeStyles">
      <TNode :content="countContent"></TNode>
    </div>
    <TNode :content="badgeContent"></TNode>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs } from 'vue';
import { renderContent, renderTNode, TNode } from '@/shared';
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
    const showBadge = computed(() => badgeContent.value !== undefined || props.showZero || props.count !== 0);

    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${name}`]: true,
      [`${name}__ribbon--outer`]: props.shape === 'ribbon',
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${name}--basic`]: true,
      [`${name}--has-children`]: !isIndependent.value,
      [`${name}--dot`]: props.dot,
      [`${name}--small`]: props.size === 'small',
      [`${name}--circle`]: props.shape === 'circle',
      [`${name}--round`]: props.shape === 'round',
      [`${name}--ribbon`]: props.shape === 'ribbon',
    }));

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      if (!props.offset) return {};
      let [xOffset, yOffset]: Array<string | number> = props.offset;
      xOffset = isNaN(Number(xOffset)) ? xOffset : `${xOffset}px`;
      yOffset = isNaN(Number(yOffset)) ? yOffset : `${yOffset}px`;
      return {
        background: props.color,
        right: `${xOffset}px`,
        top: `${yOffset}px`,
      };
    });

    return {
      badgeContent,
      showBadge,
      badgeStyles,
      badgeClasses,
      badgeInnerClasses,
      ...toRefs(props),
      countContent,
    };
  },
});
</script>
