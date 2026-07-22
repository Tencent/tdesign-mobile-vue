import { computed, defineComponent } from 'vue';
import props from './cell-group-props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TCellGroup',
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
