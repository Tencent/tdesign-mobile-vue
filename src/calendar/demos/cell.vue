<template>
  <div>
    <t-calendar v-model="visible">
     <template #cell="{item}">
       <div style="text-align: center">
        {{item}}
       </div>
       <div>
        描述
       </div>
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
