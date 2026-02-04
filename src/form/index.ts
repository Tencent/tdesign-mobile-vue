import _Form from './form';
import _FormItem from './form-item';
import { withInstall } from '../shared';
import { TdFormProps, TdFormItemProps } from './type';

import './style';

export * from './type';
export type FormProps = TdFormProps;
export type FormItemProps = TdFormItemProps;

export const Form = withInstall(_Form);
export const FormItem = withInstall(_FormItem);
export default Form;
