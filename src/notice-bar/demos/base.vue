<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NoticeBar 公告栏</h1>
    <p class="summary">在导航栏下方，用于给用户显示提示消息</p>
    <tdesign-demo-block title="01 类型" summary="静态消息栏">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标静态消息栏">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述" :leftIcon="() => TIconErrorCircleFilled" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作消息栏">
      <t-notice-bar mode="link" content="提示文字描述提示文字描述提示文字描述" />
      <t-notice-bar mode="closeable" content="提示文字描述提示文字描述提示文字描述" />
    </tdesign-demo-block>
    <t-cell-group title="带操作消息栏">
      <t-cell value-align="left">
        <t-notice-bar content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述" mode="link" />
        <t-notice-bar content="提示文字描述提示文字描述" mode="link" type="error" @click="handleLinkNoticeBar" />
        <t-notice-bar
          v-model="closeableVisible"
          content="提示文字描述提示文字描述"
          mode="detail"
          @close="handleCloseableNoticeBar"
        />
        <t-notice-bar
          v-model="detailVisible"
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示"
          mode="detail"
          @close="handleDetailNoticeBar"
          @detail="handleDetail"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          mode="link"
          type="error"
        />
        <t-notice-bar content="提示文字描述提示文字描述" mode="link" type="error" @click="handleLinkNoticeBar" />
        <t-notice-bar
          v-model="closeableVisible"
          content="提示文字描述提示文字描述"
          mode="detail"
          type="error"
          @close="handleCloseableNoticeBar"
        />
        <t-notice-bar
          v-model="detailVisible"
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示"
          mode="detail"
          type="error"
          @close="handleDetailNoticeBar"
          @detail="handleDetail"
        />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="滚动消息栏">
      <t-cell value-align="left">
        <t-notice-bar
          v-model="scrollVisible"
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          :left-icon="() => TIconSoundFilled"
          scrollable
          @close="handleScrollNoticeBar"
        />
        <t-notice-bar
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          :left-icon="() => TIconSoundFilled"
          scrollable
          type="error"
          :delay="2"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, ref } from 'vue';
import TIconSoundFilled from '@/icon/sound-filled.vue';
import TIconErrorCircleFilled from '@/icon/error-circle-filled.vue';

export default defineComponent({
  setup() {
    const state = reactive({
      visible: true,
    });

    function handleClick() {
      console.log('handleClick base');
    }

    function handleLinkNoticeBar() {
      alert('查看更多');
    }

    const closeableVisible = ref(true);
    function handleCloseableNoticeBar() {
      console.log('handleCloseableNoticeBar start');
      closeableVisible.value = false;
      // state.visible = false;
      console.log('handleCloseableNoticeBar end');
    }

    const detailVisible = ref(true);

    function handleDetail() {
      alert('详情');
    }

    function handleDetailNoticeBar() {
      console.log('handleDetailNoticeBar');
      detailVisible.value = false;
    }

    const scrollVisible = ref(true);
    function handleScrollNoticeBar() {
      scrollVisible.value = false;
    }

    return {
      ...toRefs(state),
      handleClick,
      handleLinkNoticeBar,
      closeableVisible,
      handleCloseableNoticeBar,
      detailVisible,
      handleDetail,
      handleDetailNoticeBar,
      scrollVisible,
      handleScrollNoticeBar,
      TIconSoundFilled,
      TIconErrorCircleFilled,
    };
  },
});
</script>
