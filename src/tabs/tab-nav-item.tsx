import { defineComponent } from 'vue';
import TabPanelProps from './tab-panel-props';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

export default defineComponent({
  name: 'TTabNav',
  props: {
    label: TabPanelProps.label,
    icon: TabPanelProps.icon,
  },
  setup() {
    const tabsClass = usePrefixClass('tabs');
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();

    return () => {
      const iconContent = renderTNodeJSX('icon');
      const labelContent = renderTNodeContent('default', 'label');

      return (
        <>
          {iconContent && <div class={`${tabsClass.value}__icon`}>{iconContent}</div>}
          {labelContent}
        </>
      );
    };
  },
});
