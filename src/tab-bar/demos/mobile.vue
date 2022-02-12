<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">TabBar 标签栏</h1>
    <p class="summary">移动端的主导航，用做功能模块之间的切换</p>
    <tdesign-demo-block title="01 类型" summary="单层级纯文本标签栏">
      <t-tab-bar v-for="(list, index) in demoList_1" :key="index" :value="value" @change="change">
        <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :name="item.name">
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </tdesign-demo-block>
    <tdesign-demo-block summary="文本加图标标签栏">
      <t-tab-bar v-for="(list, index) in demoList_2" :key="index" v-model="value" @change="change">
        <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :name="item.name" :badge-props="item.badge">
          <template #icon>
            <app-icon />
          </template>
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯图标标签栏">
      <t-tab-bar v-for="(list, index) in demoList_3" :key="index" :default-value="value" @change="change">
        <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :name="item.name">
          <template #icon>
            <app-icon />
          </template>
        </t-tab-bar-item>
      </t-tab-bar>
    </tdesign-demo-block>
    <tdesign-demo-block summary="双层级纯文本标签栏">
      <t-tab-bar v-model="value" fixed :bordered="false" @change="change">
        <t-tab-bar-item
          v-for="(item, index) in list_5"
          :key="item.name || index"
          :name="item.name"
          :sub-tab-bar="item.children"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { AppIcon },
  setup() {
    const value = ref(1);
    const list_1 = [
      {
        name: 'label_1',
        text: '标签一',
        children: [],
        badge: {},
      },
      {
        name: 'label_2',
        text: '标签二',
        children: [],
        badge: {},
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
        text: '标签三',
        children: [],
        badge: {},
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
        text: '标签四',
        children: [],
        badge: {},
      },
    ];
    const list_4 = [
      ...list_3,
      {
        name: 'label_5',
        text: '标签五',
        children: [],
        badge: {},
      },
    ];

    const list_5 = [
      ...list_1,
      {
        name: 'label_3',
        text: '此处展开',
        children: [
          {
            value: 'spread_1',
            label: '展开项一',
          },
          {
            value: 'spread_2',
            label: '展开项二',
          },
          {
            value: 'spread_3',
            label: '展开项三',
          },
        ],
      },
    ];

    const list_6 = [
      {
        name: 'label_1',
        text: '标签一',
        children: [],
        badge: {
          count: '16',
        },
      },
      {
        name: 'label_2',
        text: '标签二',
        children: [],
        badge: {
          dot: true,
        },
      },
      {
        name: 'label_3',
        text: '标签三',
        children: [],
        badge: {
          count: 'New',
        },
      },
      {
        name: 'label_4',
        text: '标签四',
        children: [],
        badge: {
          count: '···',
        },
      },
    ];

    const change = (changeValue: number | string) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      demoList_1: [list_1, list_2, list_3],
      demoList_2: [list_1, list_2, list_3, list_4, list_6],
      demoList_3: [list_1, list_2, list_3, list_4],
      list_5,
      value,
      change,
    };
  },
});
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  .t-tab-bar {
    position: relative;
  }
  .t-tab-bar + .t-tab-bar {
    margin-top: 16px;
  }
}
</style>
