<template>
  <div class="action-sheet-base">
    <t-cell>
      <t-button variant="outline" size="large" @click="visible = true">显示</t-button>
    </t-cell>
    <t-cell>
      <t-button variant="outline" size="large" @click="visible1 = true">隐藏取消选项</t-button>
    </t-cell>
    <t-cell>
      <t-button variant="outline" size="large" @click="visible2 = true">自定义颜色</t-button>
    </t-cell>
    <t-action-sheet v-model="visible" :items="items" @selected="handleSelected" @cancel="handleCancel" />
    <t-action-sheet
      v-model="visible1"
      :items="items"
      :show-cancel="false"
      @selected="handleSelected"
      @cancel="handleCancel"
    />
    <t-action-sheet v-model="visible2" :items="items1" @selected="handleSelected" @cancel="handleCancel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionSheetItem } from '../type';

export default defineComponent({
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      items: ['按钮一', '按钮二', { label: '失效按钮', disabled: true }, { label: '告警按钮', color: 'red' }],
      items1: [
        { label: '确定', color: '#0052d9' },
        { label: '删除', color: 'red' },
      ],
    };
  },
  methods: {
    handleSelected(selected: ActionSheetItem, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
  },
});
</script>
