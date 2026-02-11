import { defineComponent } from 'vue';
import config from '../config';
import TabPanelProps from './tab-panel-props';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-nav`,
  props: {
    label: TabPanelProps.label,
    icon: TabPanelProps.icon,
  },
  setup() {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();

    return () => {
      const iconContent = renderTNodeJSX('icon');
      const labelContent = renderTNodeContent('default', 'label');

      return (
        <>
          {iconContent && <div class={`${prefix}-tabs__icon`}>{iconContent}</div>}
          {labelContent}
        </>
      );
    };
  },
});
