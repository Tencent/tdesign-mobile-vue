<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item label="禁用菜单" disabled />
      <t-dropdown-item label="禁用选项" :options="optionsN" />
    </t-dropdown-menu>
    <p>禁用了序号是3的倍数的选项。</p>
  </demo-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DemoContainer from './demo-container.vue';

export default defineComponent({
  components: {
    DemoContainer,
  },
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
      disabled: (i + 1) % 3 === 0,
    }));
    const optionsN = ref(numberArr);
    return {
      optionsN,
    };
  },
});
</script>
