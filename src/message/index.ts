import { createApp, defineComponent, ref, Ref, h, VNode, App, nextTick } from 'vue';
import Message from './message';
import { isBrowser } from '../shared';
import { TdMessageProps } from './type';

import './style';

interface MessageActionOptionsType extends TdMessageProps {
  context?: Element;
}

const instanceMap: Map<
  Element,
  {
    context: Element;
    visible: Ref<boolean>;
  }
> = new Map();

const defaultProps: MessageActionOptionsType = {
  align: 'left',
  closeBtn: false,
  content: '',
  duration: 3000,
  theme: 'info',
  visible: false,
  zIndex: 5000,
  context: isBrowser ? document.body : null,
  onDurationEnd: () => {},
  onCloseBtnClick: () => {},
};

/** 展示普通消息 */
Message.info = (options?: MessageActionOptionsType | string) => {
  create({ ...parseOptions(options), theme: 'info' });
};

/** 展示成功消息 */
Message.success = (options?: MessageActionOptionsType | string) => {
  create({ ...parseOptions(options), theme: 'success' });
};

/** 展示警示消息 */
Message.warning = (options?: MessageActionOptionsType | string) => {
  create({ ...parseOptions(options), theme: 'warning' });
};

/** 展示错误消息 */
Message.error = (options?: MessageActionOptionsType | string) => {
  create({ ...parseOptions(options), theme: 'error' });
};

/** 关闭全部 */
Message.closeAll = () => {
  if (instanceMap instanceof Map) {
    for (const [key, value] of instanceMap) {
      const { context, visible } = value;
      destroy(context as Element, key);
      visible.value = false;
    }
  }
};

Message.install = (app: App, name = '') => {
  app.component(name || Message.name, Message);
  app.config.globalProperties.$message = Message;
};

export const MessagePlugin = Message;
export default MessagePlugin;

declare module 'vue' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $message: typeof Message;
  }
}

function destroy(context: Element, root: Element) {
  if (context.contains(root)) {
    context.removeChild(root);
    if (instanceMap.has(root)) {
      instanceMap.delete(root);
    }
  }
}

function create(props: MessageActionOptionsType): void {
  if (!isBrowser) return;

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
        },
        onCloseBtnClick: (context: { e: MouseEvent }) => {
          otherOptions.onCloseBtnClick?.(context);
          visible.value = false;
        },
        onAfterLeave: () => {
          destroy(context, root);
        },
      }),
  });

  createApp(component).mount(root);

  instanceMap.set(root, {
    context,
    visible,
  });

  nextTick(() => {
    visible.value = true;
  });
}

function parseOptions(content?: MessageActionOptionsType | string) {
  return typeof content === 'string' ? { ...defaultProps, content } : { ...defaultProps, ...content };
}
