import { defineComponent, provide, toRefs, computed } from 'vue';

import config from '../config';
import props from './props';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-grid`,
  props,
  setup(props, { slots }) {
    const gridClass = usePrefixClass('grid');
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
      `${gridClass.value}`,
      {
        [`${gridClass.value}--card`]: props.theme === 'card',
        [`${gridClass.value}--auto-size`]: props.column === 0,
        [`${gridClass.value}--bordered`]: props.border && !props.gutter,
      },
    ]);
    return () => (
      <div class={classes.value} style={rootStyle.value}>
        {slots.default?.()}
      </div>
    );
  },
});
