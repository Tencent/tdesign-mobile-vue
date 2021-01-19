<template>
  <div class="action-sheet-base">
    <t-cell-group title="基础用法">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible = true">显示</t-button>
        <t-button theme="primary" style="margin-left: 8px" @click="visible1 = true">隐藏取消选项</t-button>
        <t-button theme="primary" style="margin-left: 8px" @click="visible2 = true">自定义颜色</t-button>
      </t-cell>
    </t-cell-group>
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
    handleSelect(selected, selectedIndex) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
  },
});
</script>
