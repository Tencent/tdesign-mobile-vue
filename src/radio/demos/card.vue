<template>
  <div>
    <t-radio-group v-model="radio" class="theme-card" @change="groupChangeFn">
      <t-radio name="radio3" value="1" label="单选" />
      <t-radio name="radio3" value="2" label="单选" />
      <t-radio name="radio3" value="4" label="单选标题多行单选标题多行单选标题多行单选标题多行单选标题多行" />
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

<style>
.theme-card {
  border-radius: 12px;
  margin: 16px;
  overflow: hidden;
}
</style>
