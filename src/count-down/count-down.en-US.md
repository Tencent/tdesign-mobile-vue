:: BASE_DOC ::

## API

### CountDown Props

name | type | default | description | required
-- | -- | -- | -- | --
autoStart | Boolean | true | \- | N
content | String / Slot / Function | 'default' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | HH:mm:ss | \- | N
millisecond | Boolean | false | \- | N
size | String | 'medium' | options: small/medium/large | N
splitWithUnit | Boolean | false | \- | N
theme | String | 'default' | options: default/round/square | N
time | Number | - | required | Y
onChange | Function |  | Typescript：`(time: TimeData) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/> | N
onFinish | Function |  | Typescript：`() => void`<br/> | N

### CountDown Events

name | params | description
-- | -- | --
change | `(time: TimeData)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/count-down/type.ts)。<br/>`interface TimeData {  days: number; hours: number; minutes: number; seconds: number; milliseconds: number }`<br/>
finish | \- | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-countdown-bg-color | @error-color-6 | - 
--td-countdown-default-color | @font-gray-1 | - 
--td-countdown-round-border-radius | @radius-circle | - 
--td-countdown-round-color | @font-white-1 | - 
--td-countdown-square-border-radius | @radius-small | -