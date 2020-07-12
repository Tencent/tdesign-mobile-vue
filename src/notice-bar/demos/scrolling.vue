<template>
  <div class="notice-bar-base">
    <t-cell-group title="公告栏 - 滚动">
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
          v-model="scrollVisible2"
          @close="handleScrollNoticeBar2"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    function handleClick() {
      alert('查看更多');
    }

    const scrollVisible = ref(true);

    function handleScrollNoticeBar() {
      scrollVisible.value = false;
    }

    const scrollVisible2 = ref(true);

    function handleScrollNoticeBar2() {
      scrollVisible2.value = false;
    }

    return {
      handleClick,
      scrollVisible,
      handleScrollNoticeBar,
      scrollVisible2,
      handleScrollNoticeBar2,
    };
  },
});
</script>
