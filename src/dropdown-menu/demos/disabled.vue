<template>
  <div :class="`${name}`">
    <t-dropdown-menu>
      <t-dropdown-item title="禁用菜单" disabled />
      <t-dropdown-item title="禁用选项" :options="optionsN" />
    </t-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const componentName = 'dropdown-menu';
const name = `${componentName}-demo`;

export default defineComponent({
  name,
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
      disabled: (i + 1) % 3 === 0,
    }));
    const optionsN = ref(numberArr);
    return {
      name,
      optionsN,
    };
  },
});
</script>
<style lang="less" scoped>
.dropdown-menu-demo {
  position: relative;
  background: #fff;
  transform: translate(0, 0);
  height: 400px;
  padding: 1px 0;
}
p {
  font-size: 14px;
  line-height: 1.4;
  margin: 1em .5em;
}
</style>
