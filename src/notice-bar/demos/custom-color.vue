<template>
  <div class="noticebar-demo">
    <tdesign-demo-block summary="自定义样式">
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述"
        :prefix-icon="soundIcon"
        color="#fff"
        bg-color="gray"
      />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, h } from 'vue';
import { SoundIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      visible: true,
    });

    const soundIcon = () => h(SoundIcon);
    return {
      ...toRefs(state),
      soundIcon,
    };
  },
});
</script>
