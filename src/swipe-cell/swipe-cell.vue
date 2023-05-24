<template>
  <div ref="swipeCell" :class="classes" @click.capture="handleCellClick">
    <div :style="wrapperStyle">
      <div
        ref="leftRef"
        :class="classes + '__left'"
        :style="{
          width: initData.leftWidth ? `${initData.leftWidth}px` : 'auto',
          display: 'flex',
          'flex-flow': 'row-reverse',
        }"
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
        <div :style="sureLeftBgStyle"></div>
        <div ref="sureLeftRef" :style="sureLeftStyle" @click="handleSureClick">
          <t-node v-if="sureLeftContent" :content="sureLeftContent"></t-node>
        </div>
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
        <div :style="sureRightBgStyle"></div>
        <div ref="sureRightRef" :style="sureRightStyle" @click="handleSureClick">
          <t-node v-if="sureRightContent" :content="sureRightContent"></t-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
import { isArray, isBoolean } from 'lodash';
import { useSwipe } from './useSwipe';
import props from './props';
import config from '../config';
import { SwipeActionItem } from './type';
import { renderContent, renderTNode, TNode, useEmitEvent, useClickAway } from '../shared';
import { useSureConfirm } from './useSureConfirm';

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
      let transition = 'margin-left .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      transition += ',margin-right .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      transition += initData.moving ? '' : ',transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      return {
        position: 'relative',
        transition,
        transform,
        marginLeft: `${sureMarginLeft.value}px`,
        marginRight: `${sureMarginRight.value}px`,
      } as StyleValue;
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

    const {
      sureRightRef,
      sureLeftRef,
      showSureRight,
      showSureLeft,
      sureMarginRight,
      sureMarginLeft,
      closedSure,
      sureRightContent,
      sureLeftContent,
      sureLeftBgStyle,
      sureRightBgStyle,
      sureRightStyle,
      sureLeftStyle,
      showSure,
      handleSureClick,
    } = useSureConfirm(internalInstance, initData);

    const range = (num: number, min: number, max: number) => {
      return Math.min(Math.max(num, min), max);
    };
    // 首次touchmove的方向，用于分开左右和上下滑动，左右滑动时禁止上下滑动，上下滑动时禁止左右滑动
    let swipeDir: -1 | 0 | 1 = 0;
    const { lengthX, lengthY, stop } = useSwipe(swipeCell, {
      threshold: 0,
      onSwipeStart: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        swipeDir = 0;
        initData.moved = false;
        initData.offset = initData.pos;
      },
      onSwipe: (e: TouchEvent) => {
        const absLenX = Math.abs(lengthX.value);
        const absLenY = Math.abs(lengthY.value);
        // distance / 2 是为了避免触发上下滑动时 又走左右滑动的逻辑 导致preventDefault终止无效
        if (!swipeDir && absLenX < distance / 2 && absLenY < distance / 2) {
          return;
        }
        if (!swipeDir && absLenX < absLenY) {
          swipeDir = -1;
        } else if (!swipeDir && absLenX >= absLenY) {
          swipeDir = 1;
        }
        if (swipeDir < 0) {
          swipeDir = -1;
          return;
        }
        e.preventDefault();

        if (props.disabled || Math.abs(lengthX.value) < distance) {
          return;
        }

        if (showSureRight.value) {
          closedSure.value = lengthX.value > 0 && initData.pos === 0;
          showSureRight.value = false;
        } else if (showSureLeft.value) {
          closedSure.value = lengthX.value < 0 && initData.pos === 0;
          showSureLeft.value = false;
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
          closedSure.value = false;
        }, 0);
        end();
      },
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
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        wArr.push((wArr[i - 1] || 0) + el.clientWidth);
      }
      for (let i = 0, len = children.length - 2; i < len; ++i) {
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
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        wArr.push((wArr[i - 1] || 0) + el.clientWidth);
      }
      for (let i = 0, len = children.length - 2; i < len; ++i) {
        const el = children[i] as HTMLElement;
        const w = (1 - pos / initData.leftWidth) * (wArr[i - 1] || 0);
        if (el) {
          el.style.transform = `translate3d(${w}px, 0, 0)`;
          el.style.transition = initData.moving ? 'none' : `transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)`;
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
        // opened为boolean类型，判断默认打开
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
      sureMarginLeft.value = 0;
      sureMarginRight.value = 0;
      initData.status = 'close';
      initData.pos = 0;
      emitEvent('change', undefined);
    };
    const handleClickBtn = ({ action, source }: { action: SwipeActionItem; source: String }) => {
      const clickFn = () => {
        if (autoBack) {
          close();
        }
        if (action.onClick) {
          action.onClick();
          return;
        }
        emitEvent('click', { action, source });
      };
      if (action.sure) {
        showSure(action.sure, clickFn);
        return;
      }
      clickFn();
    };
    // 点击事件拦截，判定是否透传事件
    const handleCellClick = (e: Event) => {
      if (initData.moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    context.expose({
      showSure,
    });
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
      showSureRight,
      showSureLeft,
      sureLeftBgStyle,
      sureRightBgStyle,
      sureRightStyle,
      sureLeftStyle,
      sureRightRef,
      sureLeftRef,
      sureRightContent,
      sureLeftContent,
      showSure,
      handleSureClick,
    };
  },
});
</script>
