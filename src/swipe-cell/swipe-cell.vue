<template>
  <div
    ref="swipeCell"
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
        <slot name="left"></slot>
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
      <div class="content">
        <slot name="content"></slot>
        <slot></slot>
      </div>
      <!-- 右边按钮 -->
      <div
        ref="rightRef"
        :class="classes + '__right'"
        :style="{ width: initData.rightWidth ? `${initData.rightWidth}px` : 'auto' }"
        @touchstart.stop.passive
      >
        <!-- 通过插槽插入内容 -->
        <slot name="right"></slot>
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
import { defineComponent, reactive, computed, onMounted, ref, watch } from 'vue';
import config from '../config';
import useClickAway from './utils/useClickAway';

const { prefix } = config;
const name = `${prefix}-swipe-cell`;
export default defineComponent({
  name,
  props: {
    // disabled 禁止滑动
    disabled: {
      type: Boolean,
      default: false,
    },
    // 左边按钮数组
    left: {
      type: Array,
      default: () => [],
    },
    // 右边按钮数组
    right: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();
    const swipeCell = ref<HTMLElement>();
    // distance 滑动多少距离后开始显示菜
    const distance = 0;
    // autoBack 点击菜单后是否收回菜
    const autoBack = true;
    // threshold 滑动宽度的百分之多少自动打开菜单，否则收回
    const threshold = 0.6;
    const initData = reactive({
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
      status: 'close', // 菜单的状态
      opened: false, // 对外显示的菜单的状态
    });
    const classes = computed(() => [`${name}`]);
    onMounted(() => {
      // 计算菜单的宽度
      const leftWidth = leftRef.value?.clientWidth as number;
      const rightWidth = rightRef.value?.clientWidth as number;
      initData.leftWidth = leftWidth > 0 ? leftWidth + distance : 0;
      initData.rightWidth = rightWidth > 0 ? rightWidth + distance : 0;
    });
    // 监听status状态变化
    watch(
      () => initData.status,
      (value, oldValue) => {
        if (oldValue === 'close' && value === 'open') {
          emit('onOpen');
        } else if (oldValue === 'open' && value === 'close') {
          emit('onClose');
        }
      },
    );
    // 点击外部，收回菜单
    useClickAway(
      () => {
        close();
      },
      swipeCell,
      'click', // click, touchstart
    );
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
        // 向右滑动，左边按钮出
        // console.log('当前移动到的位置%d，起点位置%d, 综合上一次移动的位置%d',clientX, x, pos)
        pos = Math.min(pos, initData.leftWidth);
      } else {
        if (initData.rightWidth === 0) {
          initData.moving = false;
          return;
        }
        // 向左滑动，右边按钮出
        pos = Math.min(-pos, initData.rightWidth);
      }
      pos = Math.max(pos, 0);
      if (initData.status === 'close') {
        initData.pos = clientX - x;
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
          close();
        }
      } else if (-initData.pos > initData.rightWidth * threshold) {
        open(direction);
      } else {
        close();
      }
    };
    // 开启，通过父组件调用
    const open = (direction: String) => {
      initData.moving = true;
      initData.status = 'open';
      if (direction === 'toLeft') {
        initData.pos = -initData.rightWidth;
        if (initData.leftWidth) {
          initData.opened = [false, true];
        } else {
          initData.opened = true;
        }
      } else {
        initData.pos = initData.leftWidth;
        if (initData.rightWidth) {
          initData.opened = [true, false];
        } else {
          initData.opened = true;
        }
      }
    };
    // 关闭，可以通过父组件调用
    const close = () => {
      initData.moving = true;
      initData.status = 'close';
      initData.pos = 0;
      if (initData.leftWidth && initData.rightWidth) {
        initData.opened = [false, false];
      } else {
        initData.opened = false;
      }
    };
    // btns按钮点击事件
    const handleClickBtn = ({ action, source }: { action: { [key: string]: any }; source: String }) => {
      emit('onClick', {
        action,
        source,
      });
      if (autoBack) {
        close();
      }
    };
    return { start, move, end, initData, classes, swipeCell, leftRef, rightRef, open, close, handleClickBtn };
  },
});
</script>
