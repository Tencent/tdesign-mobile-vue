<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">SwipeCell 滑动单元格</h1>
    <p class="summary">用来承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。</p>
    <tdesign-demo-block summary="左滑单操作">
      <t-swipe-cell>
        <t-cell title="列表-左滑单操作" note="辅助信息"></t-cell>
        <template #right>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="左滑双操作">
      <t-swipe-cell :right="initData.btns" @onClick="(value) => handleClickBtns(value)">
        <t-cell title="列表-左滑双操作" note="双操作"></t-cell>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="左滑多操作">
      <t-swipe-cell>
        <t-cell title="列表-左滑多操作" note="多操作"></t-cell>
        <template #right>
          <t-button theme="primary" shape="square" @click="handleClick">收藏</t-button>
          <t-button theme="warning" shape="square" @click="handleClick">编辑</t-button>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
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
    <tdesign-demo-block summary="右滑单操作">
      <t-swipe-cell>
        <t-cell title="列表-右滑单操作" note="辅助信息"></t-cell>
        <template #left>
          <t-button theme="primary" shape="square" @click="handleClick">选择</t-button>
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
    const initData = reactive({
      disabled: false,
      btns: [
        { content: '编辑', theme: 'warning' },
        { content: '删除', theme: 'danger' },
      ],
    });
    const handleClickBtns = (value: { action: { [key: string]: any }; source: String }) => {
      Toast(JSON.stringify(value));
    };
    const handleClick = () => {
      Toast('click');
    };
    return {
      initData,
      handleClick,
      handleClickBtns,
    };
  },
});
</script>
