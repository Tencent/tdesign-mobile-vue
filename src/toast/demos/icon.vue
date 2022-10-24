<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="showSuccess">成功</t-button>
    <t-button theme="primary" @click="showFail">警告</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="showLoading">加载</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="showCustom">自定义图标</t-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const showSuccess = () => Toast.success();
const showFail = () => Toast.fail();
const showLoading = () => Toast.loading();
const showCustom = () => Toast({ icon: () => h(UserIcon) });
</script>
