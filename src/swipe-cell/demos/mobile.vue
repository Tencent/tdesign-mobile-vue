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
    <tdesign-demo-block style="margin-top: 10px">
      <t-swipe-cell expanded="right">
        <t-cell title="列表-左滑单操作" note="辅助信息"></t-cell>
        <template #right>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="左滑双操作">
      <t-swipe-cell :right="initData.btns" @click="(value) => handleClickBtns(value)">
        <t-cell title="列表-左滑双操作" note="双操作"></t-cell>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block style="margin-top: 10px">
      <t-swipe-cell :right="initData.btns" expanded="right" @click="(value) => handleClickBtns(value)">
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
    <tdesign-demo-block style="margin-top: 10px">
      <t-swipe-cell expanded="right">
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
    <tdesign-demo-block summary="右滑单操作">
      <t-swipe-cell>
        <t-cell title="列表-右滑单操作" note="辅助信息"></t-cell>
        <template #left>
          <t-button theme="primary" shape="square" @click="handleClick">选择</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block style="margin-top: 10px">
      <t-swipe-cell expanded="left">
        <t-cell title="列表-右滑单操作" note="辅助信息"></t-cell>
        <template #left>
          <t-button theme="primary" shape="square" @click="handleClick">选择</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="通过expanded实现父子组件联动">
      <t-cell title="开关">
        <t-switch :value="initData.expanded === 'right'" @change="(value) => handleChangeSwitch(value)" />
      </t-cell>
      <t-swipe-cell :expanded="initData.expanded" @change="(value) => handleChange(value)">
        <t-cell title="父子组件联动" />
        <template #right>
          <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="通过直接传入内容或者使用 slot#content 来渲染">
      <t-swipe-cell>
        <template #content>
          <div style="padding: 10px">使用slot#content</div>
        </template>
        <div style="padding: 10px">直接写组件</div>
        <template #right>
          <div>
            <t-button type="primary" style="height: 100%">收藏</t-button>
          </div>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="是否启用滑动功能">
      <t-cell title="开关">
        <t-switch v-model="initData.disabled" @change="(value) => handleDisabledChange(value)"> </t-switch>
      </t-cell>
      <t-swipe-cell :disabled="initData.disabled">
        <t-cell :title="initData.disabled ? '禁止滑动' : '可以滑动'"></t-cell>
        <template #right>
          <t-button theme="primary" style="height: 100%" size="small">收藏</t-button>
          <t-button theme="danger" style="height: 100%" size="small">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <tdesign-demo-block summary="左右两侧都有菜单">
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
    </tdesign-demo-block>
    <tdesign-demo-block summary="点击事件">
      <t-swipe-cell :right="initData.btns" @click="handleClickBtns">
        <t-cell title="左右都有内容" note="辅助信息"></t-cell>
        <template #left>
          <t-button @click="handleClick">选择</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

interface InitData {
  disabled: boolean;
  btns: {}[];
  expanded: 'left' | 'right' | undefined;
}
const handleEdit = () => {
  Toast.success(`编辑成功`);
};

const handleDelete = () => {
  Toast.success(`删除成功`);
};

const initData: InitData = reactive({
  disabled: false,
  btns: [
    { text: '编辑', className: 't-button--primary', onClick: handleEdit },
    { text: '删除', className: 't-button--danger', onClick: handleDelete },
  ],
  expanded: 'right',
});
const handleClickBtns = (value: { action: SwipeActionItem; source: String }) => {
  Toast(JSON.stringify(value));
};
const handleClick = () => {
  Toast('click');
};
const handleChange = (value: InitData['expanded']) => {
  initData.expanded = value;
};

const handleDisabledChange = (value: InitData['disabled']) => {
  initData.disabled = value;
};

const handleChangeSwitch = (value: boolean) => {
  initData.expanded = value ? 'right' : undefined;
};
</script>
