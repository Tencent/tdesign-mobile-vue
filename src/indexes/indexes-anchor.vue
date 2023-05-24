<template>
  <div :class="`${name}`" :data-index="index">
    <div :class="`${name}__wrapper`">
      <div :class="`${name}__slot`">
        <slot />
      </div>
      <div :class="`${name}__header`">{{ index }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, inject } from 'vue';
import config from '../config';
import indexesAnchorProps from './indexes-anchor-props';

const name = `${config.prefix}-indexes-anchor`;

export default defineComponent({
  name,
  props: indexesAnchorProps,
  setup() {
    const instance = getCurrentInstance();
    const indexesProvide: any = inject('indexesProvide', undefined);
    const { proxy } = instance as ComponentInternalInstance;
    indexesProvide.relation(proxy);
    return {
      name,
    };
  },
});
</script>
