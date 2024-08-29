import _Toast from './toast';

import './style';

import { TdToastProps } from './type';

export * from './type';
export type ToastProps = TdToastProps;

export { default as ToastPlugin } from './plugin';

// Toast 与 Plugin函数名称冲突，暂不导出
// export const Toast: WithInstallType<typeof _Toast> = withInstall(_Toast);
// export default Toast;
