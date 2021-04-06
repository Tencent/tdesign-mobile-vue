<template>
  <button :class="buttonClass" :disabled="disabled" @click="onClick">
    <div :class="`${name}__content`">
      <component :is="computedIcon"> </component>
      <span :class="`${name}__text`">
        <slot />
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import CLASSNAMES from '../shared/consts';
import TIconLoading from '../icon/loading.vue';
import { computed, toRefs, defineComponent } from 'vue';
import ButtonProps from './props';

import config from '../config';
const { prefix } = config;
const name = `${prefix}-button`;

export default defineComponent({
  name,
  components: { TIconLoading },
  props: ButtonProps,
  emits: ['click'],
  setup(props, context) {
    const buttonClass = computed(() => [
      `${name}`,
      props.size ? CLASSNAMES.SIZE[props.size] : '',
      `${name}--theme-${props.theme}`,
      `${name}--variant-${props.variant}`,
      {
        [`${name}--shape-${props.shape}`]: props.shape !== 'round',
        [`${prefix}-is-block`]: props.block,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-loading`]: props.loading,
        [`${prefix}-is-ghost`]: props.ghost,
      },
    ]);

    const computedIcon = computed(() => {
      if (props.loading) {
        return TIconLoading;
      }
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      return context.slots?.icon;
    });
    const onClick = (e: Event) => {
      if (!props.loading && !props.disabled) {
        // 既不是加载也不是禁用时触发事件
        context.emit('click', e);
      } else {
        e.stopPropagation();
      }
    };
    return {
      name,
      ...toRefs(props),
      buttonClass,
      onClick,
      computedIcon,
    };
  },
});
</script>
