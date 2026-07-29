import { defineComponent } from 'vue';
import props from './props';
import { provideConfig } from './useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TConfigProvider',
  props,
  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
