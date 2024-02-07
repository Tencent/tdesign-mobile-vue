:: BASE_DOC ::

## API

### Upload Props

name | type | default | description | required
-- | -- | -- | -- | --
accept | String | - | File types that can be accepted. [W3C](https://www.w3schools.com/tags/att_input_accept.asp)，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) | N
action | String | - | Uploading URL | N
addContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
allowUploadDuplicateFile | Boolean | false | allow to upload duplicate name files | N
autoUpload | Boolean | true | post upload request automatically after files being selected | N
beforeUpload | Function | - | stop one of files to upload。Typescript：`(file: UploadFile) => boolean \| Promise<boolean>` | N
data | Object | - | extra request data of uploading. `formatRequest` can redefine all request data。Typescript：`Record<string, any> \| ((files: UploadFile[]) => Record<string, any>)` | N
disabled | Boolean | - | make upload to be disabled | N
fileListDisplay | Slot / Function | - | used to render file list UI。Typescript：`TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
files | Array | [] | `v-model:files` is supported。Typescript：`Array<T>` | N
defaultFiles | Array | [] | uncontrolled property。Typescript：`Array<T>` | N
format | Function | - | to redefine  `UploadFile` data structure。Typescript：`(file: File) => UploadFile` | N
formatRequest | Function | - | redefine request data。Typescript：`(requestData: { [key: string]: any }) => { [key: string]: any }` | N
formatResponse | Function | - | redefine response data structure。Typescript：`(response: any, context: FormatResponseContext) => ResponseType ` `type ResponseType = { error?: string; url?: string } & Record<string, any>` `interface FormatResponseContext { file: UploadFile; currentFiles?: UploadFile[] }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
headers | Object | - | HTTP Request Header。Typescript：`{[key: string]: string}` | N
imageProps | Object | - | Typescript：`ImageProps`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
max | Number | 0 | max count of files limit | N
method | String | POST | HTTP request method。options: POST/GET/PUT/OPTION/PATCH/post/get/put/option/patch | N
multiple | Boolean | false | multiple files uploading | N
requestMethod | Function | - | custom upload request method。Typescript：`(files: UploadFile \| UploadFile[]) => Promise<RequestMethodResponse>` `interface RequestMethodResponse { status: 'success' \| 'fail'; error?: string; response: { url?: string; files?: UploadFile[]; [key: string]: any } }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
sizeLimit | Number / Object | - | files size limit。Typescript：`number \| SizeLimitObj` `interface SizeLimitObj { size: number; unit: SizeUnit ; message?: string }` `type SizeUnitArray = ['B', 'KB', 'MB', 'GB']` `type SizeUnit = SizeUnitArray[number]`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
useMockProgress | Boolean | true | use mock progress, instead of real progress | N
value | Array | [] | file list。`v-model` and `v-model:value` is supported。Typescript：`Array<T>` | N
defaultValue | Array | [] | file list。uncontrolled property。Typescript：`Array<T>` | N
withCredentials | Boolean | false | uploading request with cookie | N
onChange | Function |  | Typescript：`(value: Array<T>, context: UploadChangeContext) => void`<br/>trigger on uploaded files change。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/> | N
onFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>`response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/> | N
onPreview | Function |  | Typescript：`(options: { file: UploadFile; index: number; e: MouseEvent }) => void`<br/>trigger on preview elements click | N
onProgress | Function |  | Typescript：`(options: ProgressContext) => void`<br/>uploading request progress event。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/> | N
onRemove | Function |  | Typescript：`(context: UploadRemoveContext) => void`<br/>trigger on file removed。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/> | N
onSelectChange | Function |  | Typescript：`(files: File[], context: UploadSelectChangeContext) => void`<br/>trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/> | N
onSuccess | Function |  | Typescript：`(context: SuccessContext) => void`<br/>trigger on all files uploaded successfully。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/> | N
onValidate | Function |  | Typescript：`(context: { type: UploadValidateType, files: UploadFile[] }) => void`<br/>trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/> | N

### Upload Events

name | params | description
-- | -- | --
change | `(value: Array<T>, context: UploadChangeContext)` | trigger on uploaded files change。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/>
fail | `(options: UploadFailContext)` | `response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/>
preview | `(options: { file: UploadFile; index: number; e: MouseEvent })` | trigger on preview elements click
progress | `(options: ProgressContext)` | uploading request progress event。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/>
remove | `(context: UploadRemoveContext)` | trigger on file removed。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/>
select-change | `(files: File[], context: UploadSelectChangeContext)` | trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/>
success | `(context: SuccessContext)` | trigger on all files uploaded successfully。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/>
validate | `(context: { type: UploadValidateType, files: UploadFile[] })` | trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/>

### UploadFile

name | type | default | description | required
-- | -- | -- | -- | --
lastModified | Number | - | \- | N
name | String | - | \- | N
percent | Number | - | \- | N
raw | Object | - | Typescript：`File` | N
response | Object | - | Typescript：`{ [key: string]: any }` | N
size | Number | - | \- | N
status | String | - | Typescript：` 'success' \| 'fail' \| 'progress' \| 'waiting'` | N
type | String | - | \- | N
uploadTime | String | - | upload time | N
url | String | - | \- | N
`PlainObject` | \- | - | `PlainObject` is not an attribute of UploadFile，it means you can add and attributes to UploadFile, `type PlainObject = {[key: string]: any}`' | N
