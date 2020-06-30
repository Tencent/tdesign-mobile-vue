<!--
 * @Author: pinghai li
 * @Date: 2020-05-25 16:40:09
 * @LastEditTime: 2020-05-25 17:20:55
 * @LastEditors: pinghai li
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/tag/tag.vue
-->
<template>
  <div class="tag-base">
    <t-cell-group title="展示型标签">
      <t-cell>
        <t-tag theme="primary">重要</t-tag>
        <t-tag theme="danger">危险</t-tag>
        <t-tag theme="warning">警告</t-tag>
        <t-tag theme="success">成功</t-tag>
        <t-tag theme="info">信息</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell>
        <t-tag theme="primary" effect="dark">深色</t-tag>
        <t-tag theme="primary" effect="light">浅色</t-tag>
        <t-tag theme="primary" effect="plain">朴素</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell>
        <t-tag size="large" theme="primary">大号</t-tag>
        <t-tag size="medium" theme="primary">中号</t-tag>
        <t-tag size="small" theme="primary">小号</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell>
        <t-tag size="large" theme="primary" shape="circle">圆角</t-tag>
        <t-tag size="medium" theme="primary" shape="circle">圆角</t-tag>
        <t-tag size="small" theme="primary" shape="circle">圆角</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="点击型标签">
      <t-cell>
        <t-check-tag
          size="large"
          v-for="(fruit, index) in fruits"
          @click="onClickFruit(index)"
          :key="fruit.name"
          :checked="fruit.checked"
          :disabled="fruit.disabled"
        >{{fruit.name}}</t-check-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell>
        <t-check-tag
          v-for="(fruit, index) in fruits2"
          @click="onClickFruit2(index)"
          :key="fruit.name"
          :checked="fruit.checked"
          :disabled="fruit.disabled"
        >{{fruit.name}}</t-check-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell>
        <t-tag
          v-for="(tag,index) in closableTags"
          :closable="true"
          :disabled="tag.disabled"
          :key="tag"
          theme="primary"
          :size="tag.size"
          @close="onClickClose(index)"
        >{{tag.name}}</t-tag>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-tag-base-demo`;

export default {
  name,
  setup() {
    const fruits = ref([
      {
        name: '苹果',
        checked: true,
      },
      {
        name: '香蕉',
        checked: false,
      },
      {
        name: '桃子',
        checked: false,
      },
      {
        name: '火龙果',
        checked: false,
        disabled: true,
      },
    ]);

    const fruits2 = ref([
      {
        name: '苹果',
        checked: true,
      },
      {
        name: '香蕉',
        checked: false,
      },
      {
        name: '桃子',
        checked: false,
      },
      {
        name: '火龙果',
        checked: false,
        disabled: true,
      },
    ]);

    const closableTags = ref([
      {
        name: '可关闭',
        size: 'large',
      },
      {
        name: '可关闭',
      },
      {
        name: '失效标签',
        disabled: true,
      },
    ]);

    function onClickClose(index: number) {
      closableTags.value.splice(index, 1);
    }

    function onClickFruit(index: number) {
      fruits.value[index].checked = !fruits.value[index].checked;
    }

    function onClickFruit2(index: number) {
      fruits2.value[index].checked = !fruits2.value[index].checked;
    }

    return {
      fruits,
      fruits2,
      closableTags,
      onClickFruit,
      onClickFruit2,
      onClickClose,
    };
  },
};
</script>
<style lang="less" >
.tag-base {
  background: #fbfbfb;
  .t-tag + .t-tag {
    margin-left: 8px;
  }
  .intro {
    font-size: 14px;
    color: #555;
  }
  .t-cell--value {
    text-align: left;
  }
}
</style>
