<template>
  <div class="noticebar-demo">
    <tdesign-demo-block summary="带操作公告栏">
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述"
        :suffix-icon="arrowRight"
        @click="handleClick"
      />
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述"
        extra="详情"
        :suffix-icon="iconFunc"
        @click="handleClick"
      />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue';
import { NoticeBarTrigger } from '../type';
import { Toast } from '@/components';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({});

    const handleClick = (context: NoticeBarTrigger) => {
      Toast(`click:${context}`);
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>
