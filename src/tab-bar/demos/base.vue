<template>
  <div class="demo-tab-bar">
    <t-tab-bar v-for="(list, index) in demoList" :key="index" v-model="value" class="mt-12" @change="change">
      <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :icon="item.icon" :name="item.name">
        {{ item.text }}
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('label_2');
    const list_1 = [
      {
        name: 'label_1',
        text: '标签一',
        icon: undefined,
      },
      {
        name: 'label_2',
        text: '标签二',
        icon: undefined,
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
        text: '标签三',
        icon: undefined,
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
        text: '标签四',
        icon: undefined,
      },
    ];

    watch(value, (newValue) => {
      console.log('当前值：', newValue);
    });

    const change = (changeValue: number | string) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      demoList: [list_1, list_2, list_3],
      value,
      change,
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tab-bar {
  width: 375px;
}
.mt-12 {
  margin-top: 12px;
}
</style>
