<template>
  <div v-if="loading" :class="`${name}`">
    <template v-if="parsedRowcols.length">
      <div v-for="(row, index) of parsedRowcols" :key="`row-${index}`" :class="`${name}__row`">
        <div v-for="(col, idx) of row" :key="`col-${idx}`" :class="col.class" :style="col.style"></div>
      </div>
    </template>
  </div>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, watchEffect, ref } from 'vue';
import isNumber from 'lodash/isNumber';
import config from '../config';
import SkeletonProps from './props';
import { SkeletonRowColObj } from './type';
import { ClassName, Styles } from '../common';

const { prefix } = config;
const name = `${prefix}-skeleton`;
const ThemeMap = {
  avatar: [{ type: 'circle', size: '48px' }],
  image: [{ type: 'rect', size: '72px' }],
  text: [
    [
      { width: '24%', height: '16px', marginRight: '16px' },
      { width: '76%', height: '16px' },
    ],
    1,
  ],
  paragraph: [1, 1, 1, { width: '55%' }],
};

export default defineComponent({
  name,
  props: SkeletonProps,
  setup(props) {
    const { animation } = toRefs(props);
    const rowCols = ref<any>([]);

    watchEffect(() => {
      if (props.rowCol?.length) {
        rowCols.value = [...props.rowCol];
      } else {
        rowCols.value = [...ThemeMap[props.theme || 'text']];
      }
    });

    const getColItemClass = (obj: SkeletonRowColObj): ClassName => [
      `${name}__col`,
      `${name}--type-${obj.type || 'text'}`,
      `${name}--animation-${animation.value}`,
    ];

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

    const parsedRowcols = computed(() => {
      return rowCols.value.map((item: any) => {
        if (isNumber(item)) {
          return [
            {
              class: getColItemClass({ type: 'text' }),
              style: {},
            },
          ];
        }
        if (Array.isArray(item)) {
          return item.map((col) => {
            return {
              ...col,
              class: getColItemClass(col),
              style: getColItemStyle(col),
            };
          });
        }

        const nItem = item as SkeletonRowColObj;
        return [
          {
            ...nItem,
            class: getColItemClass(nItem),
            style: getColItemStyle(nItem),
          },
        ];
      });
    });

    return {
      name,
      parsedRowcols,
    };
  },
});
</script>
