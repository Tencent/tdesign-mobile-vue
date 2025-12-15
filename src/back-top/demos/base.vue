<template>
  <div class="button-group">
    <t-button
      v-bind="{
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        content: '圆形返回顶部',
      }"
      @click="onClick('round', '顶部')"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  container: {
    type: Function,
  },
  text: String,
  theme: String,
});

const emit = defineEmits(['update:text', 'update:theme']);

const onClick = (tem: string, txt: string) => {
  emit('update:text', txt);
  emit('update:theme', tem);
  props.container?.()?.scrollTo(0, 1200);
};
</script>

<style lang="less" scoped>
.button-group {
  padding: 0 16px;

  .t-button {
    margin-bottom: 10px;
  }
}
</style>
