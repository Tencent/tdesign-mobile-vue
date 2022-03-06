<template>
  <div class="demo-tab-bar">
    <t-tab-bar v-for="(list, index) in demoList" :key="index" v-model="value" class="mt-12" @change="change">
      <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :name="item.name">
        <template #icon>
          <app-icon />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { AppIcon },
  setup() {
    const value = ref(null);
    const list_1 = [
      {
        name: 'label_1',
      },
      {
        name: 'label_2',
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
      },
    ];
    const list_4 = [
      ...list_3,
      {
        name: 'label_5',
      },
    ];

    watch(value, (newValue) => {
      console.log('当前值：', newValue);
    });

    const change = (changeValue: number | string) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      demoList: [list_1, list_2, list_3, list_4],
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
