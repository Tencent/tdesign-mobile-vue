<template>
  <div class="noticebar-demo">
    <t-cell value-align="left">
      <t-notice-bar content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述" mode="link" />
      <t-notice-bar content="提示文字描述提示文字描述" mode="link" @click="handleLinkNoticeBar" />
      <t-notice-bar
        v-model="closeableVisible"
        content="提示文字描述提示文字描述"
        mode="closeable"
        @close="handleCloseableNoticeBar"
      />
      <t-notice-bar
        v-model="detailVisible"
        content="提示文字描述提示文字描述"
        mode="detail"
        @close="handleDetailNoticeBar"
        @detail="handleDetail"
      />
    </t-cell>
    <t-cell value-align="left">
      <t-notice-bar
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        mode="link"
        type="error"
      />
      <t-notice-bar content="提示文字描述提示文字描述" mode="link" type="error" @click="handleLinkNoticeBar" />
      <t-notice-bar
        v-model="closeableVisible"
        content="提示文字描述提示文字描述"
        mode="closeable"
        type="error"
        @close="handleCloseableNoticeBar"
      />
      <t-notice-bar
        v-model="detailVisible"
        content="提示文字描述提示文字描述"
        mode="detail"
        type="error"
        @close="handleDetailNoticeBar"
        @detail="handleDetail"
      />
    </t-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    function handleLinkNoticeBar() {
      alert('查看更多');
    }

    const closeableVisible = ref(true);

    function handleCloseableNoticeBar() {
      closeableVisible.value = false;
    }

    const detailVisible = ref(true);

    function handleDetailNoticeBar() {
      detailVisible.value = false;
    }

    function handleDetail() {
      alert('详情');
    }

    return {
      handleLinkNoticeBar,
      closeableVisible,
      handleCloseableNoticeBar,
      detailVisible,
      handleDetailNoticeBar,
      handleDetail,
    };
  },
});
</script>

<style lang="less" scoped>
.noticebar-demo {
  background-color: #f5f5f5;

  .t-cell {
    background-color: transparent;
    padding: 0;
  }
}
</style>
