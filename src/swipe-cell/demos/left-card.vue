<template>
  <div class="tdesign-mobile-demo">
    <tdesign-demo-block summary="左滑大列表">
      <t-swipe-cell>
        <t-cell title="左滑大列表" description="一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字">
          <template #leftIcon>
            <img
              src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
              style="width: 50px; height: 50px; margin-right: 8px; float: left"
            />
          </template>
        </t-cell>
        <template #right>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block style="margin-top: 10px">
      <t-swipe-cell expanded="right">
        <t-cell title="左滑大列表" description="一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字">
          <template #leftIcon>
            <img
              src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
              style="width: 50px; height: 50px; margin-right: 8px; float: left"
            />
          </template>
        </t-cell>
        <template #right>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Toast from '../../toast/index';

export default defineComponent({
  setup() {
    const handleClick = () => {
      Toast('click');
    };
    return {
      handleClick,
    };
  },
});
</script>
