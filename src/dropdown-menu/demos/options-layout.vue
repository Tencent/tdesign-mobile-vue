<template>
  <div :class="`${name}`">
    <t-dropdown-menu>
      <t-dropdown-item
        title="两栏菜单"
        :options="optionsN"
        selectMode="multi"
        optionsLayout="columns"
        optionsColumns="2"
        v-model="valueM1"
      />
      <t-dropdown-item
        title="三栏菜单"
        :options="optionsC"
        selectMode="multi"
        optionsLayout="columns"
        optionsColumns="3"
        v-model="valueM2"
      />
    </t-dropdown-menu>
    <p>
      两栏菜单 选中项:
      <strong>{{valueM1.join(', ')}}</strong>
    </p>
    <p>
      三栏菜单 选中项:
      <strong>{{valueM2.join(', ')}}</strong>
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

const componentName = 'dropdown-menu';
const name = `${componentName}-demo`;

export default defineComponent({
  name,
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
    }));
    const charArr = emptyArr.map((_, i) => {
      const char = String.fromCharCode(65 + i);
      return {
        title: `选项 ${char}`,
        value: `options_${char}`,
      };
    });
    const optionsN = ref(numberArr);
    const optionsC = ref(charArr);
    const valueM1 = ref(['options_A', 'options_C']);
    const valueM2 = ref([]);
    return {
      name,
      log: (...args: []) => {
        console.log(...args);
      },
      optionsN,
      optionsC,
      valueM1,
      valueM2,
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
