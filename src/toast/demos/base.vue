<template>

  <div class='tdesign-mobile-demo'>
    <h1 class='title'>Toast 轻提示</h1>
    <p class='summary'>一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title='01 类型' summary='基础提示'>
      <div class='toast-demo'>
        <t-button size="large" variant="outline" @click="showText(text1)">纯文本</t-button>
        <t-button size="large" variant="outline" @click="showText(text2)">带图标-横向</t-button>
        <t-button size="large" variant="outline" @click="showText(text2)">带图标-竖向</t-button>
        <t-button size="large" variant="outline" @click="showText(text2)">纯文本最大高度</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary='默认提示'>
      <div class='toast-demo'>
        <t-button size="large" variant="outline" @click="showSuccessRow(success)">成功-横向</t-button>
        <t-button size="large" variant="outline" @click="showFailRow(fail)">警告-横向</t-button>
        <t-button size="large" variant="outline" @click="showSuccess(success)">成功-竖向</t-button>
        <t-button size="large" variant="outline" @click="showFail(fail)">警告-竖向</t-button>
        <t-button size="large" variant="outline" @click="showLoading('加载中...')">加载</t-button>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import Toast from '../index';
import config from '@/config';
import { ToastPositionType } from '../toast.interface';

const { prefix } = config;
const name = `${prefix}-toast-base-demo`;

export default defineComponent({
  setup() {
    return {
      name: ref(name),
    };
  },
  data() {
    return {
      text1: '轻提示内容',
      text2: '最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字',
      success: '成功文案',
      fail: '失败文案',
      loading: '加载',
      custom: '自定义图标',
    };
  },
  methods: {
    showText(message?: string) {
      Toast(message);
    },
    showSuccess(message?: string) {
      Toast.success(message);
    },
    showFail(message?: string) {
      Toast.fail(message);
    },
    showSuccessRow(message?: string) {
      Toast({
        type: 'success',
        direction: 'row',
        message,
      });
    },
    showFailRow(message?: string) {
      Toast({
        type: 'fail',
        direction: 'row',
        message,
      });
    },
    showCustom(message?: string) {
      Toast({
        icon: UserIcon,
        message,
      });
    },
    showLoading(message?: string) {
      Toast({
        type: 'loading',
        message,
      });
    },
    showPosition(position: ToastPositionType) {
      Toast({
        type: 'success',
        position,
      });
    },
    showMask() {
      Toast({
        showOverlay: true,
        message: this.text1,
      });
    },
  },
});
</script>
