<template>
  <t-calendar :use-popup="false" type="multiple" @select="handleSelect" />
</template>

<script lang="ts" setup>
const handleSelect = (val: any) => {
  console.log(val);
};
</script>
