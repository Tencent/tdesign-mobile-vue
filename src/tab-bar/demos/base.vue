<template>
  <div class="demo-tab-bar">
    <t-cell-group title="单层级纯文本标签栏">
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
    </t-cell-group>

    <t-cell-group title="双层级纯文本标签栏">
      <t-tab-bar v-model="value" @change="change">
        <t-tab-bar-item
          v-for="(item, index) in list_5"
          :key="item.name || index"
          :name="item.name"
          :children="item.children"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </t-cell-group>

    <t-cell-group title="文本加图标标签栏">
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
          :icon="item.icon"
          :name="item.name"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </t-cell-group>

    <t-cell-group title="纯图标标签栏">
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
          :icon="item.icon"
          :name="item.name"
        ></t-tab-bar-item>
      </t-tab-bar>
    </t-cell-group>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref(null);
    const list_1 = [
      {
        name: 'label_1',
        text: '标签一',
        icon: 'location-filled',
      },
      {
        name: 'label_2',
        text: '标签二',
        icon: 'check-circle-filled',
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
        text: '标签三',
        icon: 'help-circle-filled',
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
        text: '标签四',
        icon: 'clear-circle-filled',
      },
    ];
    const list_4 = [
      ...list_3,
      {
        name: 'label_5',
        text: '标签五',
        icon: 'star-filled',
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

    const change = (changeValue) => {
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
      change
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tab-bar{
  background-color: #fbfbfb;
}

.mt-12{
  margin-top: 12px;
}
::v-deep(.t-cell-group-container){
  background-color: #fbfbfb;
}
</style>
