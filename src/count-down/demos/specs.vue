<template>
  <!-- 时分秒 -->
  <div class="demo-size__box">
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
  <!-- 带毫秒 -->
  <div class="demo-size__box">
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
  <!-- 带方形底 -->
  <div class="demo-size__box square-bottom">
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
  <!-- 带圆底 -->
  <div class="demo-size__box circular-bottom">
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
  <!-- 带单位 -->
  <div class="demo-size__box has-unit">
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
  <!-- 无底色带单位 -->
  <div class="demo-size__box has-unit2">
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
.demo-size__box {
  margin: 10px 16px;
  display: flex;
  font-size: 14px;
  margin-bottom: 0;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 700;
  }
  .format {
    opacity: 1;
    font-size: 12px;
    margin-right: 30%;
    color: rgba(0, 0, 0, 0.4);
  }
}

// small 无底
.t-countdown__small {
  color: #fff;
  line-height: 20px;
  span {
    font-size: 12px;
    min-width: 20px;
    border-radius: 4px;
    text-align: center;
    font-weight: normal;
    display: inline-block;
    background: rgba(227, 77, 89, 1);
  }
  label {
    padding: 0 4px;
    color: rgba(227, 77, 89, 1);
  }
}

// small 有底
.t-countdown__small-square {
  color: #fff;
  line-height: 20px;
  span {
    font-size: 12px;
    min-width: 20px;
    border-radius: 4px;
    text-align: center;
    font-weight: normal;
    display: inline-block;
    background: rgba(227, 77, 89, 1);
  }
  label {
    padding: 0 4px;
    color: rgba(227, 77, 89, 1);
  }
}
</style>
