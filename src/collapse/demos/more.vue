<template>
  <div class="accordion-demo">
    <!-- v-model:value="valueBase"  -->
    <t-collapse title="更多（默认全部展开）" default-expand-all>
      <t-collapse-panel name="demoCustom">
        <template #header
          >自定义标题<span style="color: #ccc; font-size: 12px; margin-left: 6px">自定义内容</span></template
        >
        <template #extra>
          <span style="color: red; font-size: 12px; margin-left: 6px; line-height: 1em">示例</span>
        </template>
        预设文本
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less">
.accordion-demo {
  background-color: #f9f9f9;
}
</style>
