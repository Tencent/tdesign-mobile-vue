import { computed, defineComponent } from 'vue';
import props from './cell-group-props';
import config from '../config';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-cell-group`,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const cellGroupClass = usePrefixClass('cell-group');

    const contentClasses = computed(() => [
      cellGroupClass.value,
      `${cellGroupClass.value}--${props.theme}`,
      { [`${cellGroupClass.value}--bordered`]: props.bordered },
    ]);

    return () => {
      const title = renderTNodeJSX('title');
      return (
        <div>
          {title ? <div class={`${cellGroupClass.value}__title`}>{title}</div> : null}
          <div class={contentClasses.value}>{renderTNodeJSX('default')}</div>
        </div>
      );
    };
  },
});
