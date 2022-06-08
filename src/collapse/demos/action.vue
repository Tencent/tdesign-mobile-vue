<template>
  <div>
    <t-collapse :value="[currentValue]" @change="change">
      <t-collapse-panel destroy-on-collapse :value="currentValue" :header-right-content="isActive ? '收起' : '展开'">
        <template #default>
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </template>
        <template #header>自定义标题</template>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isActive = ref(true);
const currentValue = ref(0);
const change = (value: any) => {
  isActive.value = value.indexOf(currentValue.value) > -1;
};
</script>
<style lang="less"></style>
