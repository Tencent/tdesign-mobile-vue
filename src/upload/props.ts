/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdUploadProps } from './type';
import { PropType } from 'vue';

export default {
  /** 接受上传的文件类型，[查看 W3C示例](https://www.w3schools.com/tags/att_input_accept.asp)，[查看 MDN 示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) */
  accept: {
    type: String,
    default: '',
  },
  /** 上传接口 */
  action: {
    type: String,
    default: '',
  },
  /** 是否允许重复上传相同文件名的文件 */
  allowUploadDuplicateFile: Boolean,
  /** 是否选取文件后自动上传 */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /** 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传 */
  beforeUpload: {
    type: Function as PropType<TdUploadProps['beforeUpload']>,
  },
  /** 上传文件时所需的额外数据 */
  data: {
    type: Object as PropType<TdUploadProps['data']>,
  },
  /** 删除图标。值为空，使用默认图标渲染；值为 slot 则表示使用插槽渲染；其他值无效。 */
  deleteBtn: {
    type: [String, Function] as PropType<TdUploadProps['deleteBtn']>,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 【开发中】用于完全自定义文件列表内容 */
  fileListDisplay: {
    type: Function as PropType<TdUploadProps['fileListDisplay']>,
  },
  /** 已上传文件列表 */
  files: {
    type: Array as PropType<TdUploadProps['files']>,
  },
  /** 已上传文件列表，非受控属性 */
  defaultFiles: {
    type: Array as PropType<TdUploadProps['defaultFiles']>,
  },
  /** 文件上传前转换文件数据 */
  format: {
    type: Function as PropType<TdUploadProps['format']>,
  },
  /** 用于格式化文件上传后的响应数据。error 用于显示错误提示，如果 error 值为真，组件会判定为上传失败；url 用于上传文件/图片地址。 */
  formatResponse: {
    type: Function as PropType<TdUploadProps['formatResponse']>,
  },
  /** upload组件每行上传图片列数以及图片的宽度和高度 */
  gridConfig: {
    type: Object as PropType<TdUploadProps['gridConfig']>,
  },
  /** 设置上传的请求头部 */
  headers: {
    type: Object as PropType<TdUploadProps['headers']>,
  },
  /** 透传 Image 组件全部属性 */
  imageProps: {
    type: Object as PropType<TdUploadProps['imageProps']>,
  },
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
      return ['POST', 'GET', 'PUT', 'OPTION', 'PATCH', 'post', 'get', 'put', 'option', 'patch'].includes(val);
    },
  },
  /** 是否支持多选文件 */
  multiple: Boolean,
  /** 自定义上传方法。返回值 status 表示上传成功或失败，error 表示上传失败的原因，response 表示请求上传成功后的返回数据，response.url 表示上传成功后的图片地址。示例一：`{ status: 'fail', error: '上传失败', response }`。示例二：`{ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } }` */
  requestMethod: {
    type: Function as PropType<TdUploadProps['requestMethod']>,
  },
  /** 图片文件大小限制，单位 KB。可选单位有：`'B' | 'KB' | 'MB' | 'GB'`。示例一：`1000`。示例二：`{ size: 2, unit: 'MB', message: '图片大小不超过 {sizeLimit} MB' }` */
  sizeLimit: {
    type: [Number, Object] as PropType<TdUploadProps['sizeLimit']>,
  },
  /** 触发上传的内容 */
  trigger: {
    type: [String, Function] as PropType<TdUploadProps['trigger']>,
  },
  /** 是否显示为模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传 */
  useMockProgress: {
    type: Boolean,
    default: true,
  },
  /** 上传请求时是否携带 cookie */
  withCredentials: Boolean,
  /** 点击「取消上传」时触发 */
  onCancelUpload: Function as PropType<TdUploadProps['onCancelUpload']>,
  /** 已上传文件列表发生变化时触发 */
  onChange: Function as PropType<TdUploadProps['onChange']>,
  /** 上传失败后触发 */
  onFail: Function as PropType<TdUploadProps['onFail']>,
  /** 点击预览时触发 */
  onPreview: Function as PropType<TdUploadProps['onPreview']>,
  /** 上传进度变化时触发，真实进度和模拟进度都会触发。type 值为 real 表示真实上传进度，type 值为 mock 表示模拟上传进度 */
  onProgress: Function as PropType<TdUploadProps['onProgress']>,
  /** 移除文件时触发 */
  onRemove: Function as PropType<TdUploadProps['onRemove']>,
  /** 文件选择后，上传开始前，触发 */
  onSelectChange: Function as PropType<TdUploadProps['onSelectChange']>,
  /** 上传成功后触发，`context.currentFiles` 表示当次请求上传的文件，`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br />⚠️ `context.file` 请勿使用 */
  onSuccess: Function as PropType<TdUploadProps['onSuccess']>,
};
