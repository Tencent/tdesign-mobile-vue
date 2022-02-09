<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">SwipeCell</h1>
    <p class="summary">用来包裹dom元素，实现左滑、或右滑弹出隐藏的操作按钮</p>
    <!-- content -->
    <tdesign-demo-block summary="使用children或者slot来渲染组件显示内容">
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
    <!-- disabled -->
    <tdesign-demo-block summary="disabled">
      <t-cell title="开关">
        <t-switch v-model="initData.disabled" @change="(value) => handleChange(value)"> </t-switch>
      </t-cell>
      <t-swipe-cell :disabled="initData.disabled">
        <t-cell :title="initData.disabled ? '禁止滑动' : '可以滑动'"></t-cell>
        <template #right>
          <t-button theme="primary" style="height: 100%" size="small">收藏</t-button>
          <t-button theme="danger" style="height: 100%" size="small">删除</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
    <!-- left -->
    <tdesign-demo-block summary="通过props传入左侧菜单">
      <t-swipe-cell :left="initData.btns">
        <t-cell title="左侧有菜单"></t-cell>
      </t-swipe-cell>
    </tdesign-demo-block>
    <!-- right -->
    <tdesign-demo-block summary="通过props传入右侧菜单">
      <t-swipe-cell :right="initData.btns">
        <t-cell title="右侧有菜单"></t-cell>
      </t-swipe-cell>
    </tdesign-demo-block>
    <!-- opened -->
    <tdesign-demo-block summary="通过slot向左右两边分别传入菜单，通过ref来获取菜单的打开、收回的状态">
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
    </tdesign-demo-block>
    <!-- onClick -->
    <tdesign-demo-block summary="click点击事件">
      <t-swipe-cell :right="initData.btns" @onClick="(value) => handleClick(value)">
        <t-cell title="左右都有菜单" note="辅助信息"></t-cell>
        <template #left>
          <t-button @click="handleClickLeft">选择</t-button>
        </template>
      </t-swipe-cell>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Toast from '../../toast/index';

export default defineComponent({
  setup() {
    const swipeRef = ref<HTMLElement>();
    const initData = reactive({
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
      initData,
      swipeRef,
      handleClick,
      handleShowOpened,
      handleClickLeft,
      handleChange,
    };
  },
});
</script>
