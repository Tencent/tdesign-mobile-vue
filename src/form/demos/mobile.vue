<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Form 表单</h1>
    <p class="summary">用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</p>
    <tdesign-demo-block title="01 基础类型" summary="基础表单">
      <div class="option">
        <div class="button-group">
          <t-button :theme="isActive1 ? 'light' : 'default'" shape="round" @click="onClick('isActive1', isActive1)">
            水平排布
          </t-button>
          <t-button :theme="isActive2 ? 'light' : 'default'" shape="round" @click="onClick('isActive2', isActive2)">
            竖直排布
          </t-button>
        </div>
        <t-cell title="禁用态">
          <template #note>
            <t-switch :value="switchValue" @change="onChangeSwitch"></t-switch>
          </template>
        </t-cell>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block v-if="isActive1">
      <horizontal :disabled="switchValue" />
    </tdesign-demo-block>
    <tdesign-demo-block v-if="isActive2">
      <vertical :disabled="switchValue" />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import horizontal from './horizontal.vue';
import vertical from './vertical.vue';

const isActive1 = ref(true);
const isActive2 = ref(false);

const onClick = (name: string, isActive: boolean) => {
  if (name === 'isActive1') {
    isActive1.value = !isActive;
    isActive2.value = isActive;
  } else {
    isActive1.value = isActive;
    isActive2.value = !isActive;
  }
};

const switchValue = ref(false);
const onChangeSwitch = (val: any) => {
  switchValue.value = val;
};
</script>

<style lang="less" scoped>
.option {
  margin-bottom: 12px;
}
.button-group {
  background-color: var(--bg-color-demo, #fff);
  box-sizing: border-box;
  padding: 8px 4px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid #e7e7e7;

  .t-button {
    height: 32px;
    flex: 1;

    &:not(:last-child) {
      flex: 1;
      margin-right: 8px;
    }
  }
}
</style>
