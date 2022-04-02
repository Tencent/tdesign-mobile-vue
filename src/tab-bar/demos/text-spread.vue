<template>
  <div class="demo-tab-bar is-activated">
    <t-tab-bar v-model="value" @change="change">
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="item.name || index"
        :icon="item.icon"
        :name="item.name"
        :sub-tab-bar="item.children"
      >
        {{ item.text }}
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(null);
    const isActivated = true;
    const list = [
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
      {
        name: 'label_3',
        text: '此处展开',
        icon: undefined,
        children: [
          {
            name: 'spread_1',
            text: '展开项一',
            icon: undefined,
          },
          {
            name: 'spread_2',
            text: '展开项二',
            icon: undefined,
          },
          {
            name: 'spread_3',
            text: '展开项三',
            icon: undefined,
          },
        ],
      },
    ];

    watch(value, (newValue) => {
      console.log('当前值：', newValue);
    });

    const change = (changeValue: number | string) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      list,
      value,
      change,
      isActivated,
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tab-bar {
  width: 375px;
  &.is-activated {
    padding-top: 150px;
  }
}
.mt-12 {
  margin-top: 12px;
}
</style>
