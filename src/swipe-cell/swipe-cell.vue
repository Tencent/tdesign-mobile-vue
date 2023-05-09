<template>
  <div ref="swipeCell" :class="classes" @click.capture="handleCellClick">
    <div :style="wrapperStyle">
      <div
        ref="leftRef"
        :class="classes + '__left'"
        :style="{ width: initData.leftWidth ? `${initData.leftWidth}px` : 'auto' }"
      >
        <t-node v-if="swipeLeftMenu" :content="swipeLeftMenu"></t-node>
        <template v-else>
          <template v-for="(btn, index) of left" :key="index">
            <div
              :class="[classes + '__content', btn.className || '']"
              :style="btn.style || 'height: 100%;'"
              @click="
                handleClickBtn({
                  action: { ...btn },
                  source: 'left',
                })
              "
            >
              <t-node v-if="btn.icon" :class="classes + '__icon'" :content="btn.icon"></t-node>
              <span v-if="btn.text" :class="classes + '__text'">
                <t-node :content="btn.text"></t-node>
              </span>
            </div>
          </template>
        </template>
      </div>
      <t-node v-if="swipeContent" :content="swipeContent"></t-node>
      <div
        ref="rightRef"
        :class="classes + '__right'"
        :style="{
          width: initData.rightWidth ? `${initData.rightWidth}px` : 'auto',
        }"
      >
        <t-node v-if="swipeRightMenu" :content="swipeRightMenu"></t-node>
        <template v-else>
          <template v-for="(btn, index) of right" :key="index">
            <div
              :class="[classes + '__content', btn.className || '']"
              :style="btn.style || 'height: 100%;'"
              @click="
                handleClickBtn({
                  action: { ...btn },
                  source: 'right',
                })
              "
            >
              <t-node v-if="btn.icon" :class="classes + '__icon'" :content="btn.icon"></t-node>
              <span v-if="btn.text" :class="classes + '__text'">
                <t-node :content="btn.text"></t-node>
              </span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onClickOutside, useSwipe } from '@vueuse/core';

