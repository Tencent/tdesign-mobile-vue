import { createApp, defineComponent, ref, h, VNode } from 'vue';
import { IMessageProps, MessageType } from './message.interface';
import Message from './message.vue';

function create(props: IMessageProps): void {
  const visible = ref(false);
  const root: HTMLElement = document.createElement('div');
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

  setTimeout(() => {
    visible.value = true;
  }, 0);
}

(['info', 'success', 'warning', 'error'] as MessageType[]).forEach((type: MessageType): void => {
  Message[type] = (options: IMessageProps | string) => {
    let props: IMessageProps = {
      content: '',
    };

    if (typeof options === 'string') {
      props = {
        content: options,
      };
    }

    props.theme = type;
    create(props);
  };
});

export default Message;
