<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">SearchField 搜索框</h1>
    <p class="summary">用于用户输入搜索信息，并进行页面内容搜索</p>
    <tdesign-demo-block title="01 类型" summary="基础搜索框">
      <t-search v-model="value" placeholder="搜索预设文案" :autofocus="false" @change="onChange"></t-search>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="默认状态">
      <t-search v-model="value" placeholder="搜索预设文案" :autofocus="false" @change="onChange"></t-search>
    </tdesign-demo-block>
    <tdesign-demo-block summary="点击状态">
      <t-search v-model="value" placeholder="搜索预设文案" :autofocus="true" @change="onChange"></t-search>
    </tdesign-demo-block>
    <tdesign-demo-block summary="输入状态">
      <t-search v-model="value2" placeholder="搜索预设文案" :autofocus="true" @change="onChange"></t-search>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const onChange = (val: string) => {
      console.log('change: ', val);
    };
    const value2 = ref('搜索预设文案');

    return {
      onChange,
      value: '',
      value2,
    };
  },
});
</script>
