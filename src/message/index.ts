import { createApp, defineComponent, ref, h, VNode, App, Plugin } from 'vue';
import { IMessageProps, MessageType } from './message.interface';
import { PolySymbol } from '../_utils';
import MessageComp from './message.vue';

const Message = MessageComp as (typeof MessageComp & Plugin);

function create(props: IMessageProps): void {
  const visible = ref(false);
  const root: HTMLElement = document.createElement('div');
  document.body.appendChild(root);

  const component = defineComponent({
    render: (): VNode => h(MessageComp, {
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

  setTimeout(() => {
    visible.value = true;
  }, 0);
}

(['info', 'success', 'warning', 'error'] as MessageType[]).forEach((type: MessageType): void => {
  Message[type] = (options: IMessageProps | string) => {
    let props: IMessageProps = {
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

Message.install = (app: App) => {
  // 添加插件入口
  const messageKey = PolySymbol<typeof Message>('message');
  app.provide(messageKey, Message);
};

export default Message;
