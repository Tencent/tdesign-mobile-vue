<template>
  <div>
    <t-cell-group title="基础分段器">
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items.slice(0,2)"
          @change="change"
        ></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items.slice(0,3)"
          @change="change"
        ></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items"
          @change="change"
        ></t-segmented-control>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="分段器多选">
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items.slice(0,2)"
          is-multiple
          @change="change"
        ></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items.slice(0,3)"
          is-multiple
          @change="change"
        ></t-segmented-control>
      </t-cell>
      <t-cell>
        <t-segmented-control
          v-model="defaultValue"
          :items="items"
          is-multiple
          @change="change"
        ></t-segmented-control>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const defaultValue = ref([null]);
    watch(defaultValue, (newValue) => {
      console.log(`当前值为：${newValue}`);
    });
    const change = (value) => {
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
