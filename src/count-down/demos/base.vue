<template>
  <div class="demo-count-down">
    <h1 class="title">CountDown 倒计时</h1>
    <p class="summary">用于实时展示倒计时数值。</p>
    <tdesign-demo-block title="01类型">
      <div class="demo__box">
        <t-countdown
          content="ok"
          :time="900000"
          :auto-start="false"
          :millisecond="false"
          format="HH:mm:ss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">时分秒</p>
      </div>
      <div class="demo__box">
        <t-countdown
          content="ok"
          :time="900123"
          :auto-start="false"
          :millisecond="true"
          format="HH:mm:ss:sss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带毫秒</p>
      </div>
      <div class="demo__box square-bottom">
        <t-countdown
          content="ok"
          :time="900000"
          :auto-start="false"
          :millisecond="false"
          format="HH:mm:ss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带方形底</p>
      </div>
      <div class="demo__box circular-bottom">
        <t-countdown
          content="ok"
          :time="1211211120000"
          :auto-start="false"
          :millisecond="false"
          format="HH:mm:ss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带圆底</p>
      </div>
      <div class="demo__box square-bottom">
        <t-countdown
          content="ok"
          :time="111120000"
          :auto-start="true"
          :millisecond="false"
          format="DD天HH时mm分ss秒"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带单位</p>
      </div>
    </tdesign-demo-block>
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
.demo-count-down {
  padding: 12px 0;
  background: #fff;
  font-family: 'PingFang SC';
  min-height: 800px;
  .title {
    opacity: 1;
    font-size: 28px;
    font-weight: 700;
    padding: 4px 12px;
    color: rgba(0, 0, 0, 0.9);
  }
  .summary {
    opacity: 1;
    line-height: 18px;
    font-size: 12px;
    font-weight: 400;
    padding: 0 0 0 12px;
    color: rgba(0, 0, 0, 0.4);
  }
  .demo__box {
    font-size: 12px;
    margin: 16px;
    display: flex;
    margin-bottom: 0;
    align-items: center;
    span {
      font-weight: 700;
    }
    .format {
      opacity: 1;
      margin-left: 20px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  // 方底
  .square-bottom {
    color: #fff;
    span {
      font-weight: normal;
      border-radius: 4px;
      padding: 2px 4px;
      font-size: 12px;
      line-height: 16px;
      background: rgba(227, 77, 89, 1);
    }
    label {
      padding: 4px;
      color: rgba(227, 77, 89, 1);
    }
  }
  // 圆底
  .circular-bottom {
    color: #fff;
    span {
      font-weight: normal;
      border-radius: 50%;
      padding: 2px 4px;
      font-size: 12px;
      line-height: 16px;
      background: rgba(227, 77, 89, 1);
    }
    label {
      padding: 4px;
      color: rgba(227, 77, 89, 1);
    }
  }
}
</style>
