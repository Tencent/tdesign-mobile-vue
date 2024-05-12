import { computed, defineComponent, CSSProperties, provide } from 'vue';
import { convertUnit } from '../shared';
import RowProps from './props';
import config from '../config';
import { rowInjectionKey } from './constants';

const { prefix } = config;
const name = `${prefix}-row`;

export default defineComponent({
  name,
  props: RowProps,
  setup(props, { slots }) {
    // row gutter style
    const style = computed(() => {
      const styles: CSSProperties = {};
      if (!props.gutter) {
        return styles;
      }
      const gutterVal = convertUnit(-props.gutter / 2);
      styles.marginRight = gutterVal;
      styles.marginLeft = gutterVal;
      return styles;
    });

    // 给col传递gutter
    provide(rowInjectionKey, {
      gutter: props.gutter || 0,
    });

    return () => {
      return (
        <div class={`${prefix}-row`} style={style.value}>
          {slots.default?.()}
        </div>
      );
    };
  },
});
