<template>
  <div class="demo-tab-bar">
    <t-tabs v-model="currentValue" :animation="animation" @change="onChange">
      <t-tab-panel value="1" label="标签页一" panel="标签一内容区" />
      <t-tab-panel value="2" label="标签页二" panel="标签二内容区" />
      <t-tab-panel value="3" label="标签页三" panel="标签三内容区" />
      <t-tab-panel value="4" label="标签页四" panel="标签四内容区" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentValue = ref('1');
const animation = { duration: 500 };

const onChange = (value: string) => {
  currentValue.value = value;
  console.log(`change to ${value}`);
};
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 12px;
}
.t-tabs__panel {
  height: 86px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgba(#000000, 0.16);
  margin: 0;
}
</style>
