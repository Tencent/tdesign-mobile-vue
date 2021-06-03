import { createApp, defineComponent, ref, h, VNode, App, nextTick } from 'vue';
import Message from './message.vue';
import { WithInstallType } from '../shared/';
import { MessageProps, MessageType } from './message.interface';

import './style/';

function create(props: MessageProps): void {
  const visible = ref(false);
  const root = document.createElement('div');
  document.body.appendChild(root);

  const component = defineComponent({
    render: (): VNode => h(Message, {
      ...props,
      visible: visible.value,
      onClose: () => {
        visible.value = false;
      },
      onClosed: () => {
        root.remove();
      },
    }),
  });

  createApp(component).mount(root);

  nextTick(() => {
    visible.value = true;
  });
}

(['info', 'success', 'warning', 'error'] as MessageType[]).forEach((type: MessageType): void => {
  Message[type] = (options: MessageProps | string) => {
    let props = {
      content: '',
      theme: type,
    };

    if (typeof options === 'string') {
      props.content = options;
    } else {
      props = { ...props, ...options };
    }

    create(props);
  };
});

Message.install = (app: App, name = '') => {
  app.component(name || Message.name, Message);

  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$message = Message;
};

type MessageApi = {
  /** 展示普通消息 */
  info: (options?: MessageProps | string) => void,
  /** 展示成功消息 */
  success: (options?: MessageProps | string) => void,
  /** 展示警示消息 */
  warning: (options?: MessageProps | string) => void,
  /** 展示错误消息 */
  error: (options?: MessageProps | string) => void,
};

export const MessagePlugin: WithInstallType<typeof Message> = Message as any;
export default MessagePlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
