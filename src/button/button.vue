<template>
  <button :class="buttonClass" :disabled="disabled" @click="onClick">
    <div :class="`${name}__content`">
      <TIconLoading v-if="loading" />
      <component :is="icon()" v-else-if="typeof icon === 'function'"> </component>
      <slot v-else name="icon"> </slot>
      <span :class="`${name}__text`">
        <slot />
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import CLASSNAMES from '../shared/consts';
import { TdButtonProps } from './button.interface';
import TIconLoading from '../icon/loading.vue';
import { computed, toRefs, defineComponent, PropType } from 'vue';

import config from '../config';
const { prefix } = config;
const name = `${prefix}-button`;

export default defineComponent({
  name,
  components: { TIconLoading },
  props: {
    /** 组件主题风格，默认、主色、危险 */
    theme: {
      type: String as PropType<TdButtonProps['theme']>,
      default: 'default',
      validator(val: string): boolean {
        return ['default', 'primary', 'danger'].includes(val);
      },
    },
    /** 组件子元素（默认插槽） */
    size: {
      type: String as PropType<TdButtonProps['size']>,
      default: 'medium',
      validator(val: string): boolean {
        return ['small', 'medium', 'large'].includes(val);
      },
    },
    /** 是否为块级元素 */
    block: Boolean,
    /** 按钮内部图标，可完全自定义 */
    icon: {
      type: Function as PropType<TdButtonProps['icon']>,
      default: undefined,
    },
    /** 按钮形状，有三种：方形、圆角方形 */
    shape: {
      type: String as PropType<TdButtonProps['shape']>,
      default: 'round',
      validator(val: string): boolean {
        return ['square', 'round'].includes(val);
      },
    },
    /** 是否显示为加载状态 */
    loading: Boolean,
    /** 按钮形式，基础、线框、幽灵、文字 */
    variant: {
      type: String as PropType<TdButtonProps['variant']>,
      default: 'base',
      validator(val: string): boolean {
        return ['base', 'outline', 'text'].includes(val);
      },
    },
    /** 是否禁用按钮。该属性是 button 的原生属性 */
    disabled: Boolean,
    /** 是否为幽灵按钮 */
    ghost: Boolean,
  },
  emits: ['click'],
  setup(props: TdButtonProps, context) {
    const buttonClass = computed(() => [
      `${name}`,
      CLASSNAMES.SIZE[props.size],
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
    };
  },
});
</script>
