<template>
  <t-drawer v-model:visible="visible" placement="left" :items="baseSidebar" @item-click="itemClick">
    <template #footer>
      <div class="button-host">
        <t-button variant="outline" size="large" block>操作</t-button>
      </div>
    </template>
  </t-drawer>
  <t-button block variant="outline" size="large" theme="primary" @click="visible = true">带底部插槽抽屉</t-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerItem } from 'tdesign-mobile-vue';

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
const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};
</script>

<style scopde>
.button-host {
  margin: 0 16px;
  margin-top: auto;
}
</style>
