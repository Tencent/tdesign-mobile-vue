<template>
  <div class="demo-segmented-control">
    <div class="demo-segmented-control__wrap">
      <t-cell>
        <t-segmented-control v-model="defaultValue" :items="items.slice(0, 2)" @change="change"></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control v-model="defaultValue" :items="items.slice(0, 3)" @change="change"></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control v-model="defaultValue" :items="items" @change="change"></t-segmented-control>
      </t-cell>
    </div>
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

<style lang="less" scoped>
.t-cell {
  margin: 12px 0;
}
</style>
