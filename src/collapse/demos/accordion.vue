<template>
  <t-collapse expand-mutex :value="values" @change="handleChange">
    <t-collapse-panel
      v-for="i in 4"
      :key="i"
      :value="i"
      header="折叠面板标题"
      header-right-content="单元测试"
      :disabled="i === 4"
    >
      <div class="content">
        此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
      </div>
    </t-collapse-panel>
  </t-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const values = ref([1]);
const handleChange = (val: number[]) => {
  values.value = val;
};
</script>
