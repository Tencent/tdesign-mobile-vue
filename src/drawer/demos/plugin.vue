<template>
  <t-button block variant="outline" size="large" theme="primary" @click="showDrawer">命令行调用</t-button>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

const $drawer: any = inject('$drawer');
const showDrawer = () => {
  const instance = $drawer({
    items: new Array(20).fill({ title: '菜单' }).map((item, index: number) => ({ title: `标题 ${index + 1}` })),
    onItemClick(index: number) {
      console.log(index);
      instance.hide();
    },
  });
  instance.show();
};
</script>
