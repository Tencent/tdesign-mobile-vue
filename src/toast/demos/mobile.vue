<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Toast 轻提示</h1>
    <p class="summary">一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 类型" summary="基础提示">
      <div class="toast-demo">
        <t-button size="large" variant="outline" @click="showText(text1)">纯文本</t-button>
        <t-button size="large" variant="outline" @click="showWithIcon(text1, 'row')">带图标-横向</t-button>
        <t-button size="large" variant="outline" @click="showWithIcon(text1, 'column')">带图标-竖向</t-button>
        <t-button size="large" variant="outline" @click="showText(text2)">纯文本最大高度</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="默认提示">
      <div class="toast-demo">
        <t-button size="large" variant="outline" @click="showSuccessRow(success)">成功-横向</t-button>
        <t-button size="large" variant="outline" @click="showFailRow(fail)">警告-横向</t-button>
        <t-button size="large" variant="outline" @click="showSuccess(success)">成功-竖向</t-button>
        <t-button size="large" variant="outline" @click="showFail(fail)">警告-竖向</t-button>
        <t-button size="large" variant="outline" @click="showLoading('加载中...')">加载</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 展示位置和展示时间" summary="弹窗展示位置为顶部、中部、底部三种，展示时间可自定义">
      <div class="toast-demo">
        <t-button size="large" variant="outline" @click="showPosition('top')">顶部Top</t-button>
        <t-button size="large" variant="outline" @click="showPosition('middle')">中间Middle</t-button>
        <t-button size="large" variant="outline" @click="showPosition('bottom')">底部Bottom</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 显示遮罩" summary="弹窗可显示遮罩，禁止滑动和点击">
      <div class="toast-demo">
        <t-button size="large" variant="outline" @click="showOverlay">禁止滑动和点击</t-button>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, h, defineComponent } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import Toast from '../index';

import { TdToastProps } from '../type';

export default defineComponent({
  setup() {},
  data() {
    return {
      text1: '轻提示文字内容',
      text2: '最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字',
      success: '成功文案',
      fail: '失败文案',
      loading: '加载',
      custom: '自定义图标',
    };
  },
  methods: {
    showText(message: string) {
      Toast(message);
    },
    showSuccess(message?: string) {
      Toast({
        theme: 'success',
        direction: 'column',
        message,
      });
    },
    showFail(message: string) {
      Toast({
        theme: 'fail',
        direction: 'column',
        message,
      });
    },
    showSuccessRow(message: string) {
      Toast({
        theme: 'success',
        direction: 'row',
        message,
      });
    },
    showFailRow(message: string) {
      Toast({
        theme: 'fail',
        direction: 'row',
        message,
      });
    },
    showWithIcon(message: string, direction: any) {
      Toast({
        icon: () => h(UserIcon),
        direction,
        duration: 10000,
        message,
      });
    },
    showCustom(message?: string) {
      Toast({
        icon: () => h(UserIcon),
        message,
      });
    },
    showLoading(message: string) {
      Toast({
        theme: 'loading',
        message,
      });
    },
    showPosition(placement: TdToastProps['placement']) {
      Toast({ placement, message: '轻提示内容' });
    },
    showOverlay() {
      Toast({ theme: 'loading', message: '加载中...', preventScrollThrough: true });
    },
  },
});
</script>
