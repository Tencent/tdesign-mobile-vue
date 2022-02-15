<template>
  <div
    :class="classes"
    @touchstart="start"
    @touchmove="move"
    @touchend="end"
    @touchcancel="end"
    @mousedown="start"
    @mousemove="move"
    @mouseup="end"
  >
    <div
      :class="{ [classes + '__wrapper']: true, moving: initData.moving }"
      :style="{ transform: `translate3d(${initData.pos}px,0,0)` }"
    >
      <!-- 左边按钮 -->
      <div
        ref="leftRef"
        :class="classes + '__left'"
        :style="{ width: initData.leftWidth ? `${initData.leftWidth}px` : 'auto' }"
        @touchstart.stop.passive
      >
        <!-- 通过插槽插入内容 -->
        <t-node :content="swipeLeftMenu"></t-node>
        <!-- 通过属性传递的内容 -->
        <template v-for="(btn, index) of left" :key="index">
          <t-button
            :class="btn.className || ''"
            :size="btn.size || 'small'"
            :style="btn.style || 'height: 100%'"
            :theme="btn.theme || 'primary'"
            @click="
              handleClickBtn({
                action: { ...btn },
                source: 'left',
              })
            "
          >
            {{ btn.content }}
          </t-button>
        </template>
      </div>
      <!-- 显示内容 -->
      <div ref="swipeCell" class="content">
        <t-node :content="swipeContent"></t-node>
      </div>
      <!-- 右边按钮 -->
      <div
        ref="rightRef"
        :class="classes + '__right'"
        :style="{ width: initData.rightWidth ? `${initData.rightWidth}px` : 'auto' }"
        @touchstart.stop.passive
      >
        <!-- 通过插槽插入内容 -->
        <t-node :content="swipeRightMenu"></t-node>
        <!-- 通过属性传递的内容 -->
        <template v-for="(btn, index) of right" :key="index">
          <t-button
            :class="btn.className || ''"
            :size="btn.size || 'small'"
            :style="btn.style || 'height: 100%'"
            :theme="btn.theme || 'primary'"
            @click="
              handleClickBtn({
                action: { ...btn },
                source: 'right',
              })
            "
          >
            {{ btn.content }}
          </t-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  defineComponent,
  reactive,
  computed,
  onMounted,
  ref,
  watch,
  SetupContext,
  getCurrentInstance,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import config from '../config';
import { emitEvent } from '../shared/emit';
import props from './props';
import { renderContent, renderTNode, TNode } from '@/shared';

const { prefix } = config;
const name = `${prefix}-swipe-cell`;

export interface SwipeInitData {
  startPoint: {
    x: number;
    y: number;
  };
  endPoint: {
    x: number;
    y: number;
  };
  moving: boolean;
  leftWidth: number;
  rightWidth: number;
  pos: number;
  status: 'open' | 'close';
}

