<template>
  <div class="tdesign-mobile-demo">
    <t-swipe-cell>
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

const initData = reactive({
  showDialog: false,
  disabled: false,
});
const handleClick = (value: { action: SwipeActionItem; source: String }) => {
  Toast(JSON.stringify(value));
};
const handleClickLeft = () => {
  Toast('click');
};
</script>
