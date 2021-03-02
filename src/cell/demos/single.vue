<template>
  <div class="cell-base">
    <t-cell label="单行标题" />
    <t-cell label="单行标题">
      <TIconChevronRight />
    </t-cell>
    <t-cell label="单行标题" value="辅助信息" link></t-cell>
    <t-cell>
      <template #leftIcon>
        <TIconUserFilled />
      </template>
      <template #label>
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
