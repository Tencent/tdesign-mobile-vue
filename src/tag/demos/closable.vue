<template>
  <t-tag v-if="show1" closable variant="light" @click="onClickClose(1)">文字标签</t-tag>
  <t-tag v-if="show2" closable variant="outline" @click="onClickClose(2)">文字标签</t-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show1 = ref(true);
const show2 = ref(true);
function onClickClose(index: number) {
  if (index === 1) {
    show1.value = false;
  }
  if (index === 2) {
    show2.value = false;
  }
}
</script>
