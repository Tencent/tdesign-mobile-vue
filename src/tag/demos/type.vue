<template>
  <tdesign-demo-block title="01 组件类型" summary="基础标签">
    <div class="tag-demo">
      <t-tag variant="light">标签文字 </t-tag>
      <t-tag variant="outline">标签文字</t-tag>
    </div>
  </tdesign-demo-block>
  <tdesign-demo-block summary="圆弧标签">
    <div class="tag-demo">
      <t-tag variant="light" shape="round">标签文字</t-tag>
      <t-tag variant="outline" shape="round">标签文字</t-tag>
      <t-tag variant="outline" shape="mark">标签文字</t-tag>
    </div>
  </tdesign-demo-block>
  <tdesign-demo-block summary="带图标的标签">
    <div class="tag-demo">
      <t-tag variant="light" icon="discount"> 标签文字 </t-tag>
      <t-tag variant="outline" icon="discount"> 标签文字 </t-tag>
    </div>
  </tdesign-demo-block>
  <tdesign-demo-block summary="超长文本省略标签">
    <div class="tag-demo">
      <t-tag max-width="130px" variant="light">听说超长可以省略听说超长</t-tag>
    </div>
  </tdesign-demo-block>
</template>
