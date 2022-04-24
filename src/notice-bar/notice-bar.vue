<template>
  <div v-if="visible || modelValue" :class="rootClasses" :style="bgColorCustom">
    <div :class="`${name}__inner`">
      <div v-if="computedPrefixIcon !== undefined" :class="`${name}__hd`" @click="() => handleClick('prefix-icon')">
        <t-node :content="computedPrefixIcon" :style="iconColorCustom"></t-node>
      </div>

      <div :class="`${name}__bd`">
        <div ref="listDOM" :class="`${name}__list ${scroll.marquee ? `${name}__list--scrolling` : ''}`">
          <div
            ref="itemDOM"
            :class="`${name}__item ${showExtraText ? `${name}__item-detail` : ''}`"
            :style="scroll.marquee ? animateStyle : ''"
            @transitionend="handleTransitionend()"
          >
            <span :class="`${name}__text`" :style="colorCustom" @click="() => handleClick('content')">
              {{ content }}
              <span
                v-if="showExtraText"
                :class="`${name}__text-detail`"
                :style="colorCustom"
                @click.stop="() => handleClick('extra')"
              >
                {{ extra }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div v-if="computedSuffixIcon !== undefined" :class="`${name}__ft`" @click="() => handleClick('suffix-icon')">
        <t-node :content="computedSuffixIcon" :style="iconColorCustom"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  ref,
  toRefs,
  SetupContext,
  computed,
  onMounted,
  nextTick,
  defineComponent,
  h,
  getCurrentInstance,
  watch,
} from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import NoticeBarProps from './props';
import { NoticeBarTrigger } from './type';

import config from '../config';
import { useEmitEvent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-notice-bar`;
const iconDefault = {
  info: [h(InfoCircleFilledIcon)],
  success: [h(CheckCircleFilledIcon)],
  warning: [h(InfoCircleFilledIcon)],
  error: [h(CloseCircleFilledIcon)],
};
export default defineComponent({
  name,
  components: { TNode },
  props: NoticeBarProps,
  emits: ['click'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    // 初始化数据
    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      timer: null,
      nextTimer: null,
      scroll: {
        marquee: false,
        speed: 50,
        loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
        delay: 0,
      },
    });

    const rootClasses = computed(() => [`${name}`, `${name}--${props.theme}`]);
    // prefix-icon
    let computedPrefixIcon: any;
    if (props.prefixIcon !== '') {
      if (props.theme) {
        if (Object.keys(iconDefault).includes(props.theme)) {
          // eslint-disable-next-line
          const key = props.theme;
          computedPrefixIcon = computed(() => iconDefault?.[key]);
        }
      }
      computedPrefixIcon = props.prefixIcon
        ? computed(() => renderTNode(internalInstance, 'prefixIcon'))
        : computedPrefixIcon;
    }
    // suffix-icon
    const computedSuffixIcon = props.suffixIcon ? computed(() => renderTNode(internalInstance, 'suffixIcon')) : null;
    // extra
    const showExtraText = props.extra ? computed(() => renderTNode(internalInstance, 'extra')) : null;
    // click
    function handleClick(trigger: NoticeBarTrigger) {
      emitEvent('click', trigger);
    }
    const colorCustom = computed(() => (props.color ? `color:${props.color}` : ''));
    const bgColorCustom = computed(() => (props.bgColor ? `background-color:${props.bgColor}` : ''));
    const iconColorCustom = computed(() => (props.iconColor ? `color:${props.iconColor};` : ''));
    // 动画
    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const listDOM = ref();
    const itemDOM = ref();

    function handleScrolling() {
      // 初始化动画参数
      if (typeof props.marquee === 'boolean') {
        state.scroll = { ...state.scroll, marquee: props.marquee };
      } else if (typeof props.marquee === 'object') {
        const initScroll = {
          marquee: true,
          loop: typeof props.marquee.loop === 'undefined' ? state.scroll.loop : props.marquee.loop,
          speed: props.marquee?.speed && props.marquee?.speed > 0 ? props.marquee.speed : state.scroll.speed,
          delay: props.marquee?.delay && props.marquee?.delay > 0 ? props.marquee.delay : state.scroll.delay,
        };
        state.scroll = { ...initScroll };
      }
      if (!state.scroll.marquee || state.scroll.loop === 0) {
        return;
      }
      // 设置动画
      setTimeout(() => {
        const listDOMWidth = listDOM.value?.getBoundingClientRect().width;
        const itemDOMWidth = itemDOM.value?.getBoundingClientRect().width;
        if (itemDOMWidth > listDOMWidth) {
          state.offset = -itemDOMWidth;
          state.duration = itemDOMWidth / state.scroll.speed;
          state.listWidth = listDOMWidth;
          state.itemWidth = itemDOMWidth;
        }
      }, state.scroll.delay);
    }
    // 动画结束后，初始化动画
    function handleTransitionend() {
      // 触发再次滚的
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
    }
    onMounted(() => {
      nextTick(() => {
        if (props.visible) {
          handleScrolling();
        }
      });
    });

    watch(
      () => props.visible,
      () => {
        nextTick(() => {
          if (props.visible) {
            state.offset = state.listWidth;
            state.duration = 0;
            handleScrolling();
          }
        });
      },
    );

    return {
      name,
      ...toRefs(props),
      ...toRefs(state),
      rootClasses,
      colorCustom,
      bgColorCustom,
      iconColorCustom,
      computedPrefixIcon,
      computedSuffixIcon,
      showExtraText,
      handleClick,
      listDOM,
      itemDOM,
      animateStyle,
      handleScrolling,
      handleTransitionend,
    };
  },
});
</script>