import {
  ref,
  watch,
  toRefs,
  reactive,
  computed,
  onMounted,
  defineComponent,
  getCurrentInstance,
  StyleValue,
  onUnmounted,
} from 'vue';
import isFunction from 'lodash/isFunction';
// import { useSwipe } from './useSwipe';
import { isArray, isBoolean } from 'lodash';
import { useClickAway } from '@/shared/useClickAway';
import props from './props';
import config from '../config';
import { SwipeActionItem } from './type';
import { renderContent, renderTNode, TNode, useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-swipe-cell`;

export interface SwipeInitData {
  moving: boolean;
  moved: boolean;
  leftWidth: number;
  rightWidth: number;
  offset: number;
  pos: number;
  status: 'open' | 'close';
}

export default defineComponent({
  name,
  components: { TNode },
  props,
  emits: ['click', 'change'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    const swipeContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const swipeLeftMenu = computed(() =>
      isFunction(props.left) || internalInstance?.slots.left ? renderTNode(internalInstance, 'left') : false,
    );
    const swipeRightMenu = computed(() =>
      isFunction(props.right) || internalInstance?.slots.right ? renderTNode(internalInstance, 'right') : false,
    );
    const wrapperRef = ref<HTMLElement>();
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();
    const swipeCell = ref<HTMLElement>();
    const wrapperStyle = computed(() => {
      const transform = `translate3d(${initData.pos}px, 0, 0)`;
      const transition = initData.moving ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      return {
        position: 'relative',
        transition,
        transform,
      } as StyleValue;
    });

    const range = (num: number, min: number, max: number) => {
      return Math.min(Math.max(num, min), max);
    };
    const { lengthX, stop } = useSwipe(swipeCell, {
      threshold: 0,
      onSwipeStart: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        initData.moved = false;
        initData.offset = initData.pos;
      },
      onSwipe: (e: TouchEvent) => {
        if (props.disabled || Math.abs(lengthX.value) < distance) {
          return;
        }
        initData.moving = true;
        initData.moved = true;
        const offset = range(initData.offset - lengthX.value, -initData.rightWidth, initData.leftWidth);
        initData.pos = offset;
      },
      onSwipeEnd: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        initData.moving = false;
        setTimeout(() => {
          initData.moved = false;
        }, 0);
        end();
      },
    });

    const distance = 10; // distance 滑动多少距离后开始显示菜
    const autoBack = true; // autoBack 点击菜单后是否收回菜
    const threshold = 0.3; // threshold 滑动宽度的百分之多少自动打开菜单，否则收回
    const initData: SwipeInitData = reactive({
      moving: false, // 是否正在划动
      moved: false, // 标记是否有过划动，划动过则不触发点击事件
      leftWidth: 0, // 左边菜单的宽度
      rightWidth: 0, // 右边菜单的宽度
      offset: 0, // 起点时的偏移
      pos: 0, // 移动的距离
      status: 'close', // 菜单的状态，默认close
    });
    const classes = computed(() => [`${name}`]);
    onMounted(() => {
      const leftWidth = leftRef.value?.clientWidth as number;
      const rightWidth = rightRef.value?.clientWidth as number;
      initData.leftWidth = leftWidth > 0 ? leftWidth : 0;
      initData.rightWidth = rightWidth > 0 ? rightWidth : 0;
      renderMenuStatus();
    });
    onUnmounted(() => {
      stop();
      stopClickAway.value?.();
    });
    watch(
      () => props.opened,
      () => renderMenuStatus(),
      { deep: true },
    );
    watch(
      () => initData.pos,
      (newVal, oldVal) => {
        if (rightRef.value && (newVal < 0 || (newVal === 0 && oldVal < 0))) {
          updateRightMenuPosStyle(newVal);
        } else if (leftRef.value && (newVal > 0 || (newVal === 0 && oldVal > 0))) {
          updateLeftMenuPosStyle(newVal);
        }
      },
    );
    const updateRightMenuPosStyle = (value?: number) => {
      if (!rightRef.value) return;
      const pos = value || initData.pos;
      const children = rightRef.value.children || [];
      const wArr: number[] = [];
      for (let i = 0, len = children.length; i < len; ++i) {
        const el = children[i] as HTMLElement;
        wArr.push((wArr[i - 1] || 0) + el.clientWidth);
      }
      for (let i = 0, len = children.length; i < len; ++i) {
        const el = children[i] as HTMLElement;
        const w = (1 + pos / initData.rightWidth) * (wArr[i - 1] || 0);
        if (el) {
          el.style.transform = `translate3d(${-w}px, 0, 0)`;
          el.style.transition = initData.moving ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
        }
      }
    };
    const updateLeftMenuPosStyle = (value?: number) => {
      if (!leftRef.value) return;
      const pos = value || initData.pos;
      const children = leftRef.value.children || [];
      const wArr: number[] = [];
      for (let i = children.length - 1; i >= 0; --i) {
        const el = children[i] as HTMLElement;
        wArr[i] = (wArr[i + 1] || 0) + el.clientWidth;
      }
      for (let i = 0, len = children.length; i < len; ++i) {
        const el = children[i] as HTMLElement;
        const w = (1 - pos / initData.leftWidth) * (wArr[i + 1] || 0);
        if (el) {
          el.style.transform = `translate3d(${w}px, 0, 0)`;
          el.style.transition = initData.moving ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
          el.style.position = 'relative';
          el.style.zIndex = `${len - i}`;
        }
      }
    };
    const stopClickAway = ref(
      useClickAway(
        swipeCell,
        () => {
          close();
        },
        { detectIframe: true },
      ),
    );
    const renderMenuStatus = () => {
      if (isBoolean(props.opened)) {
        // opened为boolen类型，判断默认打开
        if (props.opened && initData.rightWidth > 0) {
          open('toLeft');
        } else if (props.opened && initData.leftWidth > 0) {
          open('toRight');
        } else if (!props.opened && (initData.leftWidth > 0 || initData.rightWidth > 0)) {
          close();
        }
      } else if (isArray(props.opened)) {
        // opened为array类型，判断默认打开，同时设定左右action时优先打开右边
        if (props.opened[1] && initData.rightWidth > 0) {
          open('toLeft');
        } else if (props.opened[0] && initData.leftWidth > 0) {
          open('toRight');
        } else if ((!props.opened[1] && initData.rightWidth > 0) || (!props.opened[0] && initData.leftWidth > 0)) {
          close();
        }
      }
    };
    const end = () => {
      if (props.disabled) {
        return;
      }
      if (
        +initData.rightWidth > 0 &&
        ((-initData.offset < +initData.rightWidth && -initData.pos > +initData.rightWidth * threshold) ||
          // 处理回弹
          (-initData.offset === +initData.rightWidth && -initData.pos > +initData.rightWidth * (1 - threshold)))
      ) {
        open('toLeft');
      } else if (
        +initData.leftWidth > 0 &&
        ((initData.offset < +initData.leftWidth && initData.pos > +initData.leftWidth * threshold) ||
          // 处理回弹
          (initData.offset === +initData.leftWidth && initData.pos > +initData.leftWidth * (1 - threshold)))
      ) {
        open('toRight');
      } else if (initData.offset !== initData.pos) {
        // 仅在有发生侧滑的情况下自动关闭（由js控制是否异步关闭）
        close('force');
      }
    };
    const open = (direction: 'toRight' | 'toLeft') => {
      // 包括回弹open
      const isOpen = initData.status === 'open';

      initData.status = 'open';
      if (direction === 'toLeft') {
        initData.pos = -initData.rightWidth;
        if (initData.rightWidth && !isOpen) {
          emitEvent('change', 'right');
        }
      } else {
        initData.pos = initData.leftWidth;
        if (initData.leftWidth && !isOpen) {
          emitEvent('change', 'left');
        }
      }
    };
    const close = (type?: string) => {
      if (initData.status === 'close' && type !== 'force') {
        return;
      }
      initData.status = 'close';
      initData.pos = 0;
      emitEvent('change', undefined);
    };
    const handleClickBtn = ({ action, source }: { action: SwipeActionItem; source: String }) => {
      if (autoBack) {
        close();
      }
      if (action.onClick) {
        action.onClick();
        return;
      }
      emitEvent('click', { action, source });
    };
    // 点击事件拦截，判定是否透传事件
    const handleCellClick = (e: Event) => {
      if (initData.moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    return {
      ...toRefs(props),
      swipeContent,
      swipeLeftMenu,
      swipeRightMenu,
      initData,
      classes,
      wrapperRef,
      wrapperStyle,
      swipeCell,
      leftRef,
      rightRef,
      handleClickBtn,
      end,
      handleCellClick,
    };
  },
});
</script>
