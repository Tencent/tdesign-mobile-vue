<template>
  <div :class="rootClass" :style="rootStyle">
    <div :class="`${name}__image-box`">
      <t-badge
        v-if="badgeProps"
        :count="badgeProps.count"
        :max-count="badgeProps.maxCount"
        :dot="badgeProps.dot"
        :content="badgeProps.content"
        :size="badgeProps.size"
        :offset="badgeProps.offset"
      >
        <template v-if="image">
          <img v-if="typeof image === 'string'" :src="image" :class="`${name}__image`" :style="imgStyle" />
          <t-node v-else :content="imageContent"></t-node>
        </template>
      </t-badge>

      <template v-else-if="image">
        <img v-if="typeof image === 'string'" :src="image" :class="`${name}__image`" :style="imgStyle" />
        <t-node v-else :content="imageContent"></t-node>
      </template>
    </div>
    <div :class="`${name}__text`" :style="textStyle">
      <div :class="`${name}__title`" :style="titleStyle">
        <t-node :content="textContent"></t-node>
      </div>
      <div :class="`${name}__description`">
        <t-node :content="descContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, inject } from 'vue';
import { renderTNode, TNode } from '../shared';

import config from '../config';
import gridItemprops from './grid-item-props';

const { prefix } = config;
const name = `${prefix}-grid-item`;

export default defineComponent({
  name,
  components: { TNode },
  props: gridItemprops,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const isHorz = props.layout === 'horizontal';
    const { column, gutter, border, align } = inject<any>('grid');

    const imageContent = computed(() => renderTNode(internalInstance, 'image'));
    const textContent = computed(() => renderTNode(internalInstance, 'text'));
    const descContent = computed(() => renderTNode(internalInstance, 'description'));

    const rootClass = computed(() => [`${name}`, { [`${name}--bordered`]: border.value }]);

    const rootStyle = computed(() => {
      const percent = `${100 / +column.value}%`;
      const borderStyle = {};
      if (border.value) {
        if (typeof border.value !== 'boolean') {
          const { color, width, style } = border;
          return {
            borderColor: color,
            borderWidth: width,
            borderStyle: style,
          };
        }
      }

      const style = {
        flexBasis: percent,
        flexDirection: isHorz ? ('row' as const) : ('column' as const),
        paddingLeft: gutter.value ? `${gutter}px` : 0,
        paddingRight: gutter.value ? `${gutter}px` : 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: ['center', 'left'].includes(align.value) ? align.value : 'center',
        ...borderStyle,
      };
      return style;
    });

    const imgStyle = computed(() => {
      let imgSize = 32;
      if (column.value >= 5) {
        imgSize = 28;
      } else if (column.value <= 3) {
        imgSize = 48;
      }
      return {
        width: `${imgSize}px`,
        height: `${imgSize}px`,
      };
    });

    const textStyle = computed(() => {
      return {
        paddingLeft: isHorz ? '12px' : 0,
      };
    });

    const titleStyle = computed(() => {
      return {
        paddingTop: isHorz ? 0 : '8px',
        marginBottom: '4px',
      };
    });

    return {
      name,
      rootStyle,
      rootClass,
      imgStyle,
      textStyle,
      titleStyle,
      imageContent,
      textContent,
      descContent,
    };
  },
});
</script>
