<template>
  <!-- S -->
  <div class="demo-size__box">
    <div class="t-countdown__small-square">
      <t-countdown
        content="ok"
        :time="9000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
    <div class="t-countdown__small">
      <t-countdown
        content="ok"
        :time="900000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
    <p class="format">S</p>
  </div>
  <!-- M -->
  <div class="demo-size__box">
    <div class="t-countdown__middle-square">
      <t-countdown
        content="ok"
        :time="900000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
    <div class="t-countdown__middle">
      <t-countdown
        content="ok"
        :time="900000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
    <p class="format">M</p>
  </div>
  <!-- L -->
  <div class="demo-size__box">
    <div class="t-countdown__large-square">
      <t-countdown
        content="ok"
        :time="900000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
    <div class="t-countdown__large">
      <t-countdown
        content="ok"
        :time="900000"
        :auto-start="true"
        :millisecond="false"
        format="HH:mm:ss"
        @change="onChange"
        @finish="onFinish"
      />
    </div>
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
  margin-top: 18px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 700;
    font-family: 'DIN Alternate';
  }
  .format {
    opacity: 1;
    font-size: 12px;
    margin-right: 10%;
    color: rgba(0, 0, 0, 0.4);
  }
  // small 有底
  .t-countdown__small-square {
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    span {
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
  // small 无底
  .t-countdown__small {
    color: #000;
    line-height: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  // middle 有底
  .t-countdown__middle-square {
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    span {
      min-width: 24px;
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
  // middle 无底
  .t-countdown__middle {
    color: #000;
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
  }

  // large 有底
  .t-countdown__large-square {
    color: #fff;
    font-size: 16px;
    line-height: 28px;
    span {
      min-width: 28px;
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
  // middle 无底
  .t-countdown__large {
    color: #000;
    line-height: 28px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
