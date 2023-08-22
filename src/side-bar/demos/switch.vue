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
    <div class="content" :style="`transform: translateY(-${Number(sideBarIndex) * 100}%)`">
      <div v-for="(item, index) in data.categories" :key="index" class="section">
        <div class="title">{{ item.title || item.label }}</div>
        <div v-for="(cargo, cargoIndex) in item.items" :key="cargoIndex">
          <t-cell :title="`${cargo.label}${index}`">
            <template #image>
              <t-image shape="round" :src="cargo.image" class="image" />
            </template>
          </t-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { TdSideBarProps, TdSideBarItemProps } from '../type';

const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
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

const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
  console.log('=onSideBarClick===', value, label);
};

const onSideBarChange = (value: TdSideBarProps['value']) => {
  sideBarIndex.value = value;
};
</script>
<style lang="less" scoped>
.side-bar-wrapper {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color-demo, #fff);
  overflow: hidden;
  .content {
    flex: 1;
    transition: transform 0.3s ease;
  }

  .section {
    padding: 16px 0;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
  }

  .title {
    padding-left: 20px;
    margin-bottom: 4px;
    line-height: 26px;
  }

  .image {
    width: 48px;
    height: 48px;
    border: 1px solid #e7e7e7;
  }
}
</style>
