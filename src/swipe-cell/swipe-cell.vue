<template>
  <div :class="classes" @touchend="end" @touchcancel="end" @mouseup="end">
    <div
      :class="{ [classes + '__wrapper']: true, moving: initData.moving }"
      :style="{ transform: `translate3d(${initData.pos}px,0,0)` }"
    >
      <div
        ref="leftRef"
        :class="classes + '__left'"
        :style="{ width: initData.leftWidth ? `${initData.leftWidth}px` : 'auto' }"
        @touchstart.stop.passive
      >
        <t-node :content="swipeLeftMenu"></t-node>
        <template v-for="(btn, index) of left" :key="index">
          <t-button
            :class="btn.className || ''"
            :style="btn.style || 'height: 100%'"
            @click="
              handleClickBtn({
                action: { ...btn },
                source: 'left',
              })
            "
          >
            {{ btn.text }}
          </t-button>
        </template>
      </div>
      <div ref="swipeCell" :class="classes + '__content'">
        <t-node :content="swipeContent"></t-node>
      </div>
      <div
        ref="rightRef"
        :class="classes + '__right'"
        :style="{ width: initData.rightWidth ? `${initData.rightWidth}px` : 'auto' }"
        @touchstart.stop.passive
      >
        <t-node :content="swipeRightMenu"></t-node>
        <template v-for="(btn, index) of right" :key="index">
          <t-button
            :class="btn.className || ''"
            :style="btn.style || 'height: 100%'"
            @click="
              handleClickBtn({
                action: { ...btn },
                source: 'right',
              })
            "
          >
            {{ btn.text }}
          </t-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onClickOutside, useSwipe } from '@vueuse/core';
import { ref, watch, toRefs, reactive, computed, onMounted, defineComponent, getCurrentInstance } from 'vue';
import props from './props';
import config from '../config';
import TButton from '../button';
import { SwipeActionItem } from './type';
import { renderContent, renderTNode, TNode, useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-swipe-cell`;

export interface SwipeInitData {
  moving: boolean;
  leftWidth: number;
  rightWidth: number;
  pos: number;
  status: 'open' | 'close';
}

export default defineComponent({
  name,
  components: { TNode, TButton },
  props,
  emits: ['click', 'change'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    const swipeContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const swipeLeftMenu = computed(() => renderTNode(internalInstance, 'left'));
    const swipeRightMenu = computed(() => renderTNode(internalInstance, 'right'));
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();
    const swipeCell = ref<HTMLElement>();
    const { lengthX } = useSwipe(swipeCell, {
      threshold: 0,
      onSwipeStart: (e: TouchEvent) => {
        initData.moving = true;
        initData.pos = 0;
      },
      onSwipe: (e: TouchEvent) => {
        if (props.disabled) {
          return;
        }
        if (initData.moving && initData.status === 'close') {
          initData.moving = false;
        }
        let pos = 0;
        if (lengthX.value < 0) {
          if (initData.leftWidth === 0) {
            initData.moving = false;
            return;
          }
          pos = Math.min(Math.abs(lengthX.value), initData.leftWidth > 0 ? initData.leftWidth + spring : 0);
        } else {
          if (initData.rightWidth === 0) {
            initData.moving = false;
            return;
          }
          pos = Math.max(-lengthX.value, -(initData.rightWidth > 0 ? initData.rightWidth + spring : 0));
        }
        if (initData.status === 'close') {
          initData.pos = pos;
        }
      },
      onSwipeEnd: (e: TouchEvent) => {
        end();
      },
    });
    const distance = 0; // distance 滑动多少距离后开始显示菜
    const autoBack = true; // autoBack 点击菜单后是否收回菜
    const threshold = 0.5; // threshold 滑动宽度的百分之多少自动打开菜单，否则收回
    const spring = 0; // 回弹距离
    const initData: SwipeInitData = reactive({
      moving: false,
      leftWidth: 0, // 左边菜单的宽度
      rightWidth: 0, // 右边菜单的宽度
      pos: 0, // 移动的距离
      status: 'close', // 菜单的状态，默认close
    });
    const classes = computed(() => [`${name}`]);
    onMounted(() => {
      const leftWidth = leftRef.value?.clientWidth as number;
      const rightWidth = rightRef.value?.clientWidth as number;
      initData.leftWidth = leftWidth > 0 ? leftWidth + distance : 0;
      initData.rightWidth = rightWidth > 0 ? rightWidth + distance : 0;
      renderMenuStatus();
    });
    watch(
      () => props.expanded,
      () => renderMenuStatus(),
    );
    onClickOutside(swipeCell, (event) => {
      close();
    });
    const renderMenuStatus = () => {
      if (props.expanded && props.expanded === 'left') {
        if (initData.leftWidth) {
          open('toRight');
        }
      }
      if (props.expanded && props.expanded === 'right') {
        if (initData.rightWidth) {
          open('toLeft');
        }
      }
    };
    const end = () => {
      if (props.disabled) {
        return;
      }
      if (lengthX.value < 0 && initData.pos > initData.leftWidth * threshold) {
        open('toRight');
      } else if (lengthX.value > 0 && -initData.pos > initData.rightWidth * threshold) {
        open('toLeft');
      } else {
        close('force');
      }
    };
    const open = (direction: 'toRight' | 'toLeft') => {
      if (initData.status === 'open') {
        return;
      }
      initData.moving = true;
      initData.status = 'open';
      if (direction === 'toLeft') {
        initData.pos = -initData.rightWidth;
        if (initData.rightWidth) {
          emitEvent('change', 'right');
        }
      } else {
        initData.pos = initData.leftWidth;
        if (initData.leftWidth) {
          emitEvent('change', 'left');
        }
      }
    };
    const close = (type?: string) => {
      if (initData.status === 'close' && type !== 'force') {
        return;
      }
      initData.moving = true;
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
    return {
      ...toRefs(props),
      swipeContent,
      swipeLeftMenu,
      swipeRightMenu,
      initData,
      classes,
      swipeCell,
      leftRef,
      rightRef,
      handleClickBtn,
      end,
    };
  },
});
</script>
