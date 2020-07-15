<template>
  <div class="notice-bar-base">
    <t-cell-group>
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
