<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first">
        <template #label> <div>标签页一</div> </template>
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="second">
        <template #label> 标签页二 </template>
        <p>标签二内容区</p>
      </t-tab-panel>
    </t-tabs>
    <t-tabs default-value="0">
      <t-tab-panel value="0" label="标签页一">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="1" label="标签页二">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel value="2" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
    </t-tabs>
    <t-tabs default-value="first" :sticky-props="stickyProps" @change="onChange">
      <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label">
        <p>{{ item.panel }}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
const stickyProps = {
  disabled: false,
};
const tabPanels = [
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
];
const onChange = ($event: number) => {
  console.log(`change to ${$event}`);
};
</script>

<style lang="less" scoped>
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
</style>
