import type { ExtractPropTypes, PropType } from 'vue';
import type { UploadFile, SuccessContext, UploadFailContext } from './type';

/**
 * 平台（tdesign-api）未纳管、但 mobile-vue 组件内部实现所依赖的扩展 API。
 *
 * ⚠️ 注意：以下成员不属于 tdesign-api 平台输出，请勿写回自动生成的
 * `props.ts` / `type.ts`，否则每次平台重新生成都会产生大量无意义 diff。
 * 新增内部专用的 props / 事件，请统一维护在本文件。
 */
const uploadInternalProps = {
  /** 多个文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件。`theme=file-flow` 时有效 */
  isBatchUpload: Boolean,
  /** 是否在同一个请求中上传全部文件，默认一个请求上传一个文件。多文件上传时有效 */
  uploadAllFilesInOneRequest: Boolean,
  /** 模拟进度间隔时间，单位：毫秒，默认：300。由于原始的上传请求，小文件上传进度只有 0 和 100，故而新增模拟进度，每间隔 `mockProgressDuration` 毫秒刷新一次模拟进度。小文件设置小一点，大文件设置大一点。注意：当 `useMockProgress` 为真时，当前设置有效 */
  mockProgressDuration: Number,
  /** 上传请求的文件字段名称 */
  name: {
    type: String,
    default: 'file',
  },
  /** 如果是自动上传模式 `autoUpload=true`，表示全部文件上传之前的钩子函数，函数参数为上传的文件，函数返回值决定是否继续上传，若返回值为 `false` 则终止上传。<br/>如果是非自动上传模式 `autoUpload=false`，则函数返回值为 `false` 时表示本次选中的文件不会加入到文件列表中，即不触发 `onChange` 事件 */
  beforeAllFilesUpload: Function as PropType<(file: UploadFile[]) => boolean | Promise<boolean>>,
  /** 点击「取消上传」时触发 */
  onCancelUpload: Function as PropType<() => void>,
  /** 多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发 */
  onOneFileFail: Function as PropType<(options: UploadFailContext) => void>,
  /** 单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据 */
  onOneFileSuccess: Function as PropType<
    (context: Pick<SuccessContext, 'e' | 'file' | 'response' | 'XMLHttpRequest'>) => void
  >,
  /** 待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源 */
  onWaitingUploadFilesChange: Function as PropType<
    (context: { files: Array<UploadFile>; trigger: 'validate' | 'remove' | 'uploaded' }) => void
  >,
};

export type TdUploadInternalProps = ExtractPropTypes<typeof uploadInternalProps>;

export default uploadInternalProps;
