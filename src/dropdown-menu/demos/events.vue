<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item
        v-model="valueS"
        label="单选菜单"
        :options="optionsN"
        select-mode="multi"
        options-layout="columns"
        options-columns="2"
        @change="log('[menu select] item: ', $event)"
        @open="log('[menu open] menu item 2N')"
        @opened="log('[menu opened] menu item 2N')"
        @close="log('[menu close] menu item 2N')"
        @closed="log('[menu closed] menu item 2N')"
      />
      <t-dropdown-item
        v-model="valueM"
        label="多选菜单"
        :options="optionsC"
        select-mode="multi"
        options-layout="columns"
        options-columns="3"
        @change="log('[menu select] item: ', $event)"
        @open="log('[menu open] menu item 2C')"
        @opened="log('[menu opened] menu item 2C')"
        @close="log('[menu close] menu item 2C')"
        @closed="log('[menu closed] menu item 2C')"
      />
    </t-dropdown-menu>
    <p>
      单选菜单 选中项:
      <strong>{{ valueS }}</strong>
    </p>
    <p>
      多选菜单 选中项:
      <strong>{{ valueM.join(', ') }}</strong>
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
      log: (...args: unknown[]) => {
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
