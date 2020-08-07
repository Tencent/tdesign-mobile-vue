<template>
  <div :class="`${name}`">
    <t-dropdown-menu>
      <t-dropdown-item
        title="单选菜单"
        :options="optionsN"
        selectMode="multi"
        optionsLayout="columns"
        optionsColumns="2"
        v-model="valueS"
        @change="log('[menu select] item: ', $event)"
        @open="log('[menu open] menu item 2N')"
        @opened="log('[menu opened] menu item 2N')"
        @close="log('[menu close] menu item 2N')"
        @closed="log('[menu closed] menu item 2N')"
      />
      <t-dropdown-item
        title="多选菜单"
        :options="optionsC"
        selectMode="multi"
        optionsLayout="columns"
        optionsColumns="3"
        v-model="valueM"
        @change="log('[menu select] item: ', $event)"
        @open="log('[menu open] menu item 2C')"
        @opened="log('[menu opened] menu item 2C')"
        @close="log('[menu close] menu item 2C')"
        @closed="log('[menu closed] menu item 2C')"
      />
    </t-dropdown-menu>
    <p>
      单选菜单 选中项:
      <strong>{{valueS}}</strong>
    </p>
    <p>
      多选菜单 选中项:
      <strong>{{valueM.join(', ')}}</strong>
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
    const valueS = ref('option_2');
    const valueM = ref(['options_A', 'options_C']);
    return {
      name,
      log: (...args: []) => {
        console.log(...args);
      },
      optionsN,
      optionsC,
      valueS,
      valueM,
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
