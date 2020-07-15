<template>
  <div class="notice-bar-base">
    <t-cell-group title="基础用法">
      <t-cell value-align="left">
        <t-notice-bar content="提示文字描述提示文字描述提示文字描述" />
        <t-notice-bar content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述" />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="模式">
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="text"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="default"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="link"
          @click="handleLinkNoticeBar"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="closeable"
          v-model="closeableVisible"
          @close="handleCloseableNoticeBar"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="detail"
          v-model="detailVisible"
          @close="handleDetailNoticeBar"
          @detail="handleDetail"
        />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="类型">
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述"
          type="info"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          type="error"
        />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="自定义样式">
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述"
          color="#FFFF00"
          bgColor="#000000"
          iconColor="#FFFF00"
        />

        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述"
          color="rgba(255, 255, 255, .6)"
          bgColor="#000000"
          iconColor="#FFFFFF"
          mode="link"
          leftIcon="circle_info"
        />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="自定义图标">
      <t-cell value-align="left">
        <t-notice-bar content="提示文字描述提示文字描述提示文字描述" leftIcon="apple" />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="滚动">
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述"
          leftIcon="sound"
          rightIcon="right"
          @click="handleClick"
        />

        <t-notice-bar
          mode="detail"
          content="提示文字描述"
          leftIcon="sound"
          rightIcon="right"
          @click="handleClick"
        />
        <t-notice-bar
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          leftIcon="sound"
          scrollable
          v-model="scrollVisible"
          @close="handleScrollNoticeBar"
        />
        <t-notice-bar
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          leftIcon="sound"
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
    };
  },
});
</script>
