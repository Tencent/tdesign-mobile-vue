<template>
  <div class="tdesign-mobile-demo">
    <t-swipe-cell :right="initData.btns" @click="handleClick">
      <t-cell title="左右都有内容" note="辅助信息"></t-cell>
      <template #left>
        <t-button @click="handleClickLeft">选择</t-button>
      </template>
    </t-swipe-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Toast from '../../toast/index';

export default defineComponent({
  setup() {
    const initData = reactive({
      btns: [
        { content: '删除', theme: 'danger' },
        { content: '收藏', theme: 'default' },
      ],
    });
    const handleClick = (value: { action: { [key: string]: any }; source: String }) => {
      Toast(JSON.stringify(value));
    };
    const handleClickLeft = () => {
      Toast('click');
    };
    return {
      handleClick,
      handleClickLeft,
      initData,
    };
  },
});
</script>
