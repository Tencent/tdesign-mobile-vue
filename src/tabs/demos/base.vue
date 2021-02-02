<template>
  <div class="demo-tab-bar">
    <t-cell-group title="横向选项卡">
      <t-tabs active-name="second" @change="onChange">
        <t-tab-panel name="first" label="选项卡1">
          <p style="padding: 25px;">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel name="second" label="选项卡2">
          <p style="padding: 25px;">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel name="third" label="选项卡3" :force-render="true">
          <p style="padding: 25px;">选项卡3</p>
        </t-tab-panel>
      </t-tabs>
      <t-tabs active-name="first" @change="onChange">
        <t-tab-panel name="first" label="选项卡1">
          <p style="padding: 25px;">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel name="second" label="选项卡2">
          <p style="padding: 25px;">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel name="third" label="选项卡3">
          <p style="padding: 25px;">选项卡3</p>
        </t-tab-panel>
        <t-tab-panel name="four" label="选项卡4">
          <p style="padding: 25px;">选项卡4</p>
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
    <t-cell-group title="横向可滑动选项卡">
      <t-tabs active-name="1" :scrollable="true" @change="onChange">
        <t-tab-panel name="1" label="选项卡1">
          <p style="padding: 25px;">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel name="2" label="选项卡2" :disabled="true">
          <p style="padding: 25px;">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel name="3" label="选项卡3">
          <p style="padding: 25px;">选项卡3</p>
        </t-tab-panel>
        <t-tab-panel name="4" label="选项卡4">
          <p style="padding: 25px;">选项卡4</p>
        </t-tab-panel>
        <t-tab-panel name="5" label="选项卡5">
          <p style="padding: 25px;">选项卡5</p>
        </t-tab-panel>
        <t-tab-panel name="6" label="选项卡6">
          <p style="padding: 25px;">选项卡6</p>
        </t-tab-panel>
        <t-tab-panel name="7" label="选项卡7">
          <p style="padding: 25px;">选项卡7</p>
        </t-tab-panel>
        <t-tab-panel name="8" label="选项卡8">
          <p style="padding: 25px;">选项卡8</p>
        </t-tab-panel>
        <t-tab-panel name="9" label="选项卡9">
          <p style="padding: 25px;">选项卡9</p>
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
    <t-cell-group title="竖向选项卡">
      <t-tabs active-name="1" direction="horizontal"
              @change="onChange" >
        <t-tab-panel name="1" label="选项卡1">
          <p style="padding: 25px;">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel name="2" label="选项卡2">
          <p style="padding: 25px;">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel name="3" label="选项卡3">
          <p style="padding: 25px;">选项卡3</p>
        </t-tab-panel>
      </t-tabs>
    </t-cell-group>
    <t-cell-group title="竖向可滑动选项卡">
      <t-tabs active-name="1" :scrollable="true"
              direction="horizontal" style="height: 200px" @change="onChange">
        <t-tab-panel name="1" label="选项卡1">
          <p style="padding: 25px;">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel name="2" label="选项卡2" :disabled="true">
          <p style="padding: 25px;">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel name="3" label="选项卡3">
          <p style="padding: 25px;">选项卡3</p>
        </t-tab-panel>
        <t-tab-panel name="4" label="选项卡4">
          <p style="padding: 25px;">选项卡4</p>
        </t-tab-panel>
        <t-tab-panel name="5" label="选项卡5">
          <p style="padding: 25px;">选项卡5</p>
        </t-tab-panel>
        <t-tab-panel name="6" label="选项卡6">
          <p style="padding: 25px;">选项卡6</p>
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
  background-color: #fbfbfb;
}

</style>
