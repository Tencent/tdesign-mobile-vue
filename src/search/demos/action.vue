<template>
  <div class="example-search">
    <t-search
      placeholder="搜索预设文案"
      :center="true"
      :focus="true"
      action="取消"
      @action-click="onActionClick"
      @change="onChange"
    ></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const onChange = (val: string) => {
  console.log('change: ', val);
};
const onActionClick = () => {
  console.log('action-click');
};

const value = ref('');
</script>
<style lang="less">
.example-search {
  background-color: #fff;
  padding: 8px 16px;
}
</style>
