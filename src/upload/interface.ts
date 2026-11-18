import { TdUploadProps } from './type';
import type { TdUploadInternalProps } from './internal-props';
import {
  XhrOptions,
  InnerProgressContext,
  HTMLInputEvent,
  FlowRemoveContext,
  UploadRemoveOptions,
  SuccessContext,
} from '../_common/js/upload/types';

export type UploadProps = TdUploadProps & TdUploadInternalProps;
export * from './type';
export type { TdUploadInternalProps } from './internal-props';

export type {
  XhrOptions,
  HTMLInputEvent,
  InnerProgressContext,
  SuccessContext,
  UploadRemoveOptions,
  FlowRemoveContext,
};
