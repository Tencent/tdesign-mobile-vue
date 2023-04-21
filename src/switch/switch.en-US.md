:: BASE_DOC ::

## API
### Switch Props

name | type | default | description | required
-- | -- | -- | -- | --
colors | Array | - | `deprecated`。Typescript：`string[]` | N
customValue | Array | - | Typescript：`Array<SwitchValue>` | N
disabled | Boolean | - | \- | N
icon | Array | [] | Typescript：`TNode[]`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | Array | [] | Typescript：`string[]` | N
loading | Boolean | false | \- | N
size | String | medium | options：small/medium/large | N
value | String / Number / Boolean | - | `v-model` and `v-model:value` is supported。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
onChange | Function |  | Typescript：`(value: T) => void`<br/> | N

### Switch Events

name | params | description
-- | -- | --
change | `(value: T)` | \-
