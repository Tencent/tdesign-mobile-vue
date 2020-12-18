import { createApp, defineComponent, ref, h, VNode, App, Plugin, nextTick } from 'vue';
import { IMessageProps, MessageType } from './message.interface';
import { PolySymbol } from '../_utils';
import MessageComp from './message.vue';

function create(props: IMessageProps): void {
  const visible = ref(false);
  const root: HTMLElement = document.createElement('div');
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
  MessageComp[type] = (options: IMessageProps | string) => {
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

((MessageComp as unknown) as Plugin).install = (app: App) => {
  // 添加插件入口
  const messageKey = PolySymbol<typeof MessageComp & Plugin>('message');
  app.provide(messageKey, MessageComp);
};

type MessageFnType = {
  [k in MessageType]: (options: IMessageProps | string) => void;
};
export default (MessageComp as unknown) as Plugin & MessageFnType;
