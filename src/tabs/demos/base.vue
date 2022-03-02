<template>
  <div class="demo-tab-bar">
    <t-cell-group title="横向选项卡" :border="false">
      <t-tabs default-value="first" @on-change="onChange">
        <t-tab-panel value="first" label="标签页一"> </t-tab-panel>
        <t-tab-panel value="second" label="标签页二"> </t-tab-panel>
      </t-tabs>
      <t-tabs default-value="first" @on-change="onChange">
        <t-tab-panel value="first" label="标签页一"> </t-tab-panel>
        <t-tab-panel value="second" label="标签页二"> </t-tab-panel>
        <t-tab-panel value="third" label="标签页三"> </t-tab-panel>
      </t-tabs>
      <t-tabs default-value="first" @on-change="onChange">
        <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label">
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    return {
      onChange,
      tabPanels: [
        {
          value: 'first',
          panel: '标签一内容区',
          label: '标签页一',
        },
        {
          value: 'second',
          panel: '标签二内容区',
          label: '标签页二',
        },
        {
          value: 'third',
          panel: '标签三内容区',
          label: '标签页三',
        },
        {
          value: 'four',
          panel: '标签四内容区',
          label: '标签页四',
        },
      ],
    };
  },
});
</script>

<style lang="less" scoped>
.demo-tab-bar {
  background-color: #f5f5f5;
}
.t-tabs {
  margin-bottom: 12px;
}
.t-tabs__panel p {
  height: 86px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgba(#000000, 0.16);
  margin: 0;
}
.t-tabs--horizontal {
  height: 270px;
}
.t-tabs--horizontal .t-tabs__panel p {
  height: 270px;
}
</style>
