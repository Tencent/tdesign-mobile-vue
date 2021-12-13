<template>
  <tdesign-demo-block title="基础用法">
    <div class="t-count-down__box">
      <t-countdown
        content="ok"
        :time="20000"
        :millisecond="false"
        :auto-start="true"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
  </tdesign-demo-block>
  <tdesign-demo-block title="添加背景">
    <div class="t-count-down__box">
      <demo-control />
    </div>
  </tdesign-demo-block>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TimeData } from '../type';
import Control from './control.vue';

export default defineComponent({
  components: {
    'demo-control': Control,
  },
  setup() {
    const onChange = (val: TimeData) => {
      // console.log('onChange', val);
    };
    const onFinish = () => {
      // console.log('onFinish');
    };

    return {
      onChange,
      onFinish,
    };
  },
});
</script>

<style lang="less">
.t-count-down__box {
  margin: 6px 20px;
}
</style>
