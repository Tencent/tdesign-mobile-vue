<template>
  <t-button :class="classes" theme="primary" shape="round" @click="onClick">
    <component :is="computedIcon" style="color: #fff"></component>
    <span v-if="text" :class="`${name}__text`">{{ text }}</span>
  </t-button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import TButton from '../button';

const { prefix } = config;
const name = `${prefix}-fab`;

export default defineComponent({
  name,
  components: { TButton },
  props: {
    icon: {
      type: Function,
      default: () => AddIcon,
    },
    text: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, context) {
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${name}--icononly`]: props.icon && !props.text,
    }));

    const onClick = (e: Event) => {
      context.emit('click', e);
    };

    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      return context.slots?.icon;
    });

    return {
      name,
      classes,
      onClick,
      computedIcon,
    };
  },
});
</script>
