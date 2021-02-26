<template>
  <div>
    <t-search-field
      v-model="value"
      icon-color="#0052d9"
      placeholder="请输入关键字"
      @change="onChange"
    ></t-search-field>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onChange = (val) => {
      console.log('change: ', val);
    };

    return {
      onChange,
    };
  },
});
</script>

<style lang="less" scoped>
</style>
