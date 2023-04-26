<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">带描述评分</div>
    <t-rate v-model="value1" show-text :texts="texts" variant="filled" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">带描述评分</div>
    <t-rate v-model="value2" show-text variant="filled" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">带描述评分</div>
    <t-rate v-model="value3" show-text variant="filled" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(3);
const value2 = ref(5);
const value3 = ref(0);
const texts = ref(['很差', '差', '一般', '好评', '优秀']);
</script>

<style lang="less" scoped>
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
