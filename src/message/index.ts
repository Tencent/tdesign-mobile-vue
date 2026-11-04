// import { withInstall, WithInstallType } from '../shared';
import _Message from './message';

import './style';

import { TdMessageProps } from './type';

export * from './type';
export type MessageProps = TdMessageProps;

export { MessagePlugin } from './plugin';

// Message 与 Plugin 名称冲突，暂不导出
// export const Message: WithInstallType<typeof _Message> = withInstall(_Message);
// export default Message;
