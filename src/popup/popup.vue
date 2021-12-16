<template>
  <teleport :to="to" :disabled="teleportDisabled">
    <div :class="[rootClasses, $attrs.class]" :style="rootStyles" @touchmove="handleMove">
      <transition name="fade">
        <t-mask v-show="currentVisible" :transparent="!showOverlay" @click="handleMaskClick" />
      </transition>
      <transition :name="contentTransitionName" @after-enter="afterEnter" @after-leave="afterLeave">
        <div v-show="currentVisible" :class="contentClasses">
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import { emitEvent } from '../shared/emit';
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
     * @description 将popup放在哪个el下，该el在createApp前必须存在
     * @attribute to
     */
    to: {
      type: String,
      default: 'body',
    },
    /**
     * @description 是否禁用teleport
     * @attribute teleport-disabled
     */
    teleportDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否显示遮罩层
     * @attribute show-overlay
     */
    showOverlay: {
      type: Boolean,
      default: true,
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
     * @attribute placement
     * @enum ["top", "right", "bottom", "left", "center"]
     * @default bottom
     */
    placement: {
      type: String,
      default: 'bottom',
      validator: (val: string) => ['top', 'right', 'bottom', 'left', 'center'].indexOf(val) !== -1,
    },
    /**
     * @description 弹出层内容区的动画名，等价于transition组件的name属性
     * @attribute transition-name
     */
    transitionName: {
      type: String,
      default: '',
    },
    /**
     * @description 自定义层级
     * @attribute zIndex
     */
    zIndex: {
      type: Number,
      default: 1500,
    },
  },
  emits: ['open', 'visible-change', 'close', 'opened', 'update:modelValue', 'closed'],
  setup(props, context: SetupContext) {
    const currentVisible = computed(() => props.modelValue || props.visible);

    const rootClasses = computed(() => name);
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

    const contentClasses = computed(() => ({
      [`${name}--content`]: true,
      [`${name}--content-${props.placement}`]: true,
    }));

    const contentTransitionName = computed(() => {
      const { transitionName, placement } = props;
      if (transitionName) return transitionName;
      if (placement === 'center') return 'fade-zoom';
      return `slide-${placement}`;
    });

    watch(
      () => currentVisible.value,
      (val) => {
        emitEvent(props, context, 'visible-change', val);
        const cls = `${prefix}-overflow-hidden`;
        if (val) {
          document.body.classList.add(cls);
          emitEvent(props, context, 'open');
        } else {
          document.body.classList.remove(cls);
        }
      },
    );

    const handleMaskClick = () => {
      emitEvent(props, context, 'close');
      context.emit('update:modelValue', false);
    };

    const handleMove = (e: TouchEvent) => {
      if (props.lockScroll) {
        e.preventDefault();
      }
    };

    const afterLeave = () => emitEvent(props, context, 'closed');
    const afterEnter = () => emitEvent(props, context, 'opened');

    return {
      name: ref(name),
      currentVisible,
      rootClasses,
      rootStyles,
      contentClasses,
      contentTransitionName,
      afterEnter,
      afterLeave,
      handleMaskClick,
      handleMove,
    };
  },
});
</script>
