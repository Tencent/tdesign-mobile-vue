<template>
  <transition name="message">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <div v-if="prefixIconContent" :class="`${name}__icon--left`">
        <t-node :content="prefixIconContent" />
      </div>
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
      <div v-if="linkContent" :class="`${name}__link`" @click="onLinkClick">
        <t-node :content="linkContent"></t-node>
      </div>
      <div v-if="closeBtnContent" :class="[`${name}__close-wrap`, `${name}__icon--right`]" @click="onCloseBtnClick">
        <t-node :content="closeBtnContent"></t-node>
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
import { isObject, isString } from '@vueuse/core';

import Link from '../link';
import messageProps from './props';
import { DrawMarquee, TdMessageProps } from './type';
import config from '../config';
import { renderContent, renderTNode, TNode, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-message`;
const iconDefault = {
  info: h(InfoCircleFilledIcon),
  success: h(CheckCircleFilledIcon),
  warning: h(InfoCircleFilledIcon),
  error: h(InfoCircleFilledIcon),
};
const closeBtnDefault = h(CloseIcon);
export default defineComponent({
  name,
  components: { TNode },
  props: messageProps,
  emits: ['durationEnd', 'closeBtnClick'],
  setup(props, context) {
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

    const changeNumToStr = (arr: TdMessageProps['offset'] = []) => {
      return arr.map(function (item) {
        return typeof item === 'number' ? `${item}px` : item;
      });
    };

    const getMessageStylesOffset = (offset: TdMessageProps['offset']) => {
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

    const prefixIconContent = computed(() =>
      renderTNode(internalInstance, 'icon', { defaultNode: iconDefault?.[props.theme || 'info'] }),
    );
    // content
    const computedContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    // closeBtn
    const closeBtnContent = computed(() => renderTNode(internalInstance, 'closeBtn', { defaultNode: closeBtnDefault }));

    // link
    const linkContent = computed(() => {
      if (typeof props.link === 'function' || context.slots?.link) {
        return renderTNode(internalInstance, 'link');
      }

      if (isObject(props.link) || isString(props.link)) {
        const _link = isObject(props.link) ? { ...props.link } : { content: props.link };
        return h(Link, { theme: 'primary', ..._link });
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
        loop: Math.max(props.marquee === true || props.marquee?.loop == null ? loop : props.marquee?.loop, -1),
        // 速度必须为正数
        speed: Math.max(props.marquee === true || props.marquee?.speed == null ? speed : props.marquee?.speed, 1),
        // 延迟不可为负数
        delay: Math.max(props.marquee === true || props.marquee?.delay == null ? delay : props.marquee?.delay, 0),
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

    const onLinkClick = (e: MouseEvent) => {
      props.onLinkClick?.({ e });
    };

    const onCloseBtnClick = () => {
      props.onCloseBtnClick?.();
      setVisible(false);
    };

    const handleDuration = () => {
      if (props.duration > 0) {
        setTimeout(() => {
          props.onDurationEnd?.();
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
      prefixIconContent,
      computedContent,
      closeBtnContent,
      linkContent,
      textWrapDOM,
      textDOM,
      animateStyle,
      onCloseBtnClick,
      onLinkClick,
      handleTransitionend,
    };
  },
});
</script>
