<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item v-model="valueS" label="多选菜单1" :options="optionsN" select-mode="multi" />
      <t-dropdown-item v-model="valueM" label="多选菜单2" :options="optionsC" select-mode="multi" />
    </t-dropdown-menu>
    <p>
      单选菜单 选中项:
      <strong>{{ valueS }}</strong>
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
    const valueS = ref('option_2');
    const valueM = ref(['options_A', 'options_C']);
    return {
      optionsN,
      optionsC,
      valueS,
      valueM,
    };
  },
});
</script>
