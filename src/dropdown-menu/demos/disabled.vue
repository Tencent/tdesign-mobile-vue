<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item label="禁用" disabled />
      <t-dropdown-item label="禁用" disabled />
      <t-dropdown-item label="禁用" disabled />
      <t-dropdown-item label="禁用" disabled />
    </t-dropdown-menu>
  </demo-container>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item label="禁用菜单" disabled />
      <t-dropdown-item label="禁用菜单" disabled />
      <t-dropdown-item label="禁用菜单" disabled />
    </t-dropdown-menu>
  </demo-container>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item label="禁用菜单" disabled />
      <t-dropdown-item label="禁用菜单" disabled :options="optionsN" />
    </t-dropdown-menu>
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
    const emptyArr = new Array(8).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
      disabled: true,
    }));
    const optionsN = ref(numberArr);
    return {
      optionsN,
    };
  },
});
</script>
