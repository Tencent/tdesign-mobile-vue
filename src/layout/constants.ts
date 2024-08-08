import { InjectionKey } from 'vue';
import { TdRowProps } from './type';

export const rowInjectionKey: InjectionKey<{
  gutter: TdRowProps['gutter'];
}> = Symbol('RowProvide');
