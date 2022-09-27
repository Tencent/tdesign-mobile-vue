<template>
  <div class="demo-tab-bar">
    <t-tabs v-model="currentValue" :on-change="onChange">
      <t-tab-panel value="first" label="标签页一">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="second" label="标签页二">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel value="third" :disabled="true" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentValue = ref('first');

const onChange = (value: string) => {
  currentValue.value = value;
  console.log(`change to ${value}`);
};
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 12px;
}
.t-tabs__panel p {
  height: 86px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgba(#000000, 0.16);
  margin: 0;
}
</style>
