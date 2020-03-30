<template>
  <button
    v-on="$listeners"
    :class="_class"
    :disabled="disabled"
  >
    <tdesign-icon
      icon="loading_gradient"
      :class="_iconClass"
      v-if="loading"
    />
    <tdesign-icon
      :icon="icon"
      :class="_iconClass"
      v-if="icon && !loading"
    />

    <span v-if="!iconOnly">
      <slot />
    </span>

    <tdesign-icon
      :icon="suffixIcon"
      :class="_suffixIconClass"
      v-if="suffixIcon"
    />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import config from '../config';
import BaseComponent from '../utils/base-component';
import Icon from '../icon';

const { prefix } = config;
const name:string = `${prefix}button`;

export default Vue.extend({
  name,
  components: {
    [Icon.name]: Icon,
  },
  mixins: [BaseComponent],
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    round: Boolean,
    loading: Boolean,
    disabled: Boolean,
    icon: String,
    suffixIcon: String,
    htmlType: {
      type: String,
    },
    iconOnly: Boolean,
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _class(): any[] {
      return [
        `${name}`,
        `${name}--size-${this.size}`,
        `${name}--theme-${this.theme}`,
        {
          [`${name}--disabled`]: this.disabled,
          [`${name}--notext`]: this.iconOnly,
          [`${name}--loading`]: this.loading,
          [`${name}--round`]: this.round,
          [`${name}--block`]: this.block,
        },
      ];
    },
    _iconClass(): string {
      return `${name}__icon`;
    },
    _suffixIconClass(): string {
      return `${name}__suffix-icon`;
    },
  },
});

</script>
