<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item v-model="valueS" label="单列" :options="optionsN" select-mode="multi" options-columns="1" />
      <t-dropdown-item
        v-model="valueM1"
        label="双列"
        :options="optionsN"
        select-mode="multi"
        options-layout="columns"
        options-columns="2"
      />
      <t-dropdown-item
        v-model="valueM2"
        label="三列"
        :options="optionsC"
        select-mode="multi"
        options-layout="columns"
        options-columns="3"
      />
    </t-dropdown-menu>
    <p>
      单列菜单 选中项:
      <strong>{{ valueS.join(', ') }}</strong>
    </p>
    <p>
      两栏菜单 选中项:
      <strong>{{ valueM1.join(', ') }}</strong>
    </p>
    <p>
      三栏菜单 选中项:
      <strong>{{ valueM2.join(', ') }}</strong>
    </p>
  </demo-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
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
    const valueM1 = ref([]);
    const valueS = ref([]);
    const valueM2 = ref(['options_A', 'options_C']);
    return {
      log: (...args: []) => {
        console.log(...args);
      },
      optionsN,
      optionsC,
      valueM1,
      valueM2,
      valueS,
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
  margin: 1em 0.5em;
}
</style>
