<template>
  <div class="placement-demo">
    <t-button
      v-for="item in placementList"
      :key="item.key"
      block
      variant="outline"
      theme="primary"
      size="large"
      @click="onClick(item)"
    >
      {{ item.text }}
    </t-button>

    <t-drawer
      v-model:visible="visible"
      :items="baseSidebar"
      title="标题"
      :placement="placement"
      close-on-overlay-click
      @item-click="itemClick"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerItem } from 'tdesign-mobile-vue';

const placementList = [
  { key: 1, value: 'left', text: '左侧抽屉' },
  { key: 2, value: 'right', text: '右侧抽屉' },
] as const;

const baseSidebar = ref([
  {
    title: '菜单一',
  },
  {
    title: '菜单二',
  },
  {
    title: '菜单三',
  },
  {
    title: '菜单四',
  },
  {
    title: '菜单五',
  },
  {
    title: '菜单六',
  },
]);
const visible = ref(false);
const placement = ref<'left' | 'right'>('left');
const onClick = (item: { value: 'left' | 'right' }) => {
  placement.value = item.value;
  visible.value = true;
};
const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};
</script>

<style lang="less" scoped>
.placement-demo {
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
