<template>
  <tdesign-demo-block summary="滑动到底自动执行操作">
    <!-- 数组 · 单操作项 -->
    <t-swipe-cell full-swipe :left="singleAction" :right="singleAction">
      <t-cell title="左右滑到底删除" note="数组 · 单操作项"></t-cell>
    </t-swipe-cell>

    <!-- 数组 · 多操作项 -->
    <t-swipe-cell full-swipe :left="multiActions" :right="multiActions" style="margin-top: 16px">
      <t-cell title="左右滑到底删除（最外侧项）" note="数组 · 多操作项"></t-cell>
    </t-swipe-cell>

    <!-- 插槽 · 单操作项 -->
    <t-swipe-cell full-swipe style="margin-top: 16px">
      <t-cell title="左右滑到底删除" note="插槽 · 单操作项"></t-cell>
      <template #left>
        <div class="btn delete-btn" @click="handleClick('删除')">删除</div>
      </template>
      <template #right>
        <div class="btn delete-btn" @click="handleClick('删除')">删除</div>
      </template>
    </t-swipe-cell>

    <!-- 插槽 · 多操作项 -->
    <t-swipe-cell full-swipe style="margin-top: 16px">
      <t-cell title="左右滑到底删除（最外侧项）" note="插槽 · 多操作项"></t-cell>
      <template #left>
        <div class="btn favor-btn" @click="handleClick('收藏')">收藏</div>
        <div class="btn edit-btn" @click="handleClick('编辑')">编辑</div>
        <div class="btn delete-btn" @click="handleClick('删除')">删除</div>
      </template>
      <template #right>
        <div class="btn favor-btn" @click="handleClick('收藏')">收藏</div>
        <div class="btn edit-btn" @click="handleClick('编辑')">编辑</div>
        <div class="btn delete-btn" @click="handleClick('删除')">删除</div>
      </template>
    </t-swipe-cell>

    <t-swipe-cell
      style="margin-top: 16px"
      class="ios-swipe"
      :class="{ 'ios-swipe--active': iosSwiping }"
      full-swipe
      :right="iosActions"
      @touchstart="onIosTouchStart"
      @touchmove="onIosTouchMove"
      @change="(v?: string) => (iosSwiping = !!v)"
    >
      <t-cell title="胶囊型操作项（左滑到底删除）" note="数组"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { NotificationFilledIcon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';
import type { SwipeActionItem } from 'tdesign-mobile-vue';

const singleAction: SwipeActionItem[] = [{ text: '删除', className: 'btn delete-btn', onClick: () => Toast('删除') }];

const multiActions: SwipeActionItem[] = [
  { text: '收藏', className: 'btn favor-btn', onClick: () => Toast('收藏') },
  { text: '删除', className: 'btn delete-btn', onClick: () => Toast('删除') },
];

const muteIcon = h(NotificationFilledIcon, { size: '22px' });
const trashIcon = h(DeleteIcon, { size: '22px' });

// 是否处于滑动/展开态：仅在左滑（露出右侧删除按钮）后给 cell 添加背景与圆角
const iosSwiping = ref(false);
// 右滑无操作项，不应触发样式，故按触摸方向判断：仅左滑激活
let iosStartX = 0;
const onIosTouchStart = (e: TouchEvent) => {
  iosStartX = e.touches[0]?.clientX ?? 0;
};
const onIosTouchMove = (e: TouchEvent) => {
  const deltaX = (e.touches[0]?.clientX ?? 0) - iosStartX;
  if (deltaX < 0) {
    iosSwiping.value = true;
  }
};

const iosActions: SwipeActionItem[] = [
  { text: '', icon: muteIcon, className: 'ios-btn ios-mute-btn', onClick: () => Toast('隐藏提醒') },
  { text: '', icon: trashIcon, className: 'ios-btn ios-delete-btn', onClick: () => Toast('删除') },
];

const handleClick = (value: string) => {
  Toast(value);
};
</script>

<style lang="less">
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: white;
}

.delete-btn {
  background-color: #e34d59;
}

.edit-btn {
  background-color: #ed7b2f;
}

.favor-btn {
  background-color: #0052d9;
}

/* 模拟苹果短信：圆形操作按钮，滑到底时红色按钮展开成胶囊 */
.ios-swipe {
  background-color: var(--td-bg-color-container);
  // 初始态 cell 保持原样；滑动后（--active）才呈浅灰圆角卡片（苹果短信条样式）
  &--active .t-cell {
    background-color: var(--td-bg-color-secondarycontainer);
    border-radius: var(--td-radius-extraLarge);
    overflow: hidden;
  }

  // 面板背景透明，让圆形按钮之间露出空隙
  // 拉伸区由删除按钮本体撑满，面板保持透明即可
  .t-swipe-cell__right {
    background-color: transparent;
    align-items: stretch;
    box-sizing: border-box;
    padding: 8px;
  }

  .ios-btn {
    height: 100%;
    aspect-ratio: 1; // 宽 = 高，呈正圆
    min-width: 0;
    margin-left: 10px;
    padding: 0;
    border-radius: 9999px; // 足够大：正方形时为圆，拉伸时为胶囊
    color: #fff;
  }

  .ios-mute-btn {
    background-color: #7a67e8;
  }

  .ios-delete-btn {
    background-color: #ff3b30;
  }

  // full-swipe 滑到底：删除按钮拉伸占满剩余空间，图标靠左，整体呈圆角胶囊
  // 优先级 0,3,0 高于组件 pin 规则并加 !important，确保 flex:1 拉伸生效
  .t-swipe-cell__action-sliding.ios-delete-btn {
    flex: 1 1 0% !important;
    aspect-ratio: auto; // 解除正圆约束，交由 flex 撑满宽度
    justify-content: flex-start;
    padding-left: 16px;
  }

  .t-swipe-cell__icon {
    font-size: 22px;
  }
}
</style>
