<template>
  <t-button class="t-fab" :class="classes" theme="primary" shape="circle" @click="onClick">
    <t-icon :name="icon" style="color: white;"></t-icon>
    <span v-if="text" class="t-fab__text">{{ text }}</span>
  </t-button>
</template>

<script lang="ts">
import { computed, SetupContext, defineComponent } from 'vue';
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
  setup(props, context: SetupContext) {
    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--icononly`]: props.icon && !props.text,
      },
    ]);

    const onClick = (e:Event) => {
      context.emit('click', e);
    };

    return {
      classes,
      onClick,
    };
  },
});
</script>
