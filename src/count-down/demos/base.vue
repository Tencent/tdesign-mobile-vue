<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const onChange = (val: TimeData) => {
  console.log('onChange', val);
};
const onFinish = () => {
  console.log('onFinish');
};
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
