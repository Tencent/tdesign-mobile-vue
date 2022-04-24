<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="01 类型" summary="静态消息公告栏">
      <t-notice-bar v-model="visible" content="提示文字描述提示文字描述提示文字描述" prefix-icon="" />
      <t-notice-bar :visible="visible" content="提示文字描述提示文字描述提示文字描述" prefix-icon="" />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, h } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      visible: true,
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
