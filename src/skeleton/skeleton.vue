<template>
  <div :class="rootClasses">
    <template v-if="showContent">
      <t-node :content="skeletonContent" />
    </template>
    <template v-else>
      <div v-if="parsedRowcols.length" :class="`${baseClass}__content`">
        <div v-for="(row, index) of parsedRowcols" :key="`row-${index}`" :class="`${baseClass}__row`">
          <div v-for="(col, idx) of row" :key="`col-${idx}`" :class="col.class" :style="col.style"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, watchEffect, ref, getCurrentInstance } from 'vue';
import isNumber from 'lodash/isNumber';
import { renderContent, TNode } from '../shared';
import config from '../config';
import SkeletonProps from './props';
import { SkeletonRowColObj } from './type';
import { ClassName, Styles } from '../common';

const { prefix } = config;
const name = `${prefix}-skeleton`;
const ThemeMap = {
  avatar: [{ type: 'circle', height: '64px', width: '64px' }],
  image: [{ type: 'rect', height: '64px', width: '64px' }],
  text: [
    1,
    [
      { width: '24%', height: '16px', marginRight: '16px' },
      { width: '76%', height: '16px' },
    ],
  ],
  paragraph: [1, 1, 1, { width: '55%' }],
};

export default defineComponent({
  name,
  components: {
    TNode,
  },
  props: SkeletonProps,
  setup(props) {
    const { loading, animation } = toRefs(props);
    const showContent = computed(() => !loading.value);

    const internalInstance = getCurrentInstance();
    const skeletonContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const baseClass = name;
    const rootClasses = computed(() => [`${name}`]);

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
      { [`${name}--animation-${animation.value}`]: animation.value },
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
      baseClass,
      rootClasses,
      parsedRowcols,
      showContent,
      skeletonContent,
    };
  },
});
</script>
