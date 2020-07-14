<template>
  <div class="notice-bar-base">
    <t-cell-group>
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
          @click="handleClick"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function handleClick() {
      alert('查看更多详情');
    }
    return {
      handleClick,
    };
  },
});
</script>
