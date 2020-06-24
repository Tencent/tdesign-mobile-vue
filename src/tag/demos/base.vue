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
    <t-cell-group title="主题和效果">
      <t-cell>
        <div style="text-align: left;">
          <div>
            默认：
            <t-tag>默认</t-tag>
          </div>

          <div>
            深色：
            <t-tag theme="primary">重要</t-tag>
            <t-tag theme="danger">危险</t-tag>
            <t-tag theme="warning">警告</t-tag>
            <t-tag theme="success">成功</t-tag>
          </div>
          <div>
            浅色：
            <t-tag theme="primary" effect="light">重要</t-tag>
            <t-tag theme="danger" effect="light">危险</t-tag>
            <t-tag theme="warning" effect="light">警告</t-tag>
            <t-tag theme="success" effect="light">成功</t-tag>
          </div>
          <div>
            朴素：
            <t-tag theme="primary" effect="plain">重要</t-tag>
            <t-tag theme="danger" effect="plain">危险</t-tag>
            <t-tag theme="warning" effect="plain">警告</t-tag>
            <t-tag theme="success" effect="plain">成功</t-tag>
          </div>
        </div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="不同尺寸">
      <t-cell>
        <div style="text-align: left;">
          <t-tag size="small">small</t-tag>
          <t-tag>medium</t-tag>
          <t-tag size="large">large</t-tag>
        </div>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="icon">
      <t-cell>
        <div style="text-align: left;">
          <t-tag icon="apple">apple</t-tag>
          <t-tag icon="android">android</t-tag>
        </div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="圆角效果">
      <t-cell>
        <div style="text-align: left;">
          <div></div>
          <t-tag shape="square" theme="primary">square</t-tag>
          <t-tag shape="round" theme="primary">round</t-tag>
          <t-tag shape="circle" theme="primary">circle</t-tag>
        </div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="内容超长省略">
      <t-cell>
        <div style="text-align: left;">
          <t-tag @click="onClickBtn()">听说内容超长就会被省略</t-tag>
        </div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="点击型标签">
      <t-cell>
        <div style="text-align: left;">
          <div class="intro">选择你喜欢的水果</div>
          <t-check-tag
            v-for="(fruit, index) in fruits"
            @click="onClickFruit(index)"
            :key="fruit.name"
            :checked="fruit.checked"
            :disabled="fruit.disabled"
          >{{fruit.name}}</t-check-tag>
        </div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="可关闭标签">
      <t-cell>
        <div style="text-align: left;">
          <t-tag
            v-for="(tag, index) in closableTags"
            :closable="true"
            :disabled="tag.disabled"
            :key="tag.name"
            @close="onClickClose(index)"
          >{{tag.name}}</t-tag>
        </div>
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

    const closableTags = ref([
      {
        name: '标签1',
      },
      {
        name: '标签2',
      },
      {
        name: '标签3',
      },
      {
        name: '标签4',
        disabled: true,
      },
    ]);

    function onClickClose(index: number) {
      closableTags.value.splice(index, 1);
    }

    function onClickFruit(index: number) {
      fruits.value[index].checked = !fruits.value[index].checked;
    }

    return {
      fruits,
      closableTags,
      onClickFruit,
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
}
</style>
