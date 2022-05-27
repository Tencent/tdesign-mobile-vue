<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="03 多行文字公告栏">
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        prefix-icon=""
      />
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        @click="handleClick"
      />
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述文字描述文字描述"
        :suffix-icon="arrowRight"
        @click="handleClick"
      />
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        extra="详情"
        :suffix-icon="iconFunc"
        @click="handleClick"
      />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, h } from 'vue';
import { CloseIcon, ChevronRightIcon, SoundIcon } from 'tdesign-icons-vue-next';
import { NoticeBarTrigger } from '../type';
import { Toast } from '@/components';

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({});
    const iconFunc = () => h(CloseIcon);
    const arrowRight = () => h(ChevronRightIcon);
    const soundIcon = () => h(SoundIcon);
    const handleClick = (context: NoticeBarTrigger) => {
      Toast(`click:${context}`);
    };
    return {
      ...toRefs(state),
      iconFunc,
      arrowRight,
      soundIcon,
      handleClick,
    };
  },
});
</script>
