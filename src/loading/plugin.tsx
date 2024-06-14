import { App, Plugin, createApp, defineComponent, h, reactive } from 'vue';
import merge from 'lodash/merge';
import LoadingComponent from './loading';
import { getAttach, removeClass, addClass } from '../shared/dom';
import { TdLoadingProps, LoadingInstance, LoadingMethod } from './type';
import { usePrefixClass } from '../hooks/useClass';

let fullScreenLoadingInstance: LoadingInstance = null;

function mergeDefaultProps(props: TdLoadingProps): TdLoadingProps {
  const options: TdLoadingProps = merge(
    {
      fullscreen: false,
      attach: 'body',
      loading: true,
    },
    props,
  );

  return options;
}

function createLoading(props: TdLoadingProps): LoadingInstance {
  const mergedProps = mergeDefaultProps(props);

  if (mergedProps.fullscreen && fullScreenLoadingInstance) {
    return fullScreenLoadingInstance;
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

  const attach = getAttach(mergedProps.fullscreen ? 'body' : mergedProps.attach);

  const app = createApp(component);
  app.mount(document.createElement('div'));
  const parentRelativeClass = usePrefixClass('loading__parent--relative').value;
  const lockClass = usePrefixClass('loading--lock').value;

  if (mergedProps.fullscreen) {
    addClass(document.body, lockClass);
  }

  if (attach) {
    addClass(attach, parentRelativeClass);
  } else {
    console.error('attach is not exist');
  }

  const loadingInstance: LoadingInstance = {
    hide: () => {
      removeClass(attach, parentRelativeClass);
      removeClass(document.body, lockClass);
      app.unmount();
    },
  };
  return loadingInstance;
}

function produceLoading(props: boolean | TdLoadingProps): LoadingInstance {
  // 全屏加载
  if (props === true) {
    fullScreenLoadingInstance = createLoading({
      fullscreen: true,
      loading: true,
      attach: 'body',
    });
    return fullScreenLoadingInstance;
  }

  if (props === false) {
    // 销毁全屏实例
    fullScreenLoadingInstance?.hide();
    fullScreenLoadingInstance = null;
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
