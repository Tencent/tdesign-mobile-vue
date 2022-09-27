<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="1" size="large">
      <t-tab-panel value="1" label="大尺寸">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="2" label="标签页二">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel value="3" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
    </t-tabs>
    <t-tabs default-value="1" size="medium">
      <t-tab-panel value="1" label="小尺寸">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="2" label="标签页二">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel value="3" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

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
