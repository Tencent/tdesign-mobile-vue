<template>
  <t-navbar title="标题" left-icon :fixed="false" @left-click="handleClick" />
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('left-click');
};
</script>
