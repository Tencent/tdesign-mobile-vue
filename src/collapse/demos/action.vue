<template>
  <div class="accordion-demo">
    <t-collapse :value="values" @change="handleChange">
      <t-collapse-panel :value="0" header="1" :header-right-content="values.includes(0) ? '收起' : '展开'">
        <div class="content">
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </div>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

const values = ref([0]);
const handleChange = (val) => {
  values.value = val;
};

// const header = () => h('div', '123');
</script>

<style scoped lang="less">
.content {
  padding: 16px 0;
}
</style>
