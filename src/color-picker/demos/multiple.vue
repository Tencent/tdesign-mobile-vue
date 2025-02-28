<template>
  <t-color-picker enable-alpha type="multiple" @change="onChange" @palette-bar-change="onPaletteBarChange" />
</template>

<script setup lang="ts">
const onChange = (val: string, context: { color: any; trigger: string }) => {
  console.log('change: ', val, context);
};
const onPaletteBarChange = (context: { color: any }) => {
  console.log('palette bar change: ', context);
};
</script>
