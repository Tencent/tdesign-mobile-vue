<template>
  <div :class="badgeClasses">
    <div :class="`${name}__content`">
      <t-node v-if="!content" :content="badgeContent" />
      <span v-else :class="`${name}__content-text`">{{ content }}</span>
    </div>
    <div v-if="isShowBadge" :class="badgeInnerClasses" :style="badgeStyles">
      <div
        v-if="shape === 'ribbon'"
        :class="`${name}__ribbon--before`"
        :style="color ? `border-color: ${color}` : ''"
      />
      {{ badgeValue }}
      <div v-if="shape === 'ribbon'" :class="`${name}__ribbon--after`" :style="color ? `border-color: ${color}` : ''" />
    </div>
    <t-node :content="countContent" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs } from 'vue';
import { renderContent, renderTNode, TNode } from '../shared';
import BadgeProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-badge`;

export default defineComponent({
  name,
  components: { TNode },
  props: BadgeProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const badgeContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const countContent = computed(() => {
      if (typeof props.count === 'function') {
        return renderTNode(internalInstance, 'count');
      }
      return null;
    });

    // 是否展示角标
    const isShowBadge = computed(() => {
      if (props.dot) {
        return true;
      }
      const count = Number(props.count);
      if (!props.showZero && !isNaN(count) && count === 0) {
        return false;
      }
      if (props.count == null) return false;
      return true;
    });

    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${name}`]: true,
      [`${name}__ribbon-outer`]: props.shape === 'ribbon',
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${name}--basic`]: true,
      [`${name}--dot`]: props.dot,
      [`${name}--${props.size}`]: true,
      [`${name}--${props.shape}`]: true,
      [`${name}--count`]: !props.dot && props.count,
      [`${prefix}-has-count`]: true,
    }));

    const hasUnit = (unit: string) =>
      unit.indexOf('px') > 0 ||
      unit.indexOf('rpx') > 0 ||
      unit.indexOf('em') > 0 ||
      unit.indexOf('rem') > 0 ||
      unit.indexOf('%') > 0 ||
      unit.indexOf('vh') > 0 ||
      unit.indexOf('vm') > 0;

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      if (!props.offset) {
        return { background: props.color };
      }
      let [xOffset, yOffset]: Array<string | number> = props.offset;
      xOffset = hasUnit(xOffset.toString()) ? xOffset : `${xOffset}px`;
      yOffset = hasUnit(yOffset.toString()) ? yOffset : `${yOffset}px`;
      return {
        background: props.color,
        right: xOffset,
        top: yOffset,
      };
    });

    const badgeValue = computed(() => {
      if (props.dot) {
        return '';
      }
      const count = Number(props.count);
      if (isNaN(count) || isNaN(props.maxCount)) {
        return props.count;
      }
      return count > props.maxCount ? `${props.maxCount}+` : count;
    });

    return {
      ...toRefs(props),
      name,
      badgeClasses,
      badgeContent,
      countContent,
      isShowBadge,
      badgeInnerClasses,
      badgeStyles,
      badgeValue,
    };
  },
});
</script>
