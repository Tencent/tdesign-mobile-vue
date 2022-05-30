<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="状态">
      <t-notice-bar visible theme="info" content="默认状态公告栏默认状态公告栏" />
      <t-notice-bar visible theme="success" content="成功状态公告栏成功状态公告栏" />
      <t-notice-bar visible theme="warning" content="警示状态公告栏警示状态公告栏" />
      <t-notice-bar visible theme="error" content="错误状态公告栏错误状态公告栏" />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
});
</script>
