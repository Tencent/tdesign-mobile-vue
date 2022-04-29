<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="visible属性">
      <t-notice-bar :visible="visible" content="提示文字描述提示文字描述提示文字描述" prefix-icon="" />
    </tdesign-demo-block>
    <tdesign-demo-block title="v-model属性">
      <t-notice-bar v-model="visible" content="提示文字描述提示文字描述提示文字描述" prefix-icon="" />
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
