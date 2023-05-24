:: BASE_DOC ::

## API
### Upload Props

name | type | default | description | required
-- | -- | -- | -- | --
accept | String | - | \- | N
action | String | - | upload action url | N
addContent | String / Slot / Function | - | \- | N
allowUploadDuplicateFile | Boolean | false | \- | N
autoUpload | Boolean | true | \- | N
beforeUpload | Function | - | Typescript：`(file: UploadFile) => boolean \| Promise<boolean>` | N
data | Object | - | Typescript：`Record<string, any> \| ((files: UploadFile[]) => Record<string, any>)` | N
disabled | Boolean | - | \- | N
fileListDisplay | Slot / Function | - | Typescript：`TNode<{ files: UploadFile[]; dragEvents?: UploadDisplayDragEvents }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
files | Array | [] | `v-model:files` is supported。Typescript：`Array<T>` | N
defaultFiles | Array | [] | uncontrolled property。Typescript：`Array<T>` | N
format | Function | - | Typescript：`(file: File) => UploadFile` | N
formatRequest | Function | - | Typescript：`(requestData: { [key: string]: any }) => { [key: string]: any }` | N
formatResponse | Function | - | Typescript：`(response: any, context: FormatResponseContext) => ResponseType ` `type ResponseType = { error?: string; url?: string } & Record<string, any>` `interface FormatResponseContext { file: UploadFile; currentFiles?: UploadFile[] }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
headers | Object | - | Typescript：`{[key: string]: string}` | N
imageProps | Object | - | Typescript：`ImageProps`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
max | Number | 0 | \- | N
method | String | POST | options：POST/GET/PUT/OPTION/PATCH/post/get/put/option/patch | N
multiple | Boolean | false | \- | N
requestMethod | Function | - | Typescript：`(files: UploadFile \| UploadFile[]) => Promise<RequestMethodResponse>` `interface RequestMethodResponse { status: 'success' \| 'fail'; error?: string; response: { url?: string; files?: UploadFile[]; [key: string]: any } }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
sizeLimit | Number / Object | - | Typescript：`number \| SizeLimitObj` `interface SizeLimitObj { size: number; unit: SizeUnit ; message?: string }` `type SizeUnitArray = ['B', 'KB', 'MB', 'GB']` `type SizeUnit = SizeUnitArray[number]`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts) | N
useMockProgress | Boolean | true | \- | N
withCredentials | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: Array<T>, context: UploadChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/> | N
onFail | Function |  | Typescript：`(options: UploadFailContext) => void`<br/>`response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/> | N
onPreview | Function |  | Typescript：`(options: { file: UploadFile; index: number; e: MouseEvent }) => void`<br/> | N
onProgress | Function |  | Typescript：`(options: ProgressContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/> | N
onRemove | Function |  | Typescript：`(context: UploadRemoveContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/> | N
onSelectChange | Function |  | Typescript：`(files: File[], context: UploadSelectChangeContext) => void`<br/>trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/> | N
onSuccess | Function |  | Typescript：`(context: SuccessContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/> | N
onValidate | Function |  | Typescript：`(context: { type: UploadValidateType, files: UploadFile[] }) => void`<br/>trigger on length over limit, or trigger on file size over limit。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`type UploadValidateType = 'FILE_OVER_SIZE_LIMIT' \| 'FILES_OVER_LENGTH_LIMIT' \| 'FILTER_FILE_SAME_NAME' \| 'BEFORE_ALL_FILES_UPLOAD' \| 'CUSTOM_BEFORE_UPLOAD'`<br/> | N

### Upload Events

name | params | description
-- | -- | --
change | `(value: Array<T>, context: UploadChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadChangeContext { e?: MouseEvent \| ProgressEvent; response?: any; trigger: UploadChangeTrigger; index?: number; file?: UploadFile; files?: UploadFile[] }`<br/><br/>`type UploadChangeTrigger = 'add' \| 'remove' \| 'abort' \| 'progress-success' \| 'progress' \| 'progress-fail'`<br/>
fail | `(options: UploadFailContext)` | `response.error` used for error tips, `formatResponse` can format `response`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadFailContext { e?: ProgressEvent; failedFiles: UploadFile[]; currentFiles: UploadFile[]; response?: any; file: UploadFile; XMLHttpRequest?: XMLHttpRequest}`<br/>
preview | `(options: { file: UploadFile; index: number; e: MouseEvent })` | \-
progress | `(options: ProgressContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface ProgressContext { e?: ProgressEvent; file?: UploadFile; currentFiles: UploadFile[]; percent: number; type: UploadProgressType; XMLHttpRequest?: XMLHttpRequest }`<br/><br/>`type UploadProgressType = 'real' \| 'mock'`<br/>
remove | `(context: UploadRemoveContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadRemoveContext { index?: number; file?: UploadFile; e: MouseEvent }`<br/>
select-change | `(files: File[], context: UploadSelectChangeContext)` | trigger after file choose and before upload。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface UploadSelectChangeContext { currentSelectedFiles: UploadFile[] }`<br/>
success | `(context: SuccessContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/upload/type.ts)。<br/>`interface SuccessContext { e?: ProgressEvent; file?: UploadFile; fileList?: UploadFile[]; currentFiles?: UploadFile[]; response?: any; results?: SuccessContext[]; XMLHttpRequest?: XMLHttpRequest }`<br/>
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
