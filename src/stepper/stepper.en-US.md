:: BASE_DOC ::

## API

### Stepper Props

name | type | default | description | required
-- | -- | -- | -- | --
disableInput | Boolean | false | \- | N
disabled | Boolean | false | \- | N
inputWidth | Number | - | \- | N
max | Number | 100 | \- | N
min | Number | 0 | \- | N
size | String | medium | options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
step | Number | 1 | \- | N
theme | String | normal | stylish。options：normal/filled/outline | N
value | String / Number | 0 | `v-model` and `v-model:value` is supported | N
defaultValue | String / Number | 0 | uncontrolled property | N
onBlur | Function |  | Typescript：`(value: string \| number) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string \| number) => void`<br/> | N
onOverlimit | Function |  | Typescript：`(type: 'minus' \| 'plus') => void`<br/> | N

### Stepper Events

name | params | description
-- | -- | --
blur | `(value: string \| number)` | \-
change | `(value: string \| number)` | \-
overlimit | `(type: 'minus' \| 'plus')` | \-
