<template>
  <div :class="rootClasses" :style="bgColorCustom">
    <div :class="`${name}__inner`">
      <div v-if="computedLeftIcon !== undefined" :class="`${name}__hd`">
        <t-node :content="computedLeftIcon" :style="iconColorCustom"></t-node>
      </div>
      <div :class="`${name}__bd`">
        <div ref="listDOM" :class="`${name}__list ${scrollable ? `${name}__list--scrolling` : ''}`">
          <div
            ref="itemDOM"
            :class="`${name}__item ${showDetailText ? `${name}__item-detail` : ''}`"
            :style="scrollable ? animateStyle : ''"
            @transitionend="handleTransitionend()"
          >
            <span :class="`${name}__text`" :style="colorCustom"
              >{{ content
              }}<span
                v-if="showDetailText"
                :class="`${name}__text-detail`"
                :style="colorCustom"
                @click="handleDetailLink"
                >{{ detailText }}</span
              >
            </span>
          </div>
        </div>
      </div>
      <div v-if="computedRightIcon !== undefined" :class="`${name}__ft`" @click="handleClickIcon">
        <t-node :content="computedRightIcon" :style="iconColorCustom"></t-node>
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
} from 'vue';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import NoticeBarProps from './props';

import config from '../config';
import { emitEvent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-notice-bar`;

export default defineComponent({
  name,
  components: { TNode },
  props: NoticeBarProps,
  emits: ['click', 'close', 'detail'],
  setup(props, context: SetupContext) {
    const internalInstance = getCurrentInstance();
    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      timer: null,
      nextTimer: null,
    });

    const rootClasses = computed(() => [`${name}`, `${name}--info`]);
    const iconType = {
      link: ChevronRightIcon,
      closeable: CloseIcon,
    };
    const computedLeftIcon = computed(() => renderTNode(internalInstance, 'leftIcon'));
    const computedRightIcon = computed(() => {
      let rightIcon = renderTNode(internalInstance, 'rightIcon');
      if (rightIcon === undefined) {
        if (props.mode !== undefined) {
          rightIcon = h(iconType[props.mode]);
        }
      }
      return rightIcon;
    });
    const showDetailText = computed(() => props.detailText !== '');
    const colorCustom = computed(() => (props.color ? `color:${props.color}` : ''));
    const bgColorCustom = computed(() => (props.bgColor ? `background-color:${props.bgColor}` : ''));
    const iconColorCustom = computed(() => (props.iconColor ? `color:${props.iconColor};` : ''));

    function handleClose() {
      emitEvent(props, context, 'close');
    }

    function handleClick() {
      emitEvent(props, context, 'click');
    }

    const handleClickIcon = computed(() => {
      if (props.mode === 'closeable') {
        return handleClose;
      }
      return handleClick;
    });

    function handleDetailLink() {
      emitEvent(props, context, 'detail');
    }

    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const listDOM = ref();
    const itemDOM = ref();

    function handleScrolling() {
      const delay = props.delay && props.delay > 0 ? props.delay * 1000 : 0;
      const speed = props.speed && props.speed > 0 ? props.speed : 50;

      setTimeout(() => {
        if (!props.scrollable) {
          return;
        }

        // FIXME: getBoundingClientRect报错问题
        const listDOMWidth = listDOM.value?.getBoundingClientRect().width;
        const itemDOMWidth = itemDOM.value?.getBoundingClientRect().width;

        if (itemDOMWidth > listDOMWidth) {
          state.offset = -itemDOMWidth;
          state.duration = itemDOMWidth / speed;
          state.listWidth = listDOMWidth;
          state.itemWidth = itemDOMWidth;
        }
      }, delay);
    }

    function handleTransitionend() {
      const speed = props.speed && props.speed > 0 ? props.speed : 50;

      state.offset = state.listWidth;
      state.duration = 0;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / speed;
      }, 0);
    }

    onMounted(() => {
      nextTick(() => {
        handleScrolling();
      });
    });

    return {
      name,
      ...toRefs(props),
      ...toRefs(state),
      rootClasses,
      computedLeftIcon,
      computedRightIcon,
      showDetailText,
      colorCustom,
      bgColorCustom,
      iconColorCustom,
      handleClickIcon,
      handleDetailLink,
      listDOM,
      itemDOM,
      animateStyle,
      handleScrolling,
      handleTransitionend,
    };
  },
});
</script>
