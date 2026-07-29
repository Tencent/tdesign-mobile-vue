import { computed, defineComponent, CSSProperties, inject } from 'vue';
import { convertUnit } from '../shared';
import props from './col-props';
import { rowInjectionKey } from './constants';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

export default defineComponent({
  name: 'TCol',
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const colClass = usePrefixClass('col');
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
    const rootClass = computed(() => {
      let rootClass = colClass.value;
      if (props.offset) {
        rootClass += ` ${colClass.value}--offset-${props.offset}`;
      }
      if (props.span) {
        rootClass += ` ${colClass.value}--${props.span}`;
      }
      return rootClass;
    });

    return () => {
      return (
        <div class={rootClass.value} style={style.value}>
          {renderTNodeJSX('default')}
        </div>
      );
    };
  },
});
