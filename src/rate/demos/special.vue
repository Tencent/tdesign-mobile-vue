<template>
  <CustomCell class="space">
    <t-rate v-model="value" size="30" />
    <div class="desc desc--{{value > 3 ? 'active' : ''}}">{{ texts[value - 1] }}</div>
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value = ref(4);
const texts = ref(['非常糟糕', '有些糟糕', '可以尝试', '可以前往', '推荐前往']);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
  flex-direction: column;

  .desc {
    text-align: center;
    margin-top: 12px;

    &--active {
      color: #ed7b2f;
      font-weight: 600;
    }
  }
}
</style>
