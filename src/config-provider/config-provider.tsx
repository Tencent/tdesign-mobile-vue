import { defineComponent, PropType } from 'vue';
import config from '../config';
import { GlobalConfigProvider } from './type';
import { provideConfig } from './useConfig';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-config-provider`;

export const configProviderProps = {
  globalConfig: Object as PropType<GlobalConfigProvider>,
};

export type ConfigProviderProps = {
  globalConfig: GlobalConfigProvider;
};

export default defineComponent({
  name,
  props: configProviderProps,

  setup(props) {
    provideConfig(props);

    const renderTNodeJSX = useTNodeJSX();

    return () => <>{renderTNodeJSX('default')}</>;
  },
});
