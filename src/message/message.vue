<template>
  <transition name="message">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <t-node v-if="computedPrefixIcon" :content="computedPrefixIcon" :class="`${name}__icon--left`"></t-node>
      <div ref="textWrapDOM" :class="textWrapClasses">
        <div
          ref="textDOM"
          :class="`${name}__text`"
          :style="scroll.marquee ? animateStyle : ''"
          @transitionend="handleTransitionend"
        >
          <t-node v-if="computedContent" :content="computedContent"></t-node>
        </div>
      </div>
      <div v-if="computedCloseBtn" :class="`${name}__close-wrap`" @click="onCloseBtnClick">
        <t-node :content="computedCloseBtn" :class="`${name}__icon--right`"></t-node>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  h,
  ref,
  computed,
  watch,
  defineComponent,
  getCurrentInstance,
  toRefs,
  reactive,
  nextTick,
  onMounted,
} from 'vue';
import { CheckCircleFilledIcon, CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { isFunction } from 'lodash';
import messageProps from './props';
import { DrawMarquee } from './type';
import config from '../config';
import { renderContent, renderTNode, TNode, useEmitEvent, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-message`;
const iconDefault = {
  info: h(InfoCircleFilledIcon),
  success: h(CheckCircleFilledIcon),
  warning: h(InfoCircleFilledIcon),
  error: h(InfoCircleFilledIcon),
};

export default defineComponent({
  name,
  components: { TNode },
  props: messageProps,
  emits: ['durationEnd', 'closeBtnClick'],
  setup(props: any, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();

    // 初始化动画相关数据
    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      scroll: {
        marquee: false,
        speed: 50,
        loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
        delay: 300,
      },
    });

    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setVisible] = useVModel(visible, modelValue, props.defaultVisible);
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));

    const textWrapClasses = computed(() => ({
      [`${name}__text-wrap`]: true,
      [`${name}__text-nowrap`]: props.marquee,
    }));

    const changeNumToStr = (arr: []) => {
      return arr.map(function (item) {
        return typeof item === 'number' ? `${item}px` : item;
      });
    };

    const getMessageStylesOffset = (offset: []) => {
      const arr = changeNumToStr(offset);
      return {
        top: arr[0],
        right: arr[1],
        left: arr[1],
      };
    };

    const rootStyles = computed(() => {
      const { offset } = props;
      const offsetStyle = offset ? getMessageStylesOffset(offset) : [];
      return {
        zIndex: props.zIndex,
        ...offsetStyle,
      };
    });

    const computedPrefixIcon = computed(() => {
      const { icon } = props;
      if (!icon) return null;
      if (icon && !context.slots.icon && !isFunction(icon)) {
        const theme = props.theme as string;
        return iconDefault?.[theme] || null;
      }
      return renderTNode(internalInstance, 'icon');
    });

    // content
    const computedContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    // closeBtn
    const computedCloseBtn = computed(() => {
      const { closeBtn } = props;
      if (isFunction(closeBtn || context.slots.closeBtn)) {
        return renderTNode(internalInstance, 'closeBtn');
      }
      if (closeBtn) {
        return h(CloseIcon);
      }
      return null;
    });

    // 动画
    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const textWrapDOM = ref();
    const textDOM = ref();

    const handleScrolling = () => {
      if (!props?.marquee || (props?.marquee as DrawMarquee)?.loop === 0) {
        return;
      }

      const { loop, speed, delay } = state.scroll;

      state.scroll = {
        marquee: true,
        // 负数统一当作循环播放
        loop: Math.max(props.marquee?.loop, -1) || loop,
        // 速度必须为正数
        speed: Math.max(props.marquee?.speed, 1) || speed,
        // 延迟不可为负数
        delay: Math.max(props.marquee?.delay, 0) || delay,
      };
      state.offset = 0;

      // 设置动画
      setTimeout(() => {
        const textWrapDOMWidth = textWrapDOM.value?.getBoundingClientRect().width;
        const textDOMWidth = textDOM.value?.getBoundingClientRect().width;
        state.offset = -textDOMWidth;
        state.duration = textDOMWidth / state.scroll.speed;
        state.listWidth = textWrapDOMWidth;
        state.itemWidth = textDOMWidth;
      }, state.scroll.delay);
    };

    // 动画结束后，初始化动画
    const handleTransitionend = () => {
      resetTransition();

      if (state.scroll.loop === -1) {
        return;
      }

      state.scroll.loop = --state.scroll.loop;

      if (state.scroll.loop === 0) {
        state.scroll.marquee = false;
      }
    };

    const resetTransition = () => {
      state.duration = 0;
      state.offset = state.listWidth;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / state.scroll.speed;
      }, 0);
    };

    const onCloseBtnClick = () => {
      emitEvent('closeBtnClick');
      setVisible(false);
    };

    const handleDuration = () => {
      if (props.duration > 0) {
        setTimeout(() => {
          emitEvent('durationEnd');
          onCloseBtnClick();
        }, props.duration);
      }
    };

    onMounted(() => {
      nextTick(() => {
        if (currentVisible.value) {
          handleScrolling();
        }
      });
    });

    watch(
      () => currentVisible.value,
      (val) => {
        if (val === false) return;
        setVisible(true);
        handleDuration();
        nextTick(handleScrolling);
      },
    );

    return {
      name: ref(name),
      ...toRefs(state),
      currentVisible,
      rootClasses,
      textWrapClasses,
      rootStyles,
      computedPrefixIcon,
      computedContent,
      computedCloseBtn,
      textWrapDOM,
      textDOM,
      animateStyle,
      onCloseBtnClick,
      handleTransitionend,
    };
  },
});
</script>
