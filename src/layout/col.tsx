import { computed, defineComponent, CSSProperties, inject } from 'vue';
import { convertUnit } from '../shared';
import props from './col-props';
import config from '../config';
import { rowInjectionKey } from './constants';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-col`;

export default defineComponent({
  name,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('col');
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
      let colClass = componentName.value;
      if (props.offset) {
        colClass += ` ${componentName.value}--offset-${props.offset}`;
      }
      if (props.span) {
        colClass += ` ${componentName.value}--${props.span}`;
      }
      return colClass;
    });

    return () => {
      return (
        <div class={colClass.value} style={style.value}>
          {renderTNodeJSX('default')}
        </div>
      );
    };
  },
});
