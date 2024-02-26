<template>
  <div :class="name">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import config from '../config';
import { GlobalConfigProvider } from './type';
import { provideConfig } from './useConfig';

const { prefix } = config;
const name = `${prefix}-config-provider`;

export const configProviderProps = {
  globalConfig: Object as PropType<GlobalConfigProvider>,
};

export type ConfigProviderProps = {
  globalConfig: GlobalConfigProvider;
};

export default defineComponent({
  name,
  props: configProviderProps,

  setup(props) {
    provideConfig(props);

    return {
      name,
    };
  },
});
</script>
