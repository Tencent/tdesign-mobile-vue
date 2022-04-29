<template>
  <div class="noticebar-demo">
    <t-cell-group>
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述"
          color="#FFFF00"
          bg-color="#000000"
          icon-color="#FFFF00"
        />

        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述"
          color="rgba(255, 255, 255, .6)"
          bg-color="#000000"
          icon-color="#FFFFFF"
          mode="link"
          :left-icon="() => TIconErrorCircleFilled"
          @click="handleClick"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ErrorCircleFilledIcon as TIconErrorCircleFilled } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    function handleClick() {
      alert('查看更多详情');
    }
    return {
      handleClick,
      TIconErrorCircleFilled,
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
