import { computed, defineComponent, CSSProperties, provide } from 'vue';
import { convertUnit } from '../shared';
import props from './row-props';
import config from '../config';
import { rowInjectionKey } from './constants';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-row`;

export default defineComponent({
  name,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('row');

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
        <div class={componentName.value} style={style.value}>
          {renderTNodeJSX('default')}
        </div>
      );
    };
  },
});
