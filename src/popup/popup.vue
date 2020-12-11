<template>
  <div :class="rootClasses" @touchmove="handleMove">
    <transition name="fade">
      <t-mask v-show="currentVisible" :transparent="maskTransparent" @click="handleMaskClick" />
    </transition>
    <transition
      :name="contentTransitionName"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div v-show="currentVisible" :class="contentClasses">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import { PositionType, IPopupProps } from './popup.interface';

import TMask from '../mask';

import config from '../config';
const { prefix } = config;

const name = `${prefix}-popup`;

export default defineComponent({
  name,
  components: { TMask },
  props: {
    modelValue: Boolean,
    /**
     * @description 显示与隐藏
     * @attribute visible
     */
    visible: Boolean,
    /**
     * @description 遮罩层是否透明
     * @attribute mask-transparent
     */
    maskTransparent: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否锁定内容滚动
     * @attribute lock-scroll
     */
    lockScroll: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 弹出层的位置
     * @attribute position
     * @enum ["top", "right", "bottom", "left", "center"]
     * @default bottom
     */
    position: {
      type: String as PropType<PositionType>,
      default: 'bottom',
      validator: val => ['top', 'right', 'bottom', 'left', 'center'].indexOf(val) !== -1,
    },
    /**
     * @description 弹出层内容区的动画名，等价于transition组件的name属性
     * @attribute transition-name
     */
    transitionName: String,
  },
  setup(props: IPopupProps, context: SetupContext) {
    const currentVisible = computed(() => props.modelValue || props.visible);

    const rootClasses = computed(() => name);

    const contentClasses = computed(() => ({
      [`${name}--content`]: true,
      [`${name}--content-${props.position}`]: true,
    }));

    const contentTransitionName = computed(() => {
      const { transitionName, position } = props;
      if (transitionName) return transitionName;
      if (position === 'center') return 'fade-zoom';
      return `slide-${position}`;
    });

    watch(
      () => currentVisible.value,
      (val) => {
        context.emit('visible-change', val);
        const cls = `${prefix}-overflow-hidden`;
        if (val) {
          document.body.classList.add(cls);
          context.emit('open');
        } else {
          document.body.classList.remove(cls);
          context.emit('close');
        }
      },
    );

    function handleMove(e) {
      if (props.lockScroll) {
        e.preventDefault();
      }
    }

    return {
      name: ref(name),
      currentVisible,
      rootClasses,
      contentClasses,
      contentTransitionName,
      afterEnter: () => context.emit('opened'),
      afterLeave: () => context.emit('closed'),
      handleMaskClick: () => context.emit('update:modelValue', false),
      handleMove,
    };
  },
});
</script>
