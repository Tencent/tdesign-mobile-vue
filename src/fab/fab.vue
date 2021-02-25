<template>
  <t-button :class="classes" theme="primary" shape="round" @click="onClick">
    <t-icon :name="icon" style="color: #fff;"></t-icon>
    <span v-if="text" :class="`${name}__text`">{{ text }}</span>
  </t-button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-fab`;

export default defineComponent({
  name,
  props: {
    icon: {
      type: String,
      default: '',
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

    return {
      name,
      classes,
      onClick,
    };
  },
});
</script>
