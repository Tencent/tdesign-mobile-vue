<template>
  <div class="tdesign-mobile-demo">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Toast from '../../toast/index';

interface InitData {
  expanded: 'left' | 'right' | '';
}
export default defineComponent({
  setup() {
    const initData: InitData = reactive({
      expanded: 'right',
    });
    const handleClick = () => {
      Toast('click');
    };
    const handleChange = (value: InitData['expanded']) => {
      initData.expanded = value;
    };
    const handleChangeSwitch = (value: boolean) => {
      initData.expanded = value ? 'right' : '';
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
