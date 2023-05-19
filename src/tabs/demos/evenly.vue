<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first">
        <template #label>
          <div>选项</div>
        </template>
      </t-tab-panel>
      <t-tab-panel value="second">
        <template #label>选项</template>
      </t-tab-panel>
    </t-tabs>
    <t-tabs default-value="0">
      <t-tab-panel value="0" label="选项" />
      <t-tab-panel value="1" label="选项" />
      <t-tab-panel value="2" label="选项" />
    </t-tabs>
    <t-tabs default-value="first" :sticky="true" :sticky-props="stickyProps" @change="onChange">
      <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
    <t-tabs default-value="1" @change="onNextChange">
      <t-tab-panel v-for="(item, index) in tabPanelsNext" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
const stickyProps = {
  zIndex: 999,
};
const tabPanels = [
  {
    value: 'first',
    label: '选项',
  },
  {
    value: 'second',
    label: '选项',
  },
  {
    value: 'third',
    label: '选项',
  },
  {
    value: 'four',
    label: '选项',
  },
];

const tabPanelsNext = [
  {
    value: '1',
    label: '选项',
  },
  {
    value: '2',
    label: '选项',
  },
  {
    value: '3',
    label: '选项',
  },
  {
    value: '4',
    label: '选项',
  },
  {
    value: '5',
    label: '选项',
  },
];
const onChange = ($event: number, label: string) => {
  console.log(`change to ${$event}`, label);
};

const onNextChange = ($event: number) => {
  console.log(`changeNext to ${$event}`);
};
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}
</style>
