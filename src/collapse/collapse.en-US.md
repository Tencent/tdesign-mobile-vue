:: BASE_DOC ::

## API

### Collapse Props

name | type | default | description | required
-- | -- | -- | -- | --
defaultExpandAll | Boolean | false | \- | N
disabled | Boolean | - | \- | N
expandIcon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
expandMutex | Boolean | false | \- | N
theme | String | default | options：default/card | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`CollapseValue` `type CollapseValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/collapse/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`CollapseValue` `type CollapseValue = Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/collapse/type.ts) | N
onChange | Function |  | Typescript：`(value: CollapseValue, context: { e: MouseEvent }) => void`<br/> | N

### Collapse Events

name | params | description
-- | -- | --
change | `(value: CollapseValue, context: { e: MouseEvent })` | \-

### CollapsePanel Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
destroyOnCollapse | Boolean | false | \- | N
disabled | Boolean | undefined | \- | N
expandIcon | Boolean / Slot / Function | undefined | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
headerRightContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placement | String | bottom | options：bottom/top | N
value | String / Number | - | \- | N
