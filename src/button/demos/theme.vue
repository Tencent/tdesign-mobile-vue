<template>
  <div class="section-theme">
    <div class="row">
      <t-button size="large">填充按钮</t-button>
      <t-button size="large" variant="outline">描边按钮</t-button>
      <t-button size="large" variant="dashed">虚框按钮</t-button>
      <t-button size="large" variant="text">文字按钮</t-button>
    </div>

    <div class="row">
      <t-button size="large" theme="primary">填充按钮</t-button>
      <t-button size="large" theme="primary" variant="outline">描边按钮</t-button>
      <t-button size="large" theme="primary" variant="dashed">虚框按钮</t-button>
      <t-button size="large" theme="primary" variant="text">文字按钮</t-button>
    </div>

    <div class="row">
      <t-button size="large" theme="danger">填充按钮</t-button>
      <t-button size="large" theme="danger" variant="outline">描边按钮</t-button>
      <t-button size="large" theme="danger" variant="dashed">虚框按钮</t-button>
      <t-button size="large" theme="danger" variant="text">文字按钮</t-button>
    </div>

    <div class="row">
      <t-button size="large" theme="light">填充按钮</t-button>
      <t-button size="large" theme="light" variant="outline">描边按钮</t-button>
      <t-button size="large" theme="light" variant="dashed">虚框按钮</t-button>
      <t-button size="large" theme="light" variant="text">文字按钮</t-button>
    </div>
  </div>
</template>

<style scoped>
.section-theme {
  overflow-y: auto;

  .row {
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .row:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
