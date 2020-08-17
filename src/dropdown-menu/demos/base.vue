<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item title="单选菜单" :options="optionsN" v-model="valueS" />
      <t-dropdown-item title="多选菜单" :options="optionsC" v-model="valueM" selectMode="multi" />
    </t-dropdown-menu>
    <p>
      单选菜单 选中项:
      <strong>{{valueS}}</strong>
    </p>
    <p>
      多选菜单 选中项:
      <strong>{{valueM.join(', ')}}</strong>
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
      name,
      optionsN,
      optionsC,
      valueS,
      valueM,
    };
  },
});
</script>
