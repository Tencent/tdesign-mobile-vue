<template>
  <div>
    <t-checkbox-group :default-value="checkBox" class="checkbox-group-demo" :max="2">
      <t-checkbox name="checkbox1" value="1" label="多选" />
      <t-checkbox name="checkbox1" value="2" label="多选" />
      <t-checkbox name="checkbox1" value="3" label="多选" />
    </t-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const checkBox = ref(['1', '2']);
</script>
<style lang="less" scoped>
.checkbox-group-demo {
  background: #fff;
}
</style>
