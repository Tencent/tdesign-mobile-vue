<template>
  <div class="side-bar-wrapper">
    <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
      <t-side-bar-item
        v-for="(item, index) in data.categories"
        :key="index"
        :value="index"
        :label="item.label"
        :badge-props="item.badgeProps"
      />
    </t-side-bar>
    <div ref="wrapper" class="content" @scroll="onScroll">
      <div v-for="(item, index) in data.categories" :key="index" class="section" :style="contentStyle">
        <div class="title">{{ item.title || item.label }}</div>
        <t-grid :column="3" :border="false">
          <div v-for="(cargo, cargoIndex) in item.items" :key="cargoIndex">
            <t-grid-item :text="cargo.label" :image="cargo.image" :image-props="{ shape: 'round', lazy: true }">
            </t-grid-item>
          </div>
        </t-grid>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { TdSideBarProps, TdSideBarItemProps } from '../type';

const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);
const sideBarIndex = ref<TdSideBarProps['value']>(1);

const data = reactive({
  categories: [
    {
      label: '选项一',
      title: '标题一',
      badgeProps: {},
      items,
    },
    {
      label: '选项二',
      title: '标题二',
      badgeProps: {
        dot: true,
      },
      items: items.slice(0, 9),
    },
    {
      label: '选项三',
      title: '标题三',
      badgeProps: {},
      items: items.slice(0, 9),
    },
    {
      label: '选项四',
      title: '标题四',
      badgeProps: {
        count: 6,
      },
      items: items.slice(0, 6),
    },
    {
      label: '选项五',
      title: '标题五',
      badgeProps: {},
      items: items.slice(0, 3),
    },
  ],
});

const wrapper = ref<HTMLElement>();
const offsetTopList = reactive<number[]>([]);
const contentStyle = ref('');
const getOffsetTopList = () => {
  if (wrapper.value) {
    const $title = wrapper.value.querySelectorAll<HTMLElement>(`.title`);
    $title.forEach((item) => offsetTopList.push(item.offsetTop));
  }
};

const moveToActiveSideBar = (index: number) => {
  if (wrapper.value) {
    wrapper.value.scrollTop = offsetTopList[index] - offsetTopList[0];
  }
};

onMounted(() => {
  getOffsetTopList();
  moveToActiveSideBar(Number(sideBarIndex.value));
});

const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
  console.log('=onSideBarClick===', value, label);
};

const onSideBarChange = (value: TdSideBarProps['value']) => {
  sideBarIndex.value = value;
  moveToActiveSideBar(Number(value));
};

const onScroll = (e: WheelEvent | Event) => {
  const threshold = offsetTopList[0]; // 下一个标题与顶部的距离
  const { scrollTop } = e.target as HTMLElement;
  if (scrollTop < threshold) {
    sideBarIndex.value = 0;
    return;
  }
  const index = offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

  if (index > -1) {
    sideBarIndex.value = index;
  }
};
</script>
<style lang="less" scoped>
.side-bar-wrapper {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color-demo, #fff);

  .content {
    flex: 1;
    overflow-y: scroll;
  }

  .section {
    padding: 16px 0;
  }

  .title {
    padding-left: 20px;
    margin-bottom: 4px;
    line-height: 26px;
  }

  .image {
    width: 48px;
    height: 48px;
  }
}
</style>
