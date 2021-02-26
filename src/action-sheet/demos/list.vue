<template>
  <div class="action-sheet-base">
    <t-cell value-align="left">
      <t-button theme="primary" @click="visible = true">列表型</t-button>
    </t-cell>
    <t-action-sheet v-model="visible" :items="items" @select="handleSelect" @cancel="handleCancel" />
    <t-action-sheet
      v-model="visible1"
      :items="items"
      :show-cancel="false"
      @select="handleSelect"
      @cancel="handleCancel"
    />
    <t-action-sheet v-model="visible2" :items="items1" @select="handleSelect" @cancel="handleCancel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ItemType } from '../action-sheet.interface';

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
    handleSelect(selected: ItemType, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
  },
});
</script>
