<template>
  <div class="noticebar-demo">
    <t-cell-group>
      <t-cell value-align="left">
        <t-notice-bar
          v-model="scrollVisible"
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          :left-icon="() => SoundIcon"
          scrollable
          @close="handleScrollNoticeBar"
        />
        <t-notice-bar
          mode="closeable"
          content="提示文字描述提示文字描述提示文字描述提示文字描述"
          :left-icon="() => SoundIcon"
          scrollable
          type="error"
          :delay="2"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SoundIcon } from 'tdesign-icons-vue-next';

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
      SoundIcon,
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
