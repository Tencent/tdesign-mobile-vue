<template>
  <div :class="classPrefix">
    <div :class="`${classPrefix}__thumb`">
      <t-image v-if="image" :class="`${classPrefix}-class-image`" :src="image" />
      <div v-else-if="iconContent !== undefined" :class="`${classPrefix}__icon`">
        <t-node :content="iconContent"></t-node>
      </div>
      <slot v-else name="image" />
    </div>

    <div :class="`${classPrefix}__description`">
      <div v-if="description">{{ description }}</div>
      <slot name="description" />
    </div>
    <div :class="`${classPrefix}__actions`">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, getCurrentInstance, computed } from 'vue';
import EmptyProps from './props';
import config from '../config';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-empty`;

export default defineComponent({
  name,
  components: { TNode },

  props: EmptyProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));

    return {
      iconContent,
      classPrefix: name,
      ...toRefs(props),
    };
  },
});
</script>
