<template>
  <div class="tdesign-mobile-demo">
      <h1 class="title">SegmentedControl 分段器</h1>
      <tdesign-demo-block title="01 类型" summary="两列分段器">
        <div class="segmented-control-demo">
          <t-segmented-control v-model="defaultValue" :items="items.slice(0, 2)" @change="change"></t-segmented-control>
        </div>
      </tdesign-demo-block>
      <tdesign-demo-block summary="两列分段器">
        <div class="segmented-control-demo">
          <t-segmented-control v-model="defaultValue" :items="items.slice(0, 3)" @change="change"></t-segmented-control>
        </div>
      </tdesign-demo-block>
      <tdesign-demo-block summary="两列分段器">
        <div class="segmented-control-demo">
          <t-segmented-control v-model="defaultValue" :items="items" @change="change"></t-segmented-control>
        </div>
      </tdesign-demo-block>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { ModelValueProps } from '../segmented-control.interface';
export default defineComponent({
  setup() {
    const defaultValue = ref('item_1');
    watch(defaultValue, (newValue) => {
      console.log(`当前值为：${newValue}`);
    });
    const change = (value: ModelValueProps) => {
      console.log(`值已改变为：${value}`);
    };
    return {
      defaultValue,
      change,
      items: [
        {
          value: 'item_1',
          text: '项目一',
        },
        {
          value: 'item_2',
          text: '项目二',
        },
        {
          value: 'item_3',
          text: '项目三',
        },
        {
          value: 'item_4',
          text: '项目四',
        },
      ],
    };
  },
});
</script>

