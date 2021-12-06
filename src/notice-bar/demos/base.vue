<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NoticeBar 公告栏</h1>
    <p class="summary">在导航栏下方，用于给用户显示提示消息</p>
    <tdesign-demo-block title="01 类型" summary="静态消息栏">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标静态消息栏">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述" :left-icon="iconFunc" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作消息栏">
      <t-notice-bar mode="link" content="提示文字描述提示文字描述提示文字描述" :left-icon="iconFunc" />
      <t-notice-bar mode="closeable" content="提示文字描述提示文字描述" detail-text="详情" :left-icon="iconFunc" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="滚动消息栏">
      <t-notice-bar mode="link" scrollable content="提示文字描述提示文字描述">
        <template #leftIcon>
          <icon name="error-circle-filled" />
        </template>
      </t-notice-bar>
      <t-notice-bar scrollable content="提示文字描述提示文字描述从右至左轮播从右至左轮">
        <template #leftIcon>
          <icon name="sound" />
        </template>
      </t-notice-bar>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="多文字消息栏">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述" />
      <t-notice-bar
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        :left-icon="iconFunc"
      />
      <t-notice-bar
        mode="link"
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述文字描述文字描述"
        :left-icon="iconFunc"
      />
      <t-notice-bar
        mode="closeable"
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        detail-text="详情"
        :left-icon="iconFunc"
      />
    </tdesign-demo-block>
    <tdesign-demo-block summary="红色背景消息栏">
      <t-notice-bar bg-color="#F9D7D9" color="#E34D59" content="提示文字描述提示文字描述提示文字描述" />
      <t-notice-bar
        bg-color="#F9D7D9"
        color="#E34D59"
        icon-color="#E34D59"
        content="提示文字描述提示文字描述提示文字描述"
        :left-icon="iconFunc"
      />
      <t-notice-bar
        bg-color="#F9D7D9"
        color="#E34D59"
        icon-color="#E34D59"
        content="提示文字描述提示文字描述提示文字描述"
        mode="link"
        :left-icon="iconFunc"
      />
      <t-notice-bar
        bg-color="#F9D7D9"
        color="#E34D59"
        icon-color="#E34D59"
        content="提示文字描述提示文字描述"
        detail-text="详情"
        mode="closeable"
        :left-icon="iconFunc"
      />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, ref, h } from 'vue';
import { Icon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { Icon },
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

    const iconFunc = () => h(ErrorCircleFilledIcon);

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
      iconFunc,
    };
  },
});
</script>
