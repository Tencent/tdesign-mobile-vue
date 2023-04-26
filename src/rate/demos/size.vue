<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">大尺寸 24</div>
    <t-rate v-model="value1" variant="filled" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">小尺寸 20</div>
    <t-rate v-model="value" variant="filled" size="20" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3);
const value1 = ref(3);
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
