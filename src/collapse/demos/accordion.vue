<template>
  <div class="accordion-demo">
    <t-collapse title="手风琴模式" expand-mutex>
      <t-collapse-panel v-for="i in 3" :key="i" :value="i" header="折叠面板标题">
        <div class="content">
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </div>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<style scoped lang="less">
.content {
  padding: 16px 0;
}
</style>
