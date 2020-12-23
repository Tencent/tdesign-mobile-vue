<!--
 * @Author: Colahan
 * @Date: 2020-11-24 16:16:16
 * @FilePath: /tdesign-mobile-vue/src/indexes/indexes.vue
-->
<template>
  <div :data-value="state.value" :class="state.componentName" @click="handleClick">
    {{state.title}}</div>
</template>

<script lang="ts">
import { reactive, defineComponent, SetupContext } from 'vue';
import config from '../config';
const { prefix } = config;

interface IndexesCellProps{
  title: string,
  value?: string
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    value: String,
  },
  setup(props: IndexesCellProps, context: SetupContext) {
    const currentSidebar: string = '';
    const { emit } = context;
    const state: object = reactive({
      componentName: `${prefix}-indexes__cell`,
      title: props?.title,
      value: props?.value,
    });

    const handleClick = () => {
      emit('click', {
        value: props.value,
      });
    };

    return {
      state,
      handleClick,
      currentSidebar,
    };
  },
});
</script>
