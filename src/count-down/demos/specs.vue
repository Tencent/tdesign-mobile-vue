<template>
  <!-- S -->
  <div class="demo-size__box">
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      theme="round"
      @change="onChange"
      @finish="onFinish"
    />
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      theme="square"
      @change="onChange"
      @finish="onFinish"
    />
    <p class="format">S</p>
  </div>
  <!-- M -->
  <div class="demo-size__box">
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      size="medium"
      theme="round"
      @change="onChange"
      @finish="onFinish"
    />
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      size="medium"
      theme="square"
      @change="onChange"
      @finish="onFinish"
    />
    <p class="format">M</p>
  </div>
  <!-- L -->
  <div class="demo-size__box">
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      size="medium"
      theme="round"
      @change="onChange"
      @finish="onFinish"
    />
    <t-countdown
      content="ok"
      :time="900000"
      :auto-start="true"
      :millisecond="false"
      format="HH:mm:ss"
      size="medium"
      theme="square"
      @change="onChange"
      @finish="onFinish"
    />
    <p class="format">L</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TimeData } from '../type';

export default defineComponent({
  setup() {
    const onChange = (val: TimeData) => {
      // console.log('onChange', val);
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
.demo-size__box {
  display: flex;
  font-size: 14px;
  margin: 0 0 8px 16px;
  align-items: center;
  justify-content: space-between;
  font-family: PingFang SC, Microsoft YaHei, Arial Regular;
  .format {
    opacity: 1;
    font-size: 12px;
    margin-right: 10%;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
