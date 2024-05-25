import { defineComponent, provide, toRefs, computed } from 'vue';

import config from '../config';
import gridProps from './props';

const { prefix } = config;
const name = `${prefix}-grid`;

export default defineComponent({
  name,
  props: gridProps,
  setup(props, { slots }) {
    const { column, gutter, border, align } = toRefs(props);
    const rootStyle = computed(() => {
      if (column.value === 0) return [];
      const ans = [
        `padding: ${gutter.value}px;`,
        `grid-template-columns: repeat(${column.value}, 1fr)`,
        `grid-gap: ${gutter.value}px`,
      ];

      return ans;
    });

    provide('grid', {
      column,
      border,
      align,
      gutter,
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--card`]: props.theme === 'card',
        [`${name}--auto-size`]: props.column === 0,
        [`${name}--bordered`]: border && !gutter,
      },
    ]);
    return () => (
      <div class={classes.value} style={rootStyle.value}>
        {slots.default?.()}
      </div>
    );
  },
});
