<template>
  <div>
    <t-tag theme="primary">重要</t-tag>
    <t-tag theme="danger">危险</t-tag>
    <t-tag theme="warning">警告</t-tag>
    <t-tag theme="success">成功</t-tag>
    <t-tag theme="info">信息</t-tag>
  </div>
</template>
<style>
  .t-tag + .t-tag {
    margin-left: 8px;
  }
</style>
