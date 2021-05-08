<template>
  <div class="demo-tab-bar">
    <t-cell-group title="横向选项卡">
      <t-tabs active-name="first" @change="onChange">
        <t-tab-panel name="first" label="标签页一">
        </t-tab-panel>
        <t-tab-panel name="second" label="标签页二">
        </t-tab-panel>
      </t-tabs>
      <t-tabs active-name="first" @change="onChange">
        <t-tab-panel name="first" label="标签页一">
        </t-tab-panel>
        <t-tab-panel name="second" label="标签页二">
        </t-tab-panel>
        <t-tab-panel name="third" label="标签页三">
        </t-tab-panel>
      </t-tabs>
      <t-tabs active-name="first" @change="onChange">
        <t-tab-panel name="first" label="标签页一">
          <p>标签一内容区</p>
        </t-tab-panel>
        <t-tab-panel name="second" label="标签页二">
          <p>标签二内容区</p>
        </t-tab-panel>
        <t-tab-panel name="third" label="标签页三">
          <p>标签三内容区</p>
        </t-tab-panel>
        <t-tab-panel name="four" label="标签页四">
          <p>标签四内容区</p>
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
    <t-cell-group title="横向可滑动选项卡">
      <t-tabs active-name="1" :scrollable="true" @change="onChange">
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
    </t-cell-group>
    <t-cell-group title="竖向选项卡">
      <t-tabs active-name="1" direction="horizontal"
              @change="onChange" >
        <t-tab-panel name="1" label="标签页一">
          <p>标签一内容区</p>
        </t-tab-panel>
        <t-tab-panel name="2" label="标签页二">
          <p>标签二内容区</p>
        </t-tab-panel>
        <t-tab-panel name="3" label="标签页三">
          <p>标签三内容区</p>
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
    <t-cell-group title="竖向可滑动选项卡">
      <t-tabs active-name="1" :scrollable="true"
              direction="horizontal" @change="onChange">
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
      </t-tabs>
    </t-cell-group>
  </div>
</template>

<script lang='ts'>
import config from '@/config';
import { defineComponent } from 'vue';
const { prefix } = config;
const name = `${prefix}-tabs-demo`;
export default defineComponent({
  name,
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
.demo-tab-bar{
  background-color: #fff;
}
.t-tabs {
    margin-bottom: 12px;
}
.t-tabs__panel p{
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgba(#000000, .16);
}
.t-tabs--horizontal{
  height: 270px;
}
.t-tabs--horizontal .t-tabs__panel p{
  height: 270px;
}
</style>
