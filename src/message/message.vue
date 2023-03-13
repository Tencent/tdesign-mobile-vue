<template>
  <transition name="message" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <t-node v-if="computedPrefixIcon" :content="computedPrefixIcon"></t-node>
      <div ref="textWrapDOM" :class="textWrapClasses">
        <div
          ref="textDOM"
          :class="`${name}__text`"
          :style="scroll.marquee ? animateStyle : ''"
          @transitionend="handleTransitionend()"
        >
          <t-node v-if="computedContent" :content="computedContent"></t-node>
        </div>
      </div>
      <div v-if="computedCloseBtn" @click="onClose">
        <t-node :content="computedCloseBtn"></t-node>
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
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { isFunction } from 'lodash';
import { off } from 'process';
import messageProps from './props';
import { DrawMarquee } from './type';
import config from '../config';
import { renderContent, renderTNode, TNode, useEmitEvent, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-message`;
const iconDefault = {
  info: h(ErrorCircleFilledIcon),
  success: h(CheckCircleFilledIcon),
  warning: h(ErrorCircleFilledIcon),
  error: h(ErrorCircleFilledIcon),
};

export default defineComponent({
  name,
  components: { TNode },
  props: messageProps,
  emits: ['change', 'open', 'opened', 'close', 'closed'],
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
        delay: 0,
      },
    });

    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setVisible] = useVModel(visible, modelValue, props.defaultVisible, props.onChange);
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
        const closeIcon = h(CloseIcon);
        return closeIcon;
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
      // 初始化动画参数
      if (typeof props.marquee === 'boolean') {
        state.scroll = { ...state.scroll, marquee: props.marquee };
      }
      const marquee = props.marquee as DrawMarquee;
      state.scroll = {
        marquee: true,
        loop: typeof marquee?.loop === 'undefined' ? state.scroll.loop : marquee.loop,
        speed: marquee.speed ?? state.scroll.speed,
        delay: marquee.delay ?? state.scroll.delay,
      };
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
      state.scroll.loop = --state.scroll.loop;
      if (state.scroll.loop === 0) {
        state.scroll = {
          ...state.scroll,
          marquee: false,
        };
        return;
      }
      state.offset = state.listWidth;
      state.duration = 0;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / state.scroll.speed;
      }, 0);
    };

    const onClose = () => {
      emitEvent('close');
      setVisible(false);
    };

    const handleDuration = () => {
      if (props.duration > 0) {
        setTimeout(() => {
          emitEvent('durationEnd');
          onClose();
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
        emitEvent('open');
        setVisible(true);
        handleDuration();
        nextTick(() => {
          state.offset = state.listWidth;
          state.duration = 0;
          handleScrolling();
        });
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
      onClose,
      handleTransitionend,
      afterEnter: () => emitEvent('opened'),
      afterLeave: () => emitEvent('closed'),
    };
  },
});
</script>
