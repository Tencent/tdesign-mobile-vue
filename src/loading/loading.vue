<template>
  <div :class="rootClass" :style="rootStyle">
    <template v-if="indicator && realLoading">
      <gradient-icon v-if="theme === 'circular'" :style="animationStyle" />
      <spinner-icon v-else-if="theme === 'spinner'" :style="animationStyle" />
      <div v-else-if="theme === 'dots'" :class="`${name}__dots`" :style="animationStyle">
        <div
          :class="`${name}__dot`"
          :style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: 0s` : ''"
        ></div>
        <div
          :class="`${name}__dot`"
          :style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: ${(duration * 1) / 3000}s` : ''"
        ></div>
        <div
          :class="`${name}__dot`"
          :style="duration ? `animation-duration: ${duration / 1000}s; animation-delay: ${(duration * 2) / 3000}s` : ''"
        ></div>
      </div>
    </template>
    <span v-if="textContent && realLoading" :class="textClass">
      <t-node :content="textContent" />
    </span>
    <t-node :content="defaultContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, watch, toRefs } from 'vue';
import GradientIcon from './icon/gradient.vue';
import SpinnerIcon from './icon/spinner.vue';
import { renderTNode, TNode, renderContent } from '../shared';

import config from '../config';
import LoadingProps from './props';

const { prefix } = config;
const name = `${prefix}-loading`;

export default defineComponent({
  name,
  components: {
    GradientIcon,
    SpinnerIcon,
    TNode,
  },
  props: LoadingProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const delayShowLoading = ref(false);
    const { pause } = toRefs(props);

    const countDelay = () => {
      delayShowLoading.value = false;
      const timer = setTimeout(() => {
        delayShowLoading.value = true;
        clearTimeout(timer);
      }, props.delay);
    };

    const realLoading = computed(() => (!props.delay || delayShowLoading.value) && props.loading);

    watch(
      () => props.loading,
      (value) => {
        if (value) {
          props.delay && countDelay();
        }
      },
      {
        immediate: true,
      },
    );

    const rootClass = computed(() => [name, { [`${name}--vertical`]: props.layout === 'vertical' }]);

    const textClass = computed(() => [
      `${name}__text`,
      {
        [`${name}__text--only`]: !props.indicator,
      },
    ]);

    const textContent = computed(() => {
      return renderTNode(internalInstance, 'text');
    });

    const defaultContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    const rootStyle = computed(() => {
      const style = [];
      if (props.inheritColor) {
        style.push('color: inherit');
      }
      if (props.size) {
        style.push(`font-size: ${props.size};`);
      }
      return style.join(';');
    });

    const animationStyle = computed(() => {
      const ans: Record<string, any> = {};
      if (props.pause) {
        ans['animation-play-state'] = 'paused';
      }
      if (props.reverse) {
        ans['animation-direction'] = 'reverse';
      }
      if (props.duration) {
        ans['animation-duration'] = `${props.duration}ms`;
      }
      if (props.size) {
        ans.width = props.size;
        ans.height = props.size;
      }
      return ans;
    });

    return {
      name,
      pause,
      rootClass,
      textClass,
      textContent,
      defaultContent,
      rootStyle,
      animationStyle,
      realLoading,
    };
  },
});
</script>
