<template>
  <t-input label="标签文字" placeholder="请输入文字" />

  <t-input placeholder="请输入文字">
    <template #label>
      <div class="custom-label">标签文字</div>
    </template>
  </t-input>

  <t-input placeholder="请输入文字" />
</template>

<style>
.custom-label {
  display: inline-flex;
}

.custom-label::after {
  content: '*';
  color: #d54941;
  font-size: 16px;
  margin-left: 4px;
}
</style>
