<template>
  <div>
    <t-calendar v-model="visible">
      <template #head>
        自定义标题
      </template>
    </t-calendar>
    <t-cell title="选择日期" note="请选择日期" arrow @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const visible = ref(false)
</script>

<style lang='scss' scoped>

</style>
