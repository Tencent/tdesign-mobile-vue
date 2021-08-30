<template>
  <div class="cell-base">
    <t-cell title="单行标题" />
    <t-cell title="单行标题">
      <TIconChevronRight />
    </t-cell>
    <t-cell title="单行标题" note="辅助信息" arrow></t-cell>
    <t-cell>
      <template #leftIcon>
        <TIconUserFilled />
      </template>
      <template #title>
        <span>单行标题</span>
      </template>
    </t-cell>
  </div>
</template>

<script lang="ts">
import TIconChevronRight from '@/icon/chevron-right.vue';
import TIconUserFilled from '@/icon/user-filled.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { TIconChevronRight, TIconUserFilled },
});
</script>
