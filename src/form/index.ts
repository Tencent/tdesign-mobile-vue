import _Form from './form.vue';
import _FormItem from './form-item.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdFormProps, TdFormItemProps } from './type';

import './style';

export * from './type';
export type FormProps = TdFormProps;
export type FormItemProps = TdFormItemProps;

export const Form: WithInstallType<typeof _Form> = withInstall(_Form);
export const FormItem: WithInstallType<typeof _FormItem> = withInstall(_FormItem);
