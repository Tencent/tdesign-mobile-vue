<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="showSuccess">成功</t-button>
    <t-button theme="primary" @click="showFail">失败</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="showLoading">加载</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="showCustom">自定义图标</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import Toast from '../index';

export default defineComponent({
  setup() {
    return {
      showSuccess: () => Toast.success('成功'),
      showFail: () => Toast.fail('失败'),
      showLoading: () => Toast.loading('加载'),
      showCustom: () => Toast({ icon: () => h(UserIcon), message: '自定义图标' }),
    };
  },
});
</script>
