<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="事件">
      <t-button @click="handleChange">显示/隐藏</t-button>
      <t-notice-bar
        :visible="visible"
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        extra="详情"
        :suffix-icon="iconFunc"
        @click="handleClick"
        @change="(value) => handleConsole(value)"
      />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, h } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { NoticeBarTrigger } from '../type';
import { Toast } from '@/components';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      visible: true,
    });

    const iconFunc = () => h(CloseIcon);
    const handleClick = (context: NoticeBarTrigger) => {
      Toast(`click:${context}`);
    };
    const handleChange = () => {
      state.visible = !state.visible;
    };
    const handleConsole = (value: boolean) => {
      console.log(value);
    };

    return {
      ...toRefs(state),
      iconFunc,
      handleClick,
      handleChange,
      handleConsole,
    };
  },
});
</script>
