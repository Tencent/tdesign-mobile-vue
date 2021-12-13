<template>
  <div>基本用法</div>
  <t-countdown
    content="ok"
    time="200000"
    millisecond="true"
    auto-start="true"
    format="HH:mm:ss:sss"
    @change="onChange"
    @finish="onFinish"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TimeData } from '../type';

export default defineComponent({
  setup() {
    const onChange = (val: TimeData) => {
      console.log('onChange', val);
    };
    const onFinish = () => {
      console.log('onFinish');
    };

    return {
      onChange,
      onFinish,
    };
  },
});
</script>

<style lang="less"></style>
