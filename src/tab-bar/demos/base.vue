<template>
  <div class="demo-tag-bar">
    <t-cell-group title="单层级纯文本标签栏">
      <t-tab-bar
        v-model="value"
        @change="change"
        v-for="(list, index) in demoList_1"
        :key="index"
        class="mt-12"
      >
        <t-tab-bar-item
          v-for="(item, index) in list"
          :key="item.name || index"
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
        v-model="value"
        @change="change"
        v-for="(list, index) in demoList_2"
        :key="index"
        class="mt-12"
      >
        <t-tab-bar-item
          v-for="(item, index) in list"
          :key="item.name || index"
          :icon="item.icon"
          :name="item.name"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </t-cell-group>

    <t-cell-group title="纯图标标签栏">
      <t-tab-bar
        v-model="value"
        @change="change"
        v-for="(list, index) in demoList_2"
        :key="index"
        class="mt-12"
      >
        <t-tab-bar-item
          v-for="(item, index) in list"
          :key="item.name || index"
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
        icon: 'location_fill',
      },
      {
        name: 'label_2',
        text: '标签二',
        icon: 'tick_fill',
      },
    ];
    const list_2 = [
      ...list_1,
      {
        name: 'label_3',
        text: '标签三',
        icon: 'help_fill',
      },
    ];
    const list_3 = [
      ...list_2,
      {
        name: 'label_4',
        text: '标签四',
        icon: 'close_fill',
      },
    ];
    const list_4 = [
      ...list_3,
      {
        name: 'label_5',
        text: '标签五',
        icon: 'star_fill',
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
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tag-bar{
  background-color: #fbfbfb;
}

.mt-12{
  margin-top: 12px;
}
::v-deep(.t-cell-group-container){
  background-color: #fbfbfb;
}
</style>
