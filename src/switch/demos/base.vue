<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Switch 开关</h1>
    <p class="summary">开关用于切换当个设置项的状态，开启、关闭为两个互斥的操作</p>
    <tdesign-demo-block title="01 类型" summary="基础开关">
      <t-cell-group>
        <t-cell title="开关">
          <template #note>
            <t-switch v-model="checked" @change="onChange"> </t-switch>
          </template>
        </t-cell>
        <t-cell title="开关">
          <template #note>
            <t-switch @change="onChange"> </t-switch>
          </template>
        </t-cell>
        <t-cell title="自定义颜色">
          <template #note>
            <t-switch
              :default-value="true"
              :colors="['rgba(0,0,0,0.26)', 'rgba(0,168,112,1)']"
              @change="onChange"
            ></t-switch>
          </template>
        </t-cell>
        <t-cell title="异步操作">
          <template #note>
            <t-switch v-model="checked" @change="onChange"> </t-switch>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述信息开关">
      <t-cell-group>
        <t-cell title="开关">
          <template #note>
            <t-switch v-model="value" label="描述信息"> </t-switch>
          </template>
        </t-cell>
        <t-cell title="开关">
          <template #note>
            <t-switch label="描述信息"> </t-switch>
          </template>
        </t-cell>
        <t-cell title="自定义颜色">
          <template #note>
            <t-switch v-model="checked" :colors="['rgba(0,0,0,0.26)', 'rgba(0,168,112,1)']" label="描述信息">
            </t-switch>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="开关状态">
      <t-cell-group>
        <t-cell title="开关开启禁用">
          <template #note>
            <t-switch v-model="value" disabled> </t-switch>
          </template>
        </t-cell>
        <t-cell title="开关关闭禁用">
          <template #note>
            <t-switch disabled></t-switch>
          </template>
        </t-cell>
        <t-cell title="开关开启禁用">
          <template #note>
            <t-switch v-model="value" disabled label="描述信息"> </t-switch>
          </template>
        </t-cell>
        <t-cell title="开关关闭禁用">
          <template #note>
            <t-switch label="描述信息" disabled></t-switch>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(true);
    const disabledValue = ref(true);
    const checked = ref(true);
    function onChange($event: string | number | boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      disabledValue,
      checked,
      onChange,
    };
  },
});
</script>
