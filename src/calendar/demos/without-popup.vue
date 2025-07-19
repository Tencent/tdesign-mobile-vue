<template>
  <t-calendar :use-popup="false" type="multiple" title="日历标题" @select="handleSelect" />
</template>

<script lang="ts" setup>
const handleSelect = (val: any) => {
  console.log(val);
};
</script>
