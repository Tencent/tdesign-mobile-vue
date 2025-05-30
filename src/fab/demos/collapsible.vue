<template>
  <t-fab ref="fabRef" :style="scrolling ? 'right: 0;bottom:64px;' : 'right:16px;bottom:24px'">
    <div v-if="!scrolling" class="wrap">
      <div class="item">
        <AddCircleIcon size="20" />
        <span class="text">添加</span>
      </div>
      <div class="item">
        <StarIcon size="20" />
        <span class="text">收藏</span>
      </div>
      <div class="item">
        <JumpIcon size="20" />
        <span class="text">分享</span>
      </div>
    </div>
    <div v-else class="symbol">
      <ChevronLeftIcon />
    </div>
  </t-fab>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { AddCircleIcon, StarIcon, JumpIcon, ChevronLeftIcon } from 'tdesign-icons-vue-next';
import getScrollParent from '../../_util/getScrollParent';

const fabRef = ref();
const scrolling = ref(false);
let timer: ReturnType<typeof setTimeout>;
const onScroll = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    scrolling.value = false;
  }, 100);

  scrolling.value = true;
};
let scroller: Element | Window;

onMounted(() => {
  scroller = getScrollParent(fabRef.value?.$el);
  scroller.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  scroller.removeEventListener('scroll', onScroll);
});
</script>

<style lang="less" scoped>
.wrap {
  border: 1px solid #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0;
  border-radius: 22px;
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.1),
    0px 8px 10px 1px rgba(0, 0, 0, 0.06),
    0px 3px 14px 2px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
  width: 44px;
  height: 156px;
  box-sizing: border-box;

  .item {
    width: 100%;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 4px;
    }

    .text {
      height: 20px;
      line-height: 20px;
    }
  }
}

.symbol {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px 0 0 16px;
  background: #fff;

  border: 1px solid #dcdcdc;
  border-right: 0;
  box-shadow:
    0px 5px 5px -3px #0000001a,
    0px 8px 10px 1px #0000000f,
    0px 3px 14px 2px #0000000d;
}
</style>
