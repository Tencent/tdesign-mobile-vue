<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item v-model="value1" label="单选菜单1" :options="optionsN" />
      <t-dropdown-item v-model="value2" label="单选菜单2" :options="optionsC" />
    </t-dropdown-menu>
    <p>
      单选菜单1 选中项:
      <strong>{{ value1 }}</strong>
    </p>
    <p>
      单选菜单2 选中项:
      <strong>{{ value2 }}</strong>
    </p>
    <!-- <t-button @click="updateOptions">更新选项</t-button> -->
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
    const value1 = ref('option_2');
    const value2 = ref('options_A');

    // const updateOptions = () => {
    //   optionsN.value = [
    //     { title: '新选项 1', value: 'new_options_1' },
    //     { title: '新选项 2', value: 'new_options_2' },
    //     { title: '新选项 3', value: 'new_options_3' },
    //   ];
    // };
    return {
      optionsN,
      optionsC,
      value1,
      value2,

      // updateOptions,
    };
  },
});
</script>
