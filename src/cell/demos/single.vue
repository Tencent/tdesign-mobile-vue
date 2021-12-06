<template>
  <div class="cell-base">
    <t-cell title="单行标题" />
    <t-cell title="单行标题">
      <t-icon-chevron-right />
    </t-cell>
    <t-cell title="单行标题" note="辅助信息" arrow></t-cell>
    <t-cell>
      <template #leftIcon>
        <t-icon-user-filled />
      </template>
      <template #title>
        <span>单行标题</span>
      </template>
    </t-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TIconChevronRight from '@/icon/chevron-right.vue';
import TIconUserFilled from '@/icon/user-filled.vue';

export default defineComponent({
  components: { TIconChevronRight, TIconUserFilled },
});
</script>
