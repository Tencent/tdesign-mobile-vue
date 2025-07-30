import { defineComponent } from 'vue';
import config from '../config';
import props from './props';
import { provideConfig } from './useConfig';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-config-provider`;

export default defineComponent({
  name,
  props,
  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
