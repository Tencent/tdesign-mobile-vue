<template>
  <div>
    <t-radio-group v-model="radio1" disabled :options="options" class="radio-group-demo space" />
    <t-radio-group v-model="radio2" class="radio-group-demo space" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" icon="stroke-line" disabled></t-radio>
      <t-radio name="radio" value="2" label="单选" icon="stroke-line" disabled></t-radio>
    </t-radio-group>
    <t-radio-group v-model="radio3" disabled class="radio-group-demo space" @change="groupChangeFn">
      <t-radio name="radio" value="1" label="单选" align="right"></t-radio>
      <t-radio name="radio" value="2" label="单选" align="right"></t-radio>
    </t-radio-group>
    <t-radio-group default-value="1" disabled class="radio-group-demo space" @change="groupChangeFn">
      <t-radio name="radio8" value="1" label="单选" align="right" icon="stroke-line"></t-radio>
      <t-radio name="radio8" value="2" label="单选" align="right" icon="stroke-line"></t-radio>
    </t-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('2');
const radio2 = ref('2');
const radio3 = ref('2');

const options = [
  {
    value: '1',
    label: '单选',
  },
  {
    value: '2',
    label: '单选',
  },
];

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};
</script>
<style scoped>
.radio-group-demo {
  background-color: #fff;
}
.space {
  margin-bottom: 16px;
}
</style>
