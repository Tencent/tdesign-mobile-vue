<template>
  <div class="row">
    <t-button size="large" theme="light">填充按钮</t-button>
    <t-button size="large" theme="primary">填充按钮</t-button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
