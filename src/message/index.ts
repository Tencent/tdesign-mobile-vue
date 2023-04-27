import { createApp, defineComponent, ref, h, VNode, App, nextTick } from 'vue';
import Message from './message.vue';
import { WithInstallType } from '../shared';
import { TdMessageProps, MessageThemeList } from './type';

import './style';

interface MessageActionOptionsType extends TdMessageProps {
  context?: HTMLElement;
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
      h(Message, {
        ...otherOptions,
        visible: visible.value,
        onDurationEnd: () => {
          visible.value = false;
        },
        onCloseBtnClick: () => {
          visible.value = false;
        },
      }),
  });

  createApp(component).mount(root);

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
  Message[theme] = (options: TdMessageProps | string) => {
    let props: TdMessageProps = {
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

Message.install = (app: App, name = '') => {
  app.component(name || Message.name, Message);

  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$message = Message as any;
};

type MessageApi = {
  /** 展示普通消息 */
  info: (options?: TdMessageProps | string) => void;
  /** 展示成功消息 */
  success: (options?: TdMessageProps | string) => void;
  /** 展示警示消息 */
  warning: (options?: TdMessageProps | string) => void;
  /** 展示错误消息 */
  error: (options?: TdMessageProps | string) => void;
};

export const MessagePlugin: WithInstallType<typeof Message> & MessageApi = Message as any;
export default MessagePlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  export interface ComponentCustomProperties {
    $message: MessageApi;
  }
}
