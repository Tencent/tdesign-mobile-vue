import { createApp, defineComponent, ref, h, VNode, App, Plugin, nextTick } from 'vue';
import { MessageProps, MessageType } from './message.interface';
import MessageComp from './message.vue';

function create(props: MessageProps): void {
  const visible = ref(false);
  const root = document.createElement('div');
  document.body.appendChild(root);

  const component = defineComponent({
    render: (): VNode =>
      h(MessageComp, {
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
  MessageComp[type] = (options: MessageProps | string) => {
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

((MessageComp as unknown) as Plugin).install = (app: App) => {
  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$message = MessageComp;
};

type MessageApi = Plugin & {
  /** 展示普通消息 */
  info: (options?: MessageProps | string) => void,
  /** 展示成功消息 */
  success: (options?: MessageProps | string) => void,
  /** 展示警示消息 */
  warning: (options?: MessageProps | string) => void,
  /** 展示错误消息 */
  error: (options?: MessageProps | string) => void,
};

export default (MessageComp as unknown) as MessageApi;

declare module "@vue/runtime-core" {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
