<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tag 标签</h1>
    <p class="summary">用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成</p>
    <tdesign-demo-block title="01 类型" summary="展示型标签">
      <div class="tag-demo">
        <t-tag theme="primary">重要</t-tag>
        <t-tag theme="danger">危险</t-tag>
        <t-tag theme="warning">警告</t-tag>
        <t-tag theme="success">成功</t-tag>
        <t-tag theme="default">信息</t-tag>
      </div>
      <div class="tag-demo">
        <t-tag theme="primary" variant="dark">深色</t-tag>
        <t-tag theme="primary" variant="light">浅色</t-tag>
        <t-tag theme="primary" variant="plain">朴素</t-tag>
      </div>
      <div class="tag-demo">
        <t-tag theme="primary" shape="round">圆角标签</t-tag>
        <t-tag theme="primary" shape="mark">半圆角标签</t-tag>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="点击型标签">
      <div class="tag-demo">
        <t-tag
          v-for="(tag, index) in closableTags"
          :key="tag"
          closable
          :disabled="tag.disabled"
          theme="primary"
          :size="tag.size"
          @close="onClickClose(index)"
          >{{ tag.name }}</t-tag
        >
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="标签状态">
      <div class="tag-demo">
        <t-check-tag :checked="true">已点击</t-check-tag>
        <t-check-tag :defaultChecked='false'>未点击</t-check-tag>
        <t-check-tag disabled>不可点击</t-check-tag>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="标签规格">
      <div class="tag-demo">
        <t-tag size="large" theme="primary">大号</t-tag>
        <t-tag size="medium" theme="primary">中号</t-tag>
        <t-tag size="small" theme="primary">小号</t-tag>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-tag-base-demo`;

export default defineComponent({
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
        name: '标签',
        size: 'large',
      },
      {
        name: '标签',
      },
      {
        name: '标签',
        size: 'small',
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
});
</script>
