<template>
  <div :class="classPrefix">
    <div :class="`${classPrefix}__thumb`">
      <template v-if="imageContent">
        <t-image v-if="typeof image === 'string'" :src="image" />
        <t-node v-else :content="imageContent" />
      </template>

      <div v-else-if="iconContent" :class="`${classPrefix}__icon`">
        <t-node :content="iconContent" />
      </div>
    </div>

    <div v-if="descriptionContent" :class="`${classPrefix}__description`">
      <t-node :content="descriptionContent" />
    </div>
    <div v-if="actionContent" :class="`${classPrefix}__actions`">
      <t-node :content="actionContent" />
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
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const actionContent = computed(() => renderTNode(internalInstance, 'action'));
    const descriptionContent = computed(() => renderTNode(internalInstance, 'description'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const imageContent = computed(() => renderTNode(internalInstance, 'image'));

    return {
      actionContent,
      descriptionContent,
      iconContent,
      imageContent,
      classPrefix: name,
      ...toRefs(props),
    };
  },
});
</script>
