<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Form 表单</h1>
    <p class="summary">用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。</p>
    <t-sticky>
      <div class="form-demo-sticky">
        <t-tabs v-model="layout" theme="tag" :sticky-props="{ disabled: true }">
          <t-tab-panel value="horizontal" label="水平排布" />
          <t-tab-panel value="vertical" label="竖向排布" />
        </t-tabs>
        <t-cell title="禁用态">
          <t-switch v-model="disabled" />
        </t-cell>
      </div>
    </t-sticky>
    <tdesign-demo-block title="01 组件类型" summary="基础表单">
      <baseDemo :label-align="labelAlign" :disabled="disabled" />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="提示">
      <helpDemo :label-align="labelAlign" :disabled="disabled" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="校验规则">
      <rulesDemo :label-align="labelAlign" :disabled="disabled" />
    </tdesign-demo-block>
    <template v-if="isHorizontal">
      <tdesign-demo-block title="03 组件样式" summary="标签对齐样式">
        <labelAlignDemo :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签带冒号">
        <colonDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签必填位置">
        <requiredMarkDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签宽度">
        <labelWidthDemo :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签内容对齐样式">
        <contentAlignDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
    </template>
    <template v-else>
      <tdesign-demo-block title="03 组件样式" summary="标签必填位置">
        <requiredMarkDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签带冒号">
        <colonDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
      <tdesign-demo-block summary="标签内容对齐样式">
        <contentAlignDemo :label-align="labelAlign" :disabled="disabled" />
      </tdesign-demo-block>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import './style/index.less';
import baseDemo from './base.vue';
import helpDemo from './help.vue';
import rulesDemo from './rules.vue';
import labelAlignDemo from './label-align.vue';
import colonDemo from './colon.vue';
import requiredMarkDemo from './required-mark.vue';
import labelWidthDemo from './label-width.vue';
import contentAlignDemo from './content-align.vue';

const layout = ref('horizontal');
const disabled = ref(false);

const isHorizontal = computed(() => layout.value === 'horizontal');
const labelAlign = computed(() => (isHorizontal.value ? 'left' : 'top'));
</script>
