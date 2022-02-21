<template>
  <div :class="rootClasses">
    <template v-if="showContent">
      <template v-if="content">{{ content }}</template>
      <template v-else-if="defaultContent">{{ defaultContent }}</template>
      <slot v-else></slot>
    </template>
    <template v-else-if="theme === 'text'">
      <div v-for="(item, index) of parsedRowcols" :key="`${rowClass}-${index}`" :class="rowClass">
        <div v-for="(col, idx) of item" :key="`${colClass}-${idx}`" :class="colClass" :style="col.style"></div>
      </div>
    </template>
    <template v-else-if="theme === 'avatar-text'">
      <div :class="`${name}__col ${name}--type-circle`"></div>
      <div :class="`${name}__paragraph`">
        <div v-for="(item, index) of parsedRowcols" :key="`${rowClass}-${index}`" :class="rowClass">
          <div v-for="(col, idx) of item" :key="`${colClass}-${idx}`" :class="colClass" :style="col.style"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { isNumber } from '../shared';

import config from '../config';
import SkeletonProps from './props';
import { SkeletonRowColObj } from './type';
import { Styles } from '../common';

const { prefix } = config;
const name = `${prefix}-skeleton`;
const defaultRowcols = [1, 1, 1, { width: '70%' }];

export default defineComponent({
  name,
  components: {},
  props: SkeletonProps,
  setup(props) {
    const showContent = !props.loading;

    const rootClasses = computed(() => [`${name}`, `${name}--${props.theme}`]);

    const rowCols = [];

    if (props.theme === 'avatar-text') {
      rowCols.push(...defaultRowcols);
    } else if (props.rowCol) {
      rowCols.push(...props.rowCol);
    } else {
      rowCols.push(...defaultRowcols);
    }

    const rowClass = `${name}__row`;
    const colClass = computed(() => [
      `${name}__col`,
      { [`${name}--animation-${props.animation}`]: props.animation },
      `${name}--type-text`,
    ]);

    const getColItemStyle = (obj: SkeletonRowColObj): Styles => {
      const styleName = [
        'width',
        'height',
        'marginRight',
        'marginLeft',
        'margin',
        'size',
        'background',
        'backgroundColor',
        'borderRadius',
      ];
      const style: Styles = {};
      styleName.forEach((name) => {
        if (name in obj) {
          const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
          if (name === 'size') {
            [style.width, style.height] = [px, px];
          } else {
            style[name] = px;
          }
        }
      });
      return style;
    };

    const parsedRowcols = rowCols.map((item) => {
      if (isNumber(item)) {
        return [
          {
            type: 'text',
            style: {},
          },
        ];
      }
      if (Array.isArray(item)) {
        return item.map((col) => {
          return {
            ...col,
            style: getColItemStyle(col),
          };
        });
      }

      const nItem = item as SkeletonRowColObj;
      return [
        {
          ...nItem,
          style: getColItemStyle(nItem),
        },
      ];
    });

    return {
      name,
      rootClasses,
      rowClass,
      colClass,
      parsedRowcols,
      showContent,
      defaultContent: props.default,
    };
  },
});
</script>
