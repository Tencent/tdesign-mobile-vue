<template>
  <div class="tdesign-mobile-demo">
    <t-swipe-cell ref="swipeRef">
      <t-cell title="左右都有菜单"></t-cell>
      <template #left>
        <t-button theme="theme">选择</t-button>
      </template>
      <template #right>
        <div>
          <t-button theme="theme">收藏</t-button>
          <t-button theme="danger">删除</t-button>
        </div>
      </template>
    </t-swipe-cell>
    <t-button size="small" @click="handleShowOpened">输出菜单的状态</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Toast from '../../toast/index';

export default defineComponent({
  setup() {
    const swipeRef = ref<HTMLElement>();
    const initData = reactive({
      showDialog: false,
      disabled: false,
      btns: [
        { content: '删除', theme: 'danger' },
        { content: '收藏', theme: 'default' },
      ],
    });
    const handleChange = (value: boolean) => {
      initData.disabled = value;
    };
    const handleClick = (value: { action: { [key: string]: any }; source: String }) => {
      Toast(JSON.stringify(value));
    };
    const handleShowOpened = () => {
      Toast(swipeRef.value.initData.opened.toString());
    };
    const handleClickLeft = () => {
      Toast('click');
    };
    return {
      swipeRef,
      handleClick,
      handleShowOpened,
      handleClickLeft,
      initData,
      handleChange,
    };
  },
});
</script>
