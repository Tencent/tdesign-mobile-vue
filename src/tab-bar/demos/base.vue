<template>
  <div class="demo-tab-bar">
    <h2 class="demo-tab-bar__title">
      单层级纯文本标签栏
    </h2>

    <t-tab-bar
      v-for="(list, index) in demoList_1"
      :key="index"
      v-model="value"
      class="mt-12"
      @change="change"
    >
      <t-tab-bar-item
        v-for="(item, i) in list"
        :key="item.name || i"
        :name="item.name"
      >
        {{ item.text }}
      </t-tab-bar-item>
    </t-tab-bar>

    <h2 class="demo-tab-bar__title">
      双层级纯文本标签栏
    </h2>

    <t-tab-bar v-model="value" class="mt-12" @change="change">
      <t-tab-bar-item
        v-for="(item, index) in list_5"
        :key="item.name || index"
        :name="item.name"
        :children="item.children"
      >
        {{ item.text }}
      </t-tab-bar-item>
    </t-tab-bar>

    <h2 class="demo-tab-bar__title">
      文本加图标标签栏
    </h2>

    <t-tab-bar
      v-for="(list, index) in demoList_2"
      :key="index"
      v-model="value"
      class="mt-12"
      @change="change"
    >
      <t-tab-bar-item
        v-for="(item, i) in list"
        :key="item.name || i"
        :name="item.name"
      >
        <template #icon="props">
          <img :src="props.isChecked ? icons.active : icons.inactive" alt="">
        </template>
        {{ item.text }}
      </t-tab-bar-item>
    </t-tab-bar>

    <h2 class="demo-tab-bar__title">
      纯图标标签栏
    </h2>

    <t-tab-bar
      v-for="(list, index) in demoList_2"
      :key="index"
      v-model="value"
      class="mt-12"
      @change="change"
    >
      <t-tab-bar-item
        v-for="(item, i) in list"
        :key="item.name || i"
        :name="item.name"
      >
        <template #icon="props">
          <img :src="props.isChecked ? icons.active : icons.inactive" alt="">
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ModelValueProps } from '../tab-bar.interface';
export default defineComponent({
  setup() {
    const value = ref(null);
    const list_1 = [
      {
        name: 'label_1',
        text: '标签一',
        children: [],
      },
      {
        name: 'label_2',
        text: '标签二',
        children: [],
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
        text: '标签三',
        children: [],
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
        text: '标签四',
        children: [],
      },
    ];
    const list_4 = [
      ...list_3,
      {
        name: 'label_5',
        text: '标签五',
        children: [],
      },
    ];

    const list_5 = [
      ...list_1,
      {
        name: 'label_3',
        text: '此处展开',
        children: [
          {
            name: 'spread_1',
            text: '展开项一',
          },
          {
            name: 'spread_2',
            text: '展开项二',
          },
          {
            name: 'spread_3',
            text: '展开项三',
          },
        ],
      },
    ];

    const change = (changeValue: ModelValueProps) => {
      console.log('TabBar 值改变为：', changeValue);
    };

    return {
      demoList_1: [
        list_1,
        list_2,
        list_3,
      ],
      demoList_2: [
        list_1,
        list_2,
        list_3,
        list_4,
      ],
      list_5,
      value,
      change,

      icons: {
        inactive: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
        active: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/1097e5e8-a21a-4614-864b-98dec13a0aa5.svg',
      },
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tab-bar{
  background-color: #fbfbfb;
  &__title{
    padding: 24px 16px 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
  }
}
.mt-12{
  margin-top: 12px;
}
</style>
