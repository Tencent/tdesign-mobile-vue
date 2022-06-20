<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Textarea 多行文本框</h1>
    <p class="summary">用于多行文本的输入</p>
    <tdesign-demo-block title="01 类型" summary="基础多行文本框">
      <t-textarea placeholder="请输入文字"></t-textarea>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带标题多行文本框">
      <t-textarea name="标签文字" label="标签文字" placeholder="请输入文字" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自动增高多行文本框">
      <t-textarea name="标签文字" placeholder="请输入文字" autosize>
        <template #label>
          <div>标签文字</div>
        </template>
      </t-textarea>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="禁用多行文本框">
      <t-textarea name="标签文字" label="标签文字" placeholder="请输入文字" value="不可编辑文字" disabled />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 字符限制" summary="设置最大字符个数">
      <t-textarea name="标签文字" label="标签文字" placeholder="请输入文字" :maxlength="20" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置最大字符个数，一个汉字表示两个字符">
      <t-textarea name="标签文字" label="标签文字" placeholder="请输入文字" :maxcharacter="10" />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 事件" summary="带事件文本框">
      <t-textarea
        v-model="value"
        name="标签文字"
        label="标签文字"
        placeholder="请输入文字"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const onFocus = (value, e) => {
      console.log('onFocus: ', value, e);
    };
    const onBlur = (value, e) => {
      console.log('onBlur: ', value, e);
    };
    const onChange = (val: string) => {
      console.log('change: ', val);
    };

    return {
      value,
      onFocus,
      onBlur,
      onChange,
    };
  },
});
</script>
