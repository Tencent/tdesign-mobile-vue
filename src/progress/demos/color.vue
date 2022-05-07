<template>
  <div>
    <tdesign-demo-block title="02 状态" summary="默认状态">
      <div class="progress-demo">
        <t-progress :percentage="88" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度状态发生重大错误">
      <div class="progress-demo">
        <t-progress :percentage="88" status="error" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度中止">
      <div class="progress-demo">
        <t-progress :percentage="88" status="warning" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度完成">
      <div class="progress-demo">
        <t-progress :percentage="100" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="过渡样式">
      <div class="progress-demo">
        <t-progress :percentage="percentage" />
        <div class="button-group">
          <t-button theme="primary" variant="outline" size="small" @click="clickReduce">减少</t-button>
          <div class="space"></div>
          <t-button theme="primary" size="small" @click="clickAdd">增加</t-button>
        </div>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ColorDemo',
  setup() {
    const customPercentage = ref(88);
    const percentage = ref(88);

    function clickAdd() {
      percentage.value = Math.min(100, percentage.value + 10);
    }

    function clickReduce() {
      percentage.value = Math.max(0, percentage.value - 10);
    }

    return {
      customPercentage,
      percentage,
      clickAdd,
      clickReduce,
    };
  },
});
</script>
<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
  .button-group {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    .space {
      width: 16px;
    }
  }
}
</style>