export default defineComponent({
  name,
  components: { TNode },
  props,
  emits: ['click', 'change'],
  setup(props, context: SetupContext) {
    const internalInstance = getCurrentInstance();
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();
    const swipeCell = ref<HTMLElement>();
    const swipeContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const swipeLeftMenu = computed(() => renderTNode(internalInstance, 'left'));
    const swipeRightMenu = computed(() => renderTNode(internalInstance, 'right'));

    // distance 滑动多少距离后开始显示菜
    const distance = 0;
    // autoBack 点击菜单后是否收回菜
    const autoBack = true;
    // threshold 滑动宽度的百分之多少自动打开菜单，否则收回
    const threshold = 0.5;
    // 回弹距离
    const spring = 0;
    const initData: SwipeInitData = reactive({
      startPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 0,
        y: 0,
      },
      moving: false,
      leftWidth: 0, // 左边菜单的宽度
      rightWidth: 0, // 右边菜单的宽度
      pos: 0, // 移动的距离
      status: 'close', // 菜单的状态，默认close
    });
    const classes = computed(() => [`${name}`]);
    onMounted(() => {
      // 计算菜单的宽度
      const leftWidth = leftRef.value?.clientWidth as number;
      const rightWidth = rightRef.value?.clientWidth as number;
      initData.leftWidth = leftWidth > 0 ? leftWidth + distance : 0;
      initData.rightWidth = rightWidth > 0 ? rightWidth + distance : 0;
      renderMenuStatus();
    });
    // 监听父组件传递的expanded变化
    watch(
      () => props.expanded,
      () => renderMenuStatus(),
    );
    onClickOutside(swipeCell, (event) => {
      close();
    });
    // 根据expanded来渲染菜单
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
    // 开始滚动
    const start = (e: any) => {
      if (props.disabled) {
        return;
      }
      if (e.target.nodeName.toLowerCase() === 'button') {
        return;
      }
      initData.moving = true;
      if (-initData.pos === initData.rightWidth || initData.pos === initData.leftWidth) {
        initData.pos = 0;
      }
      const { clientX, clientY } = e.touches[0];
      initData.startPoint = {
        x: clientX,
        y: clientY,
      };
    };
    // 正在滚动
    const move = (e: any) => {
      if (props.disabled) {
        return;
      }
      if (initData.moving && initData.status === 'close') {
        initData.moving = false;
      }
      // clientX是正在移动的x距离，
      const { clientX, clientY } = e.changedTouches[0];
      const { x, y } = initData.startPoint;
      let pos = clientX - x;
      if (pos > 0) {
        if (initData.leftWidth === 0) {
          initData.moving = false;
          return;
        }
        // 向右滑动，左边按钮出，10是在拉出菜单后，还能拉出的距离，产生一个回弹效果
        pos = Math.min(pos, initData.leftWidth > 0 ? initData.leftWidth + spring : 0);
      } else {
        if (initData.rightWidth === 0) {
          initData.moving = false;
        }
        // 向左滑动，右边按钮出
        pos = Math.max(pos, -(initData.rightWidth > 0 ? initData.rightWidth + spring : 0));
      }
      if (initData.status === 'close') {
        initData.pos = pos;
      }
    };
    // 滚动结束
    const end = (e: any) => {
      if (props.disabled) {
        return;
      }
      const { clientX, clientY } = e.changedTouches[0];
      initData.endPoint = {
        x: clientX,
        y: clientY,
      };
      const direction = clientX - initData.startPoint.x > 0 ? 'toRight' : 'toLeft';
      if (direction === 'toRight') {
        if (initData.pos > initData.leftWidth * threshold) {
          open(direction);
        } else {
          close('force');
        }
      } else if (-initData.pos > initData.rightWidth * threshold) {
        open(direction);
      } else {
        close('force');
      }
    };
    // 开启，通过父组件调用
    const open = (direction: 'toRight' | 'toLeft') => {
      if (initData.status === 'open') {
        return;
      }
      initData.moving = true;
      initData.status = 'open';
      if (direction === 'toLeft') {
        initData.pos = -initData.rightWidth;
        if (initData.rightWidth) {
          emitEvent(props, context, 'change', 'right');
        }
      } else {
        initData.pos = initData.leftWidth;
        if (initData.leftWidth) {
          emitEvent(props, context, 'change', 'left');
        }
      }
    };
    // 关闭，可以通过父组件调用
    const close = (type?: string) => {
      if (initData.status === 'close' && type !== 'force') {
        return;
      }
      initData.moving = true;
      initData.status = 'close';
      initData.pos = 0;
      emitEvent(props, context, 'change', '');
    };
    // btns按钮点击事件
    const handleClickBtn = ({ action, source }: { action: { [key: string]: any }; source: String }) => {
      emitEvent(props, context, 'click', {
        action,
        source,
      });
      if (autoBack) {
        close();
      }
    };
    return {
      ...toRefs(props),
      start,
      move,
      end,
      swipeContent,
      swipeLeftMenu,
      swipeRightMenu,
      initData,
      classes,
      swipeCell,
      leftRef,
      rightRef,
      open,
      close,
      handleClickBtn,
    };
  },
});
</script>
