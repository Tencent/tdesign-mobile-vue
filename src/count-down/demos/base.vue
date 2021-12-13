<template>
 <t-countdown
    content="ok"
    time="200000"
    millisecond="true"
    @Change="onChange"
    @Finish="onFinish"
    :autoStart="false"
    format="HH:mm:ss:sss"
  >
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

<style lang="less">
</style>
