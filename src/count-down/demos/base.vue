<template>
  <div>基本用法</div>
  <t-countdown
    content="ok"
    time="200000"
    millisecond="true"
    :auto-start="false"
    format="HH:mm:ss:sss"
    @Change="onChange"
    @Finish="onFinish"
  ></t-countdown>
  <t-button type="button" theme="default"> default按钮 </t-button>
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
