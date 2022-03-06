<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="1" placement="left" @on-change="onChange">
      <t-tab-panel value="1" label="标签页一">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel value="2" label="标签页二">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel value="3" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
      <t-tab-panel value="4" label="标签页四">
        <p>标签四内容区</p>
      </t-tab-panel>
    </t-tabs>
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
.t-tabs--left {
  height: 270px;
}
.t-tabs--left .t-tabs__panel p {
  height: 270px;
}
</style>
