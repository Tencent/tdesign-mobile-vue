import { computed, defineComponent, CSSProperties, inject } from 'vue';
import { convertUnit } from '../shared';
import ColProps from './props';
import config from '../config';
import { rowInjectionKey } from '../row/constants';

const { prefix } = config;
const name = `${prefix}-col`;

export default defineComponent({
  name,
  props: ColProps,
  setup(props, { slots }) {
    const { gutter } = inject(rowInjectionKey);

    // 设置col gutter style
    const style = computed(() => {
      const styles: CSSProperties = {};
      if (!gutter) {
        return styles;
      }
      const gutterVal = convertUnit(Number(gutter) / 2);
      styles.paddingRight = gutterVal;
      styles.paddingLeft = gutterVal;
      return styles;
    });

    // 设置col class
    const colClass = computed(() => {
      let colClass = `${prefix}-col`;
      if (props.offset) {
        colClass += ` ${prefix}-col--offset-${props.offset}`;
      }
      if (props.span) {
        colClass += ` ${prefix}-col--${props.span}`;
      }
      return colClass;
    });

    return () => {
      return (
        <div class={colClass.value} style={style.value}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
