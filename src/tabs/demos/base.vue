<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tabs 选项卡</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器</p>
    <tdesign-demo-block title="01 类型" summary="横向选项卡">
      <t-tabs :value="currentValue" @on-change="onChange">
        <t-tab-panel value="first" label="标签页一"> <p>标签一内容区</p></t-tab-panel>
        <t-tab-panel value="second" label="标签页二"><p>标签二内容区</p> </t-tab-panel>
      </t-tabs>
      <t-tabs value="first" @on-change="onChange">
        <t-tab-panel value="first" label="标签页一"><p>标签一内容区</p> </t-tab-panel>
        <t-tab-panel value="second" label="标签页二"><p>标签二内容区</p> </t-tab-panel>
        <t-tab-panel value="third" label="标签页三"> <p>标签三内容区</p></t-tab-panel>
      </t-tabs>
      <t-tabs value="first" @on-change="onChange">
        <t-tab-panel value="first" label="标签页一">
          <p>标签一内容区</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="标签页二">
          <p>标签二内容区</p>
        </t-tab-panel>
        <t-tab-panel value="third" label="标签页三">
          <p>标签三内容区</p>
        </t-tab-panel>
        <t-tab-panel value="four" label="标签页四">
          <p>标签四内容区</p>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
    <tdesign-demo-block summary="超过屏幕滑动">
      <t-tabs value="1" @on-change="onChange">
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
        <t-tab-panel value="5" label="标签页五">
          <p>标签五内容区</p>
        </t-tab-panel>
        <t-tab-panel value="6" label="标签页六">
          <p>标签六内容区</p>
        </t-tab-panel>
        <t-tab-panel value="7" label="标签页七">
          <p>标签七内容区</p>
        </t-tab-panel>
        <t-tab-panel value="8" label="标签页八">
          <p>标签八内容区</p>
        </t-tab-panel>
        <t-tab-panel value="9" label="标签页九">
          <p>标签九内容区</p>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
    <tdesign-demo-block summary="无下划线">
      <t-tabs value="1" :show-bottom-line="false" @on-change="onChange">
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
        <t-tab-panel value="5" label="标签页五">
          <p>标签五内容区</p>
        </t-tab-panel>
        <t-tab-panel value="6" label="标签页六">
          <p>标签六内容区</p>
        </t-tab-panel>
        <t-tab-panel value="7" label="标签页七">
          <p>标签七内容区</p>
        </t-tab-panel>
        <t-tab-panel value="8" label="标签页八">
          <p>标签八内容区</p>
        </t-tab-panel>
        <t-tab-panel value="9" label="标签页九">
          <p>标签九内容区</p>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
    <tdesign-demo-block summary="运动时间可调整">
      <t-tabs value="1" :animation="animation" @on-change="onChange">
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
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="选项卡状态">
      <t-tabs value="first">
        <t-tab-panel value="first" label="标签页一">
          <p>标签一内容区</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="标签页二">
          <p>标签二内容区</p>
        </t-tab-panel>
        <t-tab-panel value="third" :disabled="true" label="标签页三">
          <p>标签三内容区</p>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 特殊类型" summary="竖向选项卡">
      <t-tabs value="2" placement="left" @on-change="onChange">
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
        <t-tab-panel value="5" label="标签页五">
          <p>标签五内容区</p>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="选中态文字尺寸规格">
      <t-tabs value="1" size="large" @on-change="onChange">
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
      <t-tabs value="1" size="medium" @on-change="onChange">
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
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-tabs-demo`;
export default defineComponent({
  name,
  setup() {
    const onChange = (value) => {
      console.log(`onChange to ${value}`);
    };
    const animation = { duration: 500 };
    const currentValue = ref('first');
    return {
      onChange,
      currentValue,
      animation,
    };
  },
});
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 20px;
}
.t-tabs__panel p {
  height: 86px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: rgba(#000000, 0.16);
  margin: 0;
}
.t-tabs.t-is-left,
.t-tabs.t-is-right {
  height: 270px;
  .t-tabs__panel p {
    height: 270px;
  }
}
</style>
