:: BASE_DOC ::

## API
### CountDown Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autoStart | Boolean | true | 是否自动开始倒计时 | N
content | String / Slot / Function | 'default' | 最终倒计时的展示内容，值为'default'时使用默认的格式，否则使用自定义样式插槽。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | HH:mm:ss | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | N
millisecond | Boolean | false | 是否开启毫秒级渲染 | N
size | String | 'medium' | 倒计时尺寸。可选项：small/medium/large | N
splitWithUnit | Boolean | false | 使用时间单位分割 | N
theme | String | 'default' | 倒计时风格。可选项：default/round/square | N
time | Number | - | 必需。倒计时时长，单位毫秒 | Y
onChange | Function |  | TS 类型：`(time: TimeData) => void`<br/>时间变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/> | N
onFinish | Function |  | TS 类型：`() => void`<br/>倒计时结束时触发 | N

### CountDown Events

名称 | 参数 | 描述
-- | -- | --
change | `(time: TimeData)` | 时间变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/>
finish | \- | 倒计时结束时触发


### CSS Variables
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-countdown-bg-color | @error-color-6 | - 
--td-countdown-default-color | @font-gray-1 | - 
--td-countdown-round-border-radius | @radius-circle | - 
--td-countdown-round-color | @font-white-1 | - 
--td-countdown-square-border-radius | @radius-small | - 

## API


### CountDown Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autoStart | Boolean | true | 是否自动开始倒计时 | N
content | String / Slot / Function | 'default' | 最终倒计时的展示内容，值为'default'时使用默认的格式，否则使用自定义样式插槽。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | HH:mm:ss | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | N
millisecond | Boolean | false | 是否开启毫秒级渲染 | N
size | String | 'medium' | 倒计时尺寸。可选项：small/medium/large | N
splitWithUnit | Boolean | false | 使用时间单位分割 | N
theme | String | 'default' | 倒计时风格。可选项：default/round/square | N
time | Number | - | 必需。倒计时时长，单位毫秒 | Y
onChange | Function |  | TS 类型：`(time: TimeData) => void`<br/>时间变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/> | N
onFinish | Function |  | TS 类型：`() => void`<br/>倒计时结束时触发 | N

### CountDown Events

名称 | 参数 | 描述
-- | -- | --
change | `(time: TimeData)` | 时间变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/>
finish | \- | 倒计时结束时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-countdown-bg-color | @error-color-6 | - 
--td-countdown-default-color | @font-gray-1 | - 
--td-countdown-round-border-radius | @radius-circle | - 
--td-countdown-round-color | @font-white-1 | - 
--td-countdown-square-border-radius | @radius-small | -