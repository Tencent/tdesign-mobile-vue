<template>
  <div :class="styleCell" @click="onClick">
    <div v-if="computedLeftIcon !== undefined" :class="`${name}__left-icon`">
      <component :is="computedLeftIcon"> </component>
    </div>
    <div v-if="hasTitle" :class="`${name}__title`">
      <slot name="title">
        <div v-if="title">{{ title }}</div>
        <div v-if="description" :class="`${name}__description`">{{ description }}</div>
      </slot>
    </div>
    <div v-if="hasNote" :class="`${name}__note`">
      <slot name="note">
        <div v-if="note">{{ note }}</div>
      </slot>
    </div>
    <div v-if="computedRightIcon !== undefined" :class="`${name}__right-icon`">
      <component :is="computedRightIcon" > </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import config from '../config';
import TIconChevronRight from '../icon/chevron-right.vue';
import CellProps from './props';
import CLASSNAMES from '@/shared/consts';

const { prefix } = config;
const name = `${prefix}-cell`;

export default defineComponent({
  name,
  components: { TIconChevronRight },
  props: CellProps,
  emits: ['click'],
  setup(props, context) {
    const hasTitle = computed(() => {
      if (props.title) return true;
      return !!context.slots.title;
    });

    const hasNote = computed(() => {
      if (props.note) return true;
      return !!context.slots.note;
    });

    const computedRightIcon = computed(() => {
      if (typeof props.rightIcon === 'function') {
        return props.rightIcon();
      }
      if (!!context.slots.rightIcon) {
        return context.slots.rightIcon;
      }
      if (props.arrow) {
        return TIconChevronRight;
      }
      return undefined;
    });

    const computedLeftIcon = computed(() => {
      if (!!props.leftIcon) {
        return props.leftIcon();
      }
      if (!!context.slots.leftIcon) {
        return context.slots.leftIcon;
      }
      return undefined;
    });

    const styleCell = computed(()=>[
      `${name}`,
      {
        [`${name}--hover`]: props.hover,
        [`${name}--${props.align}`]: props.align,
      }
    ]);

    const onClick = (e: Event) => context.emit('click', e);

    return {
      ...toRefs(props),
      name,
      hasTitle,
      hasNote,
      computedRightIcon,
      computedLeftIcon,
      onClick,
      styleCell,
    };
  },
});
</script>
