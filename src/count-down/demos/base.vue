<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">CountDown 倒计时</h1>
    <p class="summary">用于实时展示倒计时数值。</p>
    <tdesign-demo-block title="01类型" summary="动态倒计时间主要有时间数字和时分秒分割组成">
      <!-- 时分秒 -->
      <div class="demo__box">
        <t-countdown
          content="ok"
          :time="900000"
          :auto-start="true"
          :millisecond="false"
          format="HH:mm:ss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">时分秒</p>
      </div>
      <!-- 带毫秒 -->
      <div class="demo__box">
        <t-countdown
          content="ok"
          :time="900123"
          :auto-start="true"
          :millisecond="true"
          format="HH:mm:ss:sss"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带毫秒</p>
      </div>
      <!-- 带圆底 -->
      <div class="demo__box t-countdown__circular-bottom">
        <t-countdown
          content="ok"
          :time="1211211120000"
          :auto-start="true"
          :millisecond="false"
          format="HH:mm:ss"
          theme="round"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带圆底</p>
      </div>
      <!-- 带方形底 -->
      <div class="demo__box t-countdown__square-bottom">
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
        <p class="format">带方形底</p>
      </div>
      <!-- 带单位 -->
      <div class="demo__box t-countdown__has-unit">
        <t-countdown
          content="ok"
          :time="111120000"
          :auto-start="true"
          :millisecond="false"
          format="DD天HH时mm分ss秒"
          theme="square"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">带单位</p>
      </div>
      <!-- 无底色带单位 -->
      <!-- <div class="demo__box t-countdown__has-unit2">
        <t-countdown
          content="ok"
          :time="111120000"
          :auto-start="true"
          :millisecond="false"
          format="DD天HH时mm分ss秒"
          @change="onChange"
          @finish="onFinish"
        />
        <p class="format">无底色带单位</p>
      </div> -->
    </tdesign-demo-block>
    <tdesign-demo-block title="02规格" summary="动倒计时带方底和圆底各尺寸规格">
      <div class="demo-count-down">
        <demo-specs />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import specs from './specs.vue';
import { TimeData } from '../type';

export default defineComponent({
  components: {
    'demo-specs': specs,
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
.demo__box {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin: 0 0 8px 16px;
  justify-content: space-between;
  font-family: PingFang SC, Microsoft YaHei, Arial Regular;
  .format {
    opacity: 1;
    font-size: 12px;
    margin-right: 30%;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
