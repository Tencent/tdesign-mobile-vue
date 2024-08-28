:: BASE_DOC ::

## API

### Collapse Props

name | type | default | description | required
-- | -- | -- | -- | --
defaultExpandAll | Boolean | false | \- | N
disabled | Boolean | - | \- | N
expandIcon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
expandMutex | Boolean | false | \- | N
theme | String | default | options: default/card | N
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
headerLeftIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
headerRightContent | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placement | String | bottom | options: bottom/top | N
value | String / Number | - | \- | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-collapse-border-color | @border-color | - 
--td-collapse-content-font-size | @font-size-base | - 
--td-collapse-content-line-height | 1.5 | - 
--td-collapse-content-padding | 16px | - 
--td-collapse-content-text-color | @font-gray-1 | - 
--td-collapse-extra-font-size | @font-size-m | - 
--td-collapse-header-text-color | @font-gray-1 | - 
--td-collapse-header-text-disabled-color | @font-gray-4 | - 
--td-collapse-panel-bg-color | @bg-color-container | - 
--td-collapse-title-font-size | @font-size-m | -