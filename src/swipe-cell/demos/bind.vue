<template>
  <div class="tdesign-mobile-demo">
    <tdesign-demo-block summary="通过opened实现父子组件联动">
      <t-cell title="开关">
        <t-switch :value="initData.opened" @change="(value) => handleChangeSwitch(value)" />
      </t-cell>
      <t-swipe-cell :opened="initData.opened" @change="(value) => handleChange(value)">
        <t-cell title="父子组件联动" />
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

interface InitData {
  opened: boolean | [boolean, boolean];
}
export default defineComponent({
  setup() {
    const initData: InitData = reactive({
      opened: false,
    });
    const handleClick = () => {
      Toast('click');
    };
    const handleChange = (value: boolean | [boolean, boolean]) => {
      initData.opened = value;
    };
    const handleChangeSwitch = (value: boolean | [boolean, boolean]) => {
      initData.opened = value;
    };
    return {
      initData,
      handleClick,
      handleChange,
      handleChangeSwitch,
    };
  },
});
</script>
