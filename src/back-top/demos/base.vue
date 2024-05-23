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
  <div :style="{ ...style }">
    <t-back-top v-show="visible" :theme="theme" :text="text" :on-to-top="handleToTop" :target="target" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, h } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => {},
  },
  target: {
    type: Function,
  },
});
const emit = defineEmits(['close']);
const theme = ref('round');
const text = ref('顶部');

const icon = () => h(CloseIcon);

const onClick = (tem: string, txt: string) => {
  text.value = txt;
  theme.value = tem;
  emit('close');
  props.target().scrollTo(0, 1200);
};
function handleToTop() {
  console.log('handleToTop');
}
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;

  .t-button {
    margin-bottom: 10px;
  }
}
</style>
