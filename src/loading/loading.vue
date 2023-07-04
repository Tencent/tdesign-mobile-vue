<template>
  <div :class="rootClass" :style="rootStyle">
    <t-node v-if="indicator && realLoading && indicatorContent" :content="indicatorContent" />
    <span v-if="textContent && realLoading" :class="textClass">
      <t-node :content="textContent" />
    </span>
    <t-node :content="defaultContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, watch, toRefs, h } from 'vue';
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

    const defaultIndicator = {
      circular: GradientIcon,
      spinner: SpinnerIcon,
    };

    const indicatorContent = computed(() =>
      renderTNode(internalInstance, 'indicator', {
        defaultNode:
          props.theme === 'dots'
            ? h(
                'div',
                {
                  class: `${name}__dots`,
                  style: {
                    animationPlayState: props.pause ? 'paused' : '',
                    animationDirection: props.reverse ? 'reverse' : '',
                    animationDuration: `${props.duration}ms`,
                    width: props.size,
                    height: props.size,
                  },
                },
                [
                  Array.from({ length: 3 }).map((val, i) => {
                    return h('div', {
                      class: `${name}__dot`,
                      style: props.duration
                        ? `animation-duration: ${props.duration / 1000}s; animation-delay: ${
                            (props.duration * i) / 3000
                          }s`
                        : '',
                    });
                  }),
                ],
              )
            : h(defaultIndicator[props.theme || 'circular'], {
                style: {
                  animationPlayState: props.pause ? 'paused' : '',
                  animationDirection: props.reverse ? 'reverse' : '',
                  animationDuration: `${props.duration}ms`,
                  width: props.size,
                  height: props.size,
                },
              }),
      }),
    );

    return {
      name,
      pause,
      rootClass,
      textClass,
      textContent,
      defaultContent,
      indicatorContent,
      rootStyle,
      realLoading,
    };
  },
});
</script>
