<template>
  <div class="tdesign-mobile-demo">
    <t-swipe-cell :right="initData.btns">
      <t-cell title="右侧有菜单"></t-cell>
    </t-swipe-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const initData = reactive({
      btns: [
        { text: '删除', theme: 'danger' },
        { text: '收藏', theme: 'default' },
      ],
    });
    return {
      initData,
    };
  },
});
</script>
