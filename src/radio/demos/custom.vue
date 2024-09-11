<template>
  <t-radio-group :value="radio" @change="onChange">
    <view v-for="(item, index) in 3" :key="index" :class="`card ${radio == index ? 'card--active' : ''}`">
      <icon v-if="radio == index" name="check" class="card__icon" />
      <t-radio :value="index" label="单选" content="描述信息描述信息描述信息描述信息描述信息" icon="none" borderless />
    </view>
  </t-radio-group>

  <view class="demo-desc" style="margin: 48rpx 32rpx 32rpx">横向卡片单选框</view>

  <t-radio-group class="horizontal-box" :value="radio1" @change="onChange1">
    <view v-for="(item, index) in 3" :key="index" :class="`card ${radio1 == index ? 'card--active' : ''}`">
      <icon v-if="radio1 == index" name="check" class="card__icon" />
      <t-radio :value="index" label="单选" icon="none" borderless />
    </view>
  </t-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';

const radio = ref(0);
const radio1 = ref(0);

const onChange = (value: any, context: { e: Event }) => {
  radio.value = value;
};

const onChange1 = (value: any, context: { e: Event }) => {
  radio1.value = value;
};
</script>
<style scoped lang="less">
.card {
  display: block;
  position: relative;
  margin: 16px;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1.5px solid #fff;
}

.card--active {
  border-color: #0052d9;
}

.card--active::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  border: 14px solid #0052d9;
  border-bottom-color: transparent;
  border-right-color: transparent;
}

.card__icon {
  display: block;
  color: #fff;
  position: absolute;
  left: 1.5px;
  top: 1.5px;
  z-index: 1;
  font-size: 14px;
}

/* 横向布局 */
.horizontal-box {
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  margin: 16px;
}

.horizontal-box .card {
  flex: 1;
  margin: 0;
}

.horizontal-box .card + .card {
  margin-left: 12px;
}
</style>
