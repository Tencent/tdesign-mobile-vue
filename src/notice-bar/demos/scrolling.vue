<template>
  <div class="noticebar-demo">
    <tdesign-demo-block summary="滚动公告栏">
      <t-notice-bar
        marquee
        content="提示文字描述提示文字描述提示文字描述提示文字描述文提示文字描述提示文字"
        prefix-icon=""
        :visible="visible"
      >
      </t-notice-bar>
      <t-notice-bar visible marquee content="提示文字描述提示文字描述提示文字描述提示文字描述文提示文字描述提示文字" />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue';

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
