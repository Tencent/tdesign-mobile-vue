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
import { Toast } from 'tdesign-mobile-vue';

export default defineComponent({
  setup() {
    return {
      showSuccess: () => Toast.success(),
      showFail: () => Toast.fail(),
      showLoading: () => Toast.loading(),
      showCustom: () => Toast({ icon: () => h(UserIcon) }),
    };
  },
});
</script>
