<template>
  <div :class="`${name}__list`">
    <t-button
      v-for="(item, index) in items"
      :key="index"
      variant="text"
      block
      :class="[itemClasses, { [`${name}__list-item--disabled`]: item.disabled }]"
      :disabled="item.disabled"
      :icon="item.icon"
      :style="{ color: item.color }"
      @click="handleSelected(index)"
    >
      <t-node v-if="item.badge" :content="item.badge">
        <span :class="`${name}__list-item-text`"> {{ item.label }}</span>
      </t-node>
      <t-badge
        v-if="item.badge && (item.badge.dot || item.badge.count)"
        :count="item.badge.count"
        :max-count="item.badge.maxCount || 99"
        :dot="item.badge.dot"
        :content="item.badge.content"
        :size="item.badge.size"
        :offset="item.badge.offset || [-16, 20]"
      >
        <span :class="`${name}__list-item-text`"> {{ item.label }}</span>
      </t-badge>
      <span v-else :class="`${name}__list-item-text`"> {{ item.label }}</span>
    </t-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue';
import config from '../config';
import { ActionSheetItem } from './type';
import TButton from '../button';
import TBadge from '../badge';
import { TNode } from '../shared';

const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  components: { TNode, TButton, TBadge },
  props: {
    items: {
      type: Array as PropType<ActionSheetItem[]>,
      required: true,
    },
    align: {
      type: String as PropType<'left' | 'center'>,
      default: 'center',
    },
  },
  emits: ['selected'],
  setup(props, context) {
    console.log(props.items);
    const handleSelected = (index: number) => {
      context.emit('selected', index);
    };
    const itemClasses = computed(() => ({
      [`${name}__list-item`]: true,
      [`${name}__list-item--left`]: props.align === 'left',
    }));
    return {
      name: ref(name),
      itemClasses,
      handleSelected,
    };
  },
});
</script>
