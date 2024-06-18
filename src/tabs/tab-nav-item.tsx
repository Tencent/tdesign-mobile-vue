import { defineComponent } from 'vue';
import config from '../config';
import TabPanelProps from './tab-panel-props';
import { useContent } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-nav`,
  props: {
    label: TabPanelProps.label,
  },
  setup(props) {
    const renderTNodeContent = useContent();

    return () => <div>{renderTNodeContent('default', 'label')}</div>;
  },
});
