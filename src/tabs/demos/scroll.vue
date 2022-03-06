<template>
  <div class="demo-tab-bar">
    <t-tabs active-name="1" @change="onChange">
      <t-tab-panel name="1" label="标签页一">
        <p>标签一内容区</p>
      </t-tab-panel>
      <t-tab-panel name="2" label="标签页二" :disabled="true">
        <p>标签二内容区</p>
      </t-tab-panel>
      <t-tab-panel name="3" label="标签页三">
        <p>标签三内容区</p>
      </t-tab-panel>
      <t-tab-panel name="4" label="标签页四">
        <p>标签四内容区</p>
      </t-tab-panel>
      <t-tab-panel name="5" label="标签页五">
        <p>标签五内容区</p>
      </t-tab-panel>
      <t-tab-panel name="6" label="标签页六">
        <p>标签六内容区</p>
      </t-tab-panel>
      <t-tab-panel name="7" label="标签页七">
        <p>标签七内容区</p>
      </t-tab-panel>
      <t-tab-panel name="8" label="标签页八">
        <p>标签八内容区</p>
      </t-tab-panel>
      <t-tab-panel name="9" label="标签页九">
        <p>标签九内容区</p>
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
.t-tabs {
  margin-bottom: 12px;
}
.demo-tab-bar {
  background-color: #f5f5f5;
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
