<template>
  <div class="button-group">
    <t-button
      v-bind="{
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        content: '半圆形返回顶部',
      }"
      @click="onClick('half-round', '返回顶部')"
    />
  </div>
  <div class="group">
    <t-skeleton v-for="i in 6" :key="i" :row-col="rowCols" class="item" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  container: {
    type: Function,
  },
  text: String,
  theme: String,
});
const emit = defineEmits(['update:text', 'update:theme']);

const rowCols = [
  {
    width: '165.5px',
    height: '165.5px',
    borderRadius: '12px',
  },
  {
    width: '100px',
  },
];
const onClick = (tem: string, txt: string) => {
  emit('update:text', txt);
  emit('update:theme', tem);
  props.container?.()?.scrollTo(0, 1200);
};
</script>

<style lang="less" scoped>
.button-group {
  padding: 0px 16px 16px;

  .t-button {
    margin-bottom: 10px;
  }
}
.group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 16px 30px 16px;
  .item {
    width: 47%;
    margin-bottom: 16px;
  }
}
</style>
