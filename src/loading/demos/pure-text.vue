<template>
  <div>
    <t-loading :indicator="false" text="加载中..." />
    <t-loading theme="error" />
    <t-loading :indicator="false">
      <div class="custom-error">加载失败 <span>刷新</span></div>
    </t-loading>
  </div>
</template>

<script lang="ts"></script>
