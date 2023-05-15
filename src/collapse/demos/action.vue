<template>
  <t-collapse :value="values" @change="handleChange">
    <t-collapse-panel :value="0" header="折叠面板标题" :header-right-content="values.includes(0) ? '收起' : '展开'">
      <div class="content">
        此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
      </div>
    </t-collapse-panel>
  </t-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const values = ref([0]);
const handleChange = (val: number[]) => {
  values.value = val;
};
</script>
