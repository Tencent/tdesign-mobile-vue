<template>
  <div :class="rootClass" :style="rootStyle">
    <div v-if="theme === 'bar' && progress && ![0, 1].includes(progress)" :class="`${name}__bar`" :style="barStyle">
      <div :class="`${name}__shadow`"></div>
    </div>
    <template v-else-if="theme !== 'bar'">
      <template v-if="indicator && realLoading">
        <gradient-icon v-if="theme === 'circular'" :style="animationStyle" />
        <spinner-icon v-else-if="theme === 'spinner'" :style="animationStyle" />
        <div v-else-if="theme === 'dots'" :class="`${name}__dots`" :style="animationStyle" />
      </template>
      <span v-if="textContent && realLoading" :class="textClass">
        <t-node :content="textContent"></t-node>
      </span>
      <t-node :content="defaultContent"></t-node>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, watch, toRefs } from 'vue';
import GradientIcon from './icon/gradient.vue';
import SpinnerIcon from './icon/spinner.vue';
import { renderTNode, TNode, renderContent } from '../shared';
import CLASSNAMES from '../shared/constants';

import config from '../config';
import LoadingProps from './props';

const { prefix } = config;
const name = `${prefix}-loading`;

const toBarPerc = (n?: number) => {
  if (!n || n <= 0) return -100;
  if (n > 1) return 0;
  return (-1 + n) * 100;
};

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

    const rootClass = computed(() => [
      name,
      { [`${name}--vertical`]: props.layout === 'vertical' },
      { [`${name}--bar`]: props.theme === 'bar' },
      props.size ? CLASSNAMES.SIZE[props.size] : '',
    ]);

    const textClass = computed(() => [
      `${name}__text`,
      { [`${name}__text--error`]: props.theme === 'error' },
      {
        [`${name}__text--only`]: !props.indicator || props.theme === 'error',
      },
    ]);

    const textContent = computed(() => {
      if (props.theme === 'error') {
        return '加载失败';
      }
      return renderTNode(internalInstance, 'text');
    });

    const defaultContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    const rootStyle = computed(() => {
      if (props.inheritColor) {
        return 'color: inherit';
      }
      return '';
    });
    const barStyle = computed(() => ({
      transform: `translate3d(${toBarPerc(props.progress)}%, 0px, 0px)`,
    }));
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
      barStyle,
      animationStyle,
      realLoading,
    };
  },
});
</script>
