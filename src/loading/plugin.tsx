import { App, Plugin, createApp, defineComponent, h, reactive } from 'vue';
import merge from 'lodash/merge';
import LoadingComponent from './loading';
import { getAttach, removeClass, addClass } from '../shared/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';
import { usePrefixClass } from '../hooks/useClass';

let instance: LoadingInstance = null;

function mergeDefaultProps(props: TdLoadingProps): TdLoadingProps {
  const options: TdLoadingProps = merge(
    {
      loading: true,
    },
    props,
  );

  return options;
}

function createLoading(props: TdLoadingProps): LoadingInstance {
  const mergedProps = mergeDefaultProps(props);

  if (mergedProps && instance) {
    return instance;
  }

  const component = defineComponent({
    setup() {
      const loadingOptions = reactive(mergedProps);
      return {
        loadingOptions,
      };
    },
    render() {
      return h(LoadingComponent, {
        ...this.loadingOptions,
      });
    },
  });

  const attach = getAttach('body');
  const app = createApp(component);
  const div = document.createElement('div');
  const container = usePrefixClass('loading__container').value;
  addClass(div, container);
  document.body.appendChild(div);
  const parentRelativeClass = usePrefixClass('loading__parent--relative').value;
  const lockClass = usePrefixClass('loading--lock').value;
  addClass(attach, parentRelativeClass);
  addClass(document.body, lockClass);

  app.mount(div);

  const loadingInstance: LoadingInstance = {
    hide: () => {
      document.body.removeChild(div);
      removeClass(div, container);
      removeClass(document.body, lockClass);
      app.unmount();
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps): LoadingInstance {
  if (props === true) {
    instance = createLoading({
      loading: true,
    });
    return instance;
  }

  if (props === false) {
    instance?.hide();
    instance = null;
    return;
  }
  return createLoading(props);
}

export type LoadingPluginType = Plugin & LoadingMethod;

export const LoadingPlugin: LoadingPluginType = produceLoading as LoadingPluginType;

LoadingPlugin.install = (app: App) => {
  app.config.globalProperties.$loading = produceLoading;
};

export default LoadingPlugin;
