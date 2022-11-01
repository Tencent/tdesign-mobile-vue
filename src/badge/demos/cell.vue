<template>
  <div>
    <t-cell-group style="overflow: hidden">
      <t-cell title="单行标题" arrow>
        <template #note>
          <t-badge dot></t-badge>
        </template>
      </t-cell>
      <t-cell title="单行标题" arrow>
        <template #note>
          <t-badge count="16"></t-badge>
        </template>
      </t-cell>
      <t-cell title="单行标题" arrow>
        <template #note>
          <t-badge count="NEW" shape="round" />
          <t-badge count="NEW" style="margin-left: 8px" />
        </template>
      </t-cell>
      <t-cell title="单行标题">
        <template #note>
          <t-badge shape="ribbon" count="NEW"></t-badge>
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>
