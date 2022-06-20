<template>
  <div class="noticebar-demo">
    <tdesign-demo-block summary="带图标静态公告栏">
      <t-notice-bar visible content="提示文字描述提示文字描述提示文字描述" />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, h } from 'vue';

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
