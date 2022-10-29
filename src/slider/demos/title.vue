<template>
  <div class="flex">
    <p
      style="
         {
          width: 100;
        }
      "
    >
      选择器标题
    </p>
    <t-slider v-model="value" :label="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style>
.flex {
  display: flex;
  text-align: center;
  align-items: center;
}
</style>
