<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Textarea 多行文本框</h1>
    <p class="summary">用于多行文本的输入</p>
    <tdesign-demo-block title="01 类型" summary="基础多行文本框">
      <t-textarea placeholder="请输入文字"></t-textarea>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自动增高多行文本框">
      <t-textarea name="标签文字" placeholder="请输入文字" autosize />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="禁用多行文本框">
      <t-textarea name="标签文字" placeholder="请输入文字" value="不可编辑文字" disabled />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 字符限制" summary="设置最大字符个数">
      <t-textarea name="标签文字" placeholder="请输入文字" :maxlength="10" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置最大字符个数，一个汉字表示两个字符">
      <t-textarea name="标签文字" placeholder="请输入文字" :maxcharacter="10" />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup></script>
