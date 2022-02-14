<template>
  <div :class="rootClass" :style="rootStyle">
    <div :class="`${name}__image-box`">
      <img v-if="image" :src="image" :class="`${name}__image`" :style="imgStyle" />
      <!-- <t-node :content="imageContent"></t-node> -->
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
import { defineComponent, getCurrentInstance, computed, render, inject } from 'vue';
import { renderTNode, renderContent, TNode, emitEvent } from '../shared';

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

    const rootClass = computed(() => [`${name}`]);

    const rootStyle = computed(() => {
      const percent = `${100 / +column.value}%`;
      let borderStyle = {};
      if (border.value) {
        if (typeof border.value === 'boolean') {
          borderStyle = {
            borderColor: '#f6f6f6',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        } else {
          const { color, width, style } = border;
          return {
            borderColor: color || '#f6f6f6',
            borderWidth: width || '1px',
            borderStyle: style || 'solid',
          };
        }
      }

      const style = {
        flexBasis: percent,
        flexDirection: isHorz ? 'row' : 'column',
        paddingLeft: gutter.value ? `${gutter}px` : 0,
        paddingRight: gutter.value ? `${gutter}px` : 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: align.value || 'center',
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
