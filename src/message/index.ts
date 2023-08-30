import { createApp, defineComponent, ref, h, VNode, App, nextTick } from 'vue';
import Message from './message.vue';
import { WithInstallType } from '../shared';
import { TdMessageProps, MessageThemeList } from './type';

import './style';

interface MessageActionOptionsType extends TdMessageProps {
  context?: Element;
}

const instanceMap: Map<Element, Record<string, Element>> = new Map();

function destroy(context: Element, root: Element) {
  if (context.contains(root)) {
    context.removeChild(root);
    if (instanceMap.has(root)) {
      instanceMap.delete(root);
    }
  }
}

function create(props: MessageActionOptionsType): void {
  const { context, ...otherOptions } = props;

  if (!context) {
    console.error('未找到组件, 请确认 context 是否正确');
    return;
  }

  const root = document.createElement('div');
  context.appendChild(root);
  const visible = ref(false);

  const component = defineComponent({
    render: (): VNode =>
      // @ts-ignore
      h(Message, {
        ...otherOptions,
        visible: visible.value,
        onDurationEnd: () => {
          otherOptions.onDurationEnd?.();
          visible.value = false;
          destroy(context, root);
        },
        onCloseBtnClick: () => {
          visible.value = false;
          destroy(context, root);
        },
      }),
  });

  createApp(component).mount(root);

  instanceMap.set(root, {
    context,
  });

  nextTick(() => {
    visible.value = true;
  });
}

const defaultProps: TdMessageProps = {
  align: 'left',
  closeBtn: false,
  content: '',
  duration: 3000,
  theme: 'info',
  visible: false,
  zIndex: 5000,
  onDurationEnd: () => {},
  onCloseBtnClick: () => {},
};

(['info', 'success', 'warning', 'error'] as MessageThemeList[]).forEach((theme: MessageThemeList): void => {
  Message[theme] = (options: MessageActionOptionsType | string) => {
    let props: MessageActionOptionsType = {
      ...defaultProps,
      theme,
    };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    create(props);
  };
});

Message.closeAll = () => {
  if (instanceMap instanceof Map) {
    for (const [key, value] of instanceMap) {
      const { context } = value;
      destroy(context as Element, key);
    }
  }
};

Message.install = (app: App, name = '') => {
  app.component(name || Message.name, Message);

  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$message = Message as any;
};

type MessageApi = {
  /** 展示普通消息 */
  info: (options?: MessageActionOptionsType | string) => void;
  /** 展示成功消息 */
  success: (options?: MessageActionOptionsType | string) => void;
  /** 展示警示消息 */
  warning: (options?: MessageActionOptionsType | string) => void;
  /** 展示错误消息 */
  error: (options?: MessageActionOptionsType | string) => void;
  /** 关闭全部 */
  closeAll: () => void;
};

export const MessagePlugin: WithInstallType<typeof Message> & MessageApi = Message as any;
export default MessagePlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
