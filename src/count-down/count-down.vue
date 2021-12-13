<template>
  <p v-if="!time">{{ content }}</p>
  <template v-if="time">
    <template v-for="item in showTimes" :key="item.mark">
      <span>{{ item.value }}</span>
      <label v-if="item.mark">{{ item.mark }}</label>
    </template>
  </template>
</template>

<script lang="ts">
import { watch, defineComponent, ref, reactive } from 'vue';
import config from '../config';
import CountDownProps from './props';
import { getRemainTimes, getShowTimes } from './utils';

let timer: any = 0; // 定时器
const { prefix } = config;
const name = `${prefix}-countdown`;

export default defineComponent({
  name,
  props: {
    ...CountDownProps,
  },
  setup(props) {
    const { format, millisecond, onFinish, onChange } = props || {};
    //
    const time = ref(Number(props?.time || 0));
    const showTimes = reactive(getShowTimes(getRemainTimes(time?.value), format));

    // 开始倒记时函数
    const StartCountdown = () => {
      const interval = millisecond ? 1 : 1000;
      timer = setInterval(() => {
        const times = getRemainTimes(time.value);
        if (time.value <= 0) {
          onFinish?.();
          return clearInterval(timer);
        }
        onChange?.(times);
        time.value -= 1;
        return getShowTimes(times, format)?.forEach?.((i, idx) => {
          // showTimes[idx].mark = i?.mark;
          showTimes[idx].value = i?.value;
        });
      }, interval);
    };

    // autoStart为true开始倒计时
    props?.autoStart && StartCountdown();

    // 监听autoStart
    watch(
      () => props?.autoStart,
      (cur) => {
        cur && StartCountdown();
      },
    );
    // return
    return {
      name,
      time,
      showTimes,
      content: props?.content,
    };
  },
  /**
   * 卸载前清定时器
   */
  beforeUnmount() {
    timer && clearInterval(timer);
  },
});
</script>
