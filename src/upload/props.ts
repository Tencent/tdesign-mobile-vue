/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdUploadProps, UploadFile } from './type';
import { PropType } from 'vue';

export default {
  /** 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) */
  accept: {
    type: String,
    default: '',
  },
  /** 上传接口。设接口响应数据为字段 `response`，那么 `response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片或文件 */
  action: {
    type: String,
    default: '',
  },
  /** 添加按钮内容。值为空，使用默认图标渲染；值为 slot 则表示使用插槽渲染；其他值无效 */
  addContent: {
    type: [String, Function] as PropType<TdUploadProps['addContent']>,
  },
  /** 是否允许重复上传相同文件名的文件 */
  allowUploadDuplicateFile: Boolean,
  /** 是否在选择文件后自动发起请求上传文件 */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /** 如果是自动上传模式 `autoUpload=true`，表示全部文件上传之前的钩子函数，函数参数为上传的文件，函数返回值决定是否继续上传，若返回值为 `false` 则终止上传。<br/>如果是非自动上传模式 `autoUpload=false`，则函数返回值为 `false` 时表示本次选中的文件不会加入到文件列表中，即不触发 `onChange` 事件 */
  beforeAllFilesUpload: {
    type: Function as PropType<TdUploadProps['beforeAllFilesUpload']>,
  },
  /** 如果是自动上传模式 `autoUpload=true`，表示单个文件上传之前的钩子函数，若函数返回值为 `false` 则表示不上传当前文件。<br/>如果是非自动上传模式 `autoUpload=false`，函数返回值为 `false` 时表示从上传文件中剔除当前文件 */
  beforeUpload: {
    type: Function as PropType<TdUploadProps['beforeUpload']>,
  },
  /** 图片选取模式，可选值为 camera (直接调起摄像头) */
  capture: {
    type: String,
  },
  /** 上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。`autoUpload=true` 时有效。也可以使用 `formatRequest` 完全自定义上传请求的字段 */
  data: {
    type: Object as PropType<TdUploadProps['data']>,
  },
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 用于完全自定义文件列表界面内容(UI)，单文件和多文件均有效 */
  fileListDisplay: {
    type: Function as PropType<TdUploadProps['fileListDisplay']>,
  },
  /** 已上传文件列表，同 `value`。TS 类型：`UploadFile` */
  files: {
    type: Array as PropType<TdUploadProps['files']>,
    default: undefined,
  },
  /** 已上传文件列表，同 `value`。TS 类型：`UploadFile`，非受控属性 */
  defaultFiles: {
    type: Array as PropType<TdUploadProps['defaultFiles']>,
    default: (): TdUploadProps['defaultFiles'] => [],
  },
  /** 转换文件 `UploadFile` 的数据结构，可新增或修改 `UploadFile` 的属性，注意不能删除 `UploadFile` 属性。`action` 存在时有效 */
  format: {
    type: Function as PropType<TdUploadProps['format']>,
  },
  /** 用于新增或修改文件上传请求 参数。`action` 存在时有效。一个请求上传一个文件时，默认请求字段有 `file`。<br/>一个请求上传多个文件时，默认字段有 `file[0]/file[1]/file[2]/.../length`，其中 `length` 表示本次上传的文件数量。<br/>⚠️非常注意，此处的 `file[0]/file[1]` 仅仅是一个字段名，并非表示 `file` 是一个数组，接口获取字段时注意区分。<br/>可以使用 `name` 定义 `file` 字段的别名。<br/>也可以使用 `formatRequest` 自定义任意字段，如添加一个字段 `fileList` ，存储文件数组 */
  formatRequest: {
    type: Function as PropType<TdUploadProps['formatRequest']>,
  },
  /** 用于格式化文件上传后的接口响应数据，`response` 便是接口响应的原始数据。`action` 存在时有效。<br/> 此函数的返回值 `error` 或 `response.error` 会作为错误文本提醒，如果存在会判定为本次上传失败。<br/> 此函数的返回值 `url` 或 `response.url` 会作为上传成功后的链接 */
  formatResponse: {
    type: Function as PropType<TdUploadProps['formatResponse']>,
  },
  /** 设置上传的请求头部，`action` 存在时有效 */
  headers: {
    type: Object as PropType<TdUploadProps['headers']>,
  },
  /** 透传 Image 组件全部属性 */
  imageProps: {
    type: Object as PropType<TdUploadProps['imageProps']>,
  },
  /** 多个文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件。`theme=file-flow` 时有效 */
  isBatchUpload: Boolean,
  /** 用于控制文件上传数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** HTTP 请求类型 */
  method: {
    type: String as PropType<TdUploadProps['method']>,
    default: 'POST' as TdUploadProps['method'],
    validator(val: TdUploadProps['method']): boolean {
      if (!val) return true;
      return ['POST', 'GET', 'PUT', 'OPTIONS', 'PATCH', 'post', 'get', 'put', 'options', 'patch'].includes(val);
    },
  },
  /** 模拟进度间隔时间，单位：毫秒，默认：300。由于原始的上传请求，小文件上传进度只有 0 和 100，故而新增模拟进度，每间隔 `mockProgressDuration` 毫秒刷新一次模拟进度。小文件设置小一点，大文件设置大一点。注意：当 `useMockProgress` 为真时，当前设置有效 */
  mockProgressDuration: {
    type: Number,
  },
  /** 支持多文件上传 */
  multiple: Boolean,
  /** 文件上传时的名称 */
  name: {
    type: String,
    default: 'file',
  },
  /** 是否支持图片预览，文件没有预览 */
  preview: {
    type: Boolean,
    default: true,
  },
  /** 是否显示图片的删除按钮 */
  removeBtn: {
    type: Boolean,
    default: true,
  },
  /** 自定义上传方法。返回值 `status` 表示上传成功或失败；`error` 或 `response.error` 表示上传失败的原因；<br/>`response` 表示请求上传成功后的返回数据，`response.url` 表示上传成功后的图片/文件地址，`response.files` 表示一个请求上传多个文件/图片后的返回值。<br/>示例一：`{ status: 'fail', error: '上传失败', response }`。<br/>示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }`。<br/> 示例三：`{ status: 'success', files: [{ url: 'https://xxx.png', name: 'xxx.png' }]}` */
  requestMethod: {
    type: Function as PropType<TdUploadProps['requestMethod']>,
  },
  /** 图片文件大小限制，默认单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }` */
  sizeLimit: {
    type: [Number, Object] as PropType<TdUploadProps['sizeLimit']>,
  },
  /** 是否在请求时间超过 300ms 后显示模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传 */
  useMockProgress: {
    type: Boolean,
    default: true,
  },
  /** 是否在同一个请求中上传全部文件，默认一个请求上传一个文件。多文件上传时有效 */
  uploadAllFilesInOneRequest: Boolean,
  /** 已上传文件列表，同 `files`。TS 类型：`UploadFile` */
  value: {
    type: Array as PropType<TdUploadProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<TdUploadProps['value']>,
    default: undefined,
  },
  /** 已上传文件列表，同 `files`。TS 类型：`UploadFile`，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdUploadProps['defaultValue']>,
    default: (): TdUploadProps['defaultValue'] => [],
  },
  /** 上传请求时是否携带 cookie */
  withCredentials: Boolean,
  /** 点击「取消上传」时触发 */
  onCancelUpload: Function as PropType<TdUploadProps['onCancelUpload']>,
  /** 已上传文件列表发生变化时触发，`trigger` 表示触发本次的来源 */
  onChange: Function as PropType<TdUploadProps['onChange']>,
  /** 点击上传区域时触发 */
  onClickUpload: Function as PropType<TdUploadProps['onClickUpload']>,
  /** 上传失败后触发。`response` 指接口响应结果，`response.error` 会作为错误文本提醒。如果希望判定为上传失败，但接口响应数据不包含 `error` 字段，可以使用 `formatResponse` 格式化 `response` 数据结构。如果是多文件多请求上传场景，请到事件 `onOneFileFail` 中查看 `response` */
  onFail: Function as PropType<TdUploadProps['onFail']>,
  /** 多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发 */
  onOneFileFail: Function as PropType<TdUploadProps['onOneFileFail']>,
  /** 单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据 */
  onOneFileSuccess: Function as PropType<TdUploadProps['onOneFileSuccess']>,
  /** 点击图片预览时触发，文件没有预览 */
  onPreview: Function as PropType<TdUploadProps['onPreview']>,
  /** 上传进度变化时触发，真实进度和模拟进度都会触发。<br/>⚠️ 原始上传请求，小文件的上传进度只有 0 和 100，故而不会触发 `progress` 事件；只有大文件才有真实的中间进度。如果你希望很小的文件也显示上传进度，保证 `useMockProgress=true` 的情况下，设置 `mockProgressDuration` 为更小的值。<br/>参数 `options.type=real` 表示真实上传进度，`options.type=mock` 表示模拟上传进度 */
  onProgress: Function as PropType<TdUploadProps['onProgress']>,
  /** 移除文件时触发 */
  onRemove: Function as PropType<TdUploadProps['onRemove']>,
  /** 选择文件或图片之后，上传之前，触发该事件 */
  onSelectChange: Function as PropType<TdUploadProps['onSelectChange']>,
  /** 上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件（无论成功或失败），`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br /> */
  onSuccess: Function as PropType<TdUploadProps['onSuccess']>,
  /** 文件上传校验结束事件，文件数量超出、文件大小超出限制、文件同名、`beforeAllFilesUpload` 返回值为假、`beforeUpload` 返回值为假等场景会触发。<br/>注意：如果设置允许上传同名文件，即 `allowUploadDuplicateFile=true`，则不会因为文件重名触发该事件。<br/>结合 `status` 和 `tips` 可以在组件中呈现不同类型的错误（或告警）提示 */
  onValidate: Function as PropType<TdUploadProps['onValidate']>,
  /** 待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源 */
  onWaitingUploadFilesChange: Function as PropType<TdUploadProps['onWaitingUploadFilesChange']>,
};
