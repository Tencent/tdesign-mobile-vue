<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="01 类型" summary="静态消息公告栏">
      <t-notice-bar visible content="提示文字描述提示文字描述提示文字描述" prefix-icon="" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标静态公告栏">
      <t-notice-bar visible content="提示文字描述提示文字描述提示文字描述" />
    </tdesign-demo-block>

    <tdesign-demo-block summary="滚动公告栏">
      <t-notice-bar
        :marquee="{ loop: 1 }"
        content="提示文字描述提示文字描述提示文字描述提示文字描"
        prefix-icon=""
        :visible="visible"
      >
      </t-notice-bar>
      <t-notice-bar visible :marquee="{ loop: 1 }" content="提示文字描述提示文字描述提示文字描述提示文" />
    </tdesign-demo-block>

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

    <tdesign-demo-block summary="自定义样式">
      <t-notice-bar
        visible
        content="提示文字描述提示文字描述提示文字描述"
        :prefix-icon="soundIcon"
        color="#fff"
        bg-color="gray"
        icon-color="#fff"
      />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态">
      <t-notice-bar visible theme="info" content="默认状态公告栏默认状态公告栏" />
      <t-notice-bar visible theme="success" content="成功状态公告栏成功状态公告栏" />
      <t-notice-bar visible theme="warning" content="警示状态公告栏警示状态公告栏" />
      <t-notice-bar visible theme="error" content="错误状态公告栏错误状态公告栏" />
    </tdesign-demo-block>

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
    const state = reactive({
      visible: true,
    });

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
