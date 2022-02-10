<template>
  <div class="tdesign-mobile-demo">
    <t-cell title="开关">
      <t-switch v-model="initData.disabled" @change="(value) => handleChange(value)"> </t-switch>
    </t-cell>
    <t-swipe-cell :disabled="initData.disabled">
      <t-cell :title="initData.disabled ? '禁止滑动' : '可以滑动'"></t-cell>
      <template #right>
        <t-button theme="primary" style="height: 100%" size="small">收藏</t-button>
        <t-button theme="danger" style="height: 100%" size="small">删除</t-button>
      </template>
    </t-swipe-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const initData = reactive({
      disabled: false,
    });
    const handleChange = (value: boolean) => {
      initData.disabled = value;
    };
    return {
      initData,
      handleChange,
    };
  },
});
</script>
