<template>
  <t-checkbox-group v-model:value="value">
    <div v-for="n in 3" :key="n" :class="`card ${value.indexOf(n) > -1 ? 'card--active' : value.indexOf(n)}`">
      <t-icon v-if="value.indexOf(n) > -1" :aria-hidden="true" class="card__icon" name="check" />
      <t-checkbox :value="n" borderless content="描述信息描述信息描述信息描述信息描述信息" icon="none" label="多选" />
    </div>
  </t-checkbox-group>

  <div class="tdesign-mobile-demo-block__summary" style="margin-left: 16px; margin-top: 24px">横向卡片多选框</div>

  <t-checkbox-group v-model:value="value1" borderless class="horizontal-box">
    <div v-for="n in 3" :key="n" :class="`card ${value1.indexOf(n) > -1 ? 'card--active' : value1.indexOf(n)}`">
      <t-icon v-if="value1.indexOf(n) > -1" :aria-hidden="true" class="card__icon" name="check" />
      <t-checkbox :value="n" icon="none" label="多选" />
    </div>
  </t-checkbox-group>
</template>
<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

const value = ref([1, 2]);
const value1 = ref([1, 2]);
</script>
<style lang="less" scoped>
@import '../../_common/style/mobile/_variables';

.card {
  position: relative;
  margin: 16px;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1.5px solid var(--bg-color-demo, #fff);
}

.card--active {
  border-color: @brand-color;
}

.card--active::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  border: 14px solid @brand-color;
  border-bottom-color: transparent;
  border-right-color: transparent;
}

.card__icon {
  color: #fff;
  position: absolute;
  left: 1.5px;
  top: 1.5px;
  z-index: 1;
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

.horizontal-box .card::after {
  border-width: 12px;
}

.horizontal-box .card__icon {
  font-size: 12px;
}
</style>
