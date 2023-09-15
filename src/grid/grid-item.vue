<template>
  <div
    :class="[
      `${name}`,
      `${name}--${layout}`,
      { [`${name}--bordered`]: border, [`${name}--surround`]: border && gutter },
    ]"
    :style="rootStyle"
  >
    <div :class="[`${name}__image`, `${name}__image--${size}`]">
      <t-badge v-if="badge" v-bind="badge">
        <t-image v-if="realImage" shape="round" v-bind="realImage" />
        <t-node v-else :content="imageContent" />
      </t-badge>
      <t-image v-else-if="realImage" shape="round" v-bind="realImage" />
      <t-node v-else :content="imageContent" />
    </div>

    <div :class="[`${name}__content`, `${name}__content--${layout}`]">
      <div :class="[`${name}__title`, `${name}__title--${size}`]">
        <t-node :content="textContent" />
      </div>
      <div :class="[`${name}__description`, [`${name}__description--${layout}`]]">
        <t-node :content="descContent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, inject } from 'vue';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

import TImage from '../image';
import TBadge from '../badge';
import config from '../config';
import gridItemProps from './grid-item-props';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-grid-item`;

export default defineComponent({
  name,
  components: { TNode, TBadge, TImage },
  props: gridItemProps,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const { column, border, align, gutter } = inject<any>('grid');
    const imageContent = computed(() => renderTNode(internalInstance, 'image'));
    const textContent = computed(() => renderTNode(internalInstance, 'text'));
    const descContent = computed(() => renderTNode(internalInstance, 'description'));

    const rootClass = computed(() => [`${name}`, `${name}--${props.layout}`]);

    const rootStyle = computed(() => {
      const percent = column.value > 0 ? `${100 / +column.value}%` : 0;
      const style: Record<string, any> = {
        textAlign: ['center', 'left'].includes(align.value) ? align.value : 'center',
      };
      if (percent !== 0) {
        style.flexBasis = percent;
      }
      return style;
    });

    const size = computed(() => {
      if (column.value > 4 || !column.value) return 'small';
      return column.value < 4 ? 'large' : 'middle';
    });

    const realImage = computed(() => {
      if (isString(props.image)) return { src: props.image };
      if (isObject(props.image) && !isFunction(props.image) && !context.slots.image) {
        return props.image;
      }
      return null;
    });

    return {
      name,
      size,
      border,
      gutter,
      rootStyle,
      rootClass,
      realImage,
      imageContent,
      textContent,
      descContent,
    };
  },
});
</script>
