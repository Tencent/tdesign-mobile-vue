<template>
  <div>
    <t-radio-group :default-value="radio" @change="groupChangeFn">
      <t-radio
        name="radio3"
        value="1"
        label="单选 H48"
        default-checked
        class="radio-demo radio-demo--size-small space"
      ></t-radio>
      <t-radio name="radio3" value="2" label="单选 H56" default-checked class="radio-demo"></t-radio>
    </t-radio-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('1');
const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>
<style scoped lang="less">
.radio-demo {
  background-color: #fff;

  &--size {
    &-small {
      padding: 12px 16px;
    }
  }
}

.space {
  margin-bottom: 16px;
}
</style>
