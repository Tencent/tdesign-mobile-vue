:: BASE_DOC ::

## API

### TreeSelect Props

name | type | default | description | required
-- | -- | -- | -- | --
customStyle | String | - | \- | N
filterable | Boolean | false | \- | N
height | String / Number | 336 | \- | N
keys | Object | - | alias filed name in data。Typescript：`TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
multiple | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<DataOption>` | N
value | String / Number / Array | - | `v-model` and `v-model:value` is supported。Typescript：`TreeSelectValue` `type TreeSelectValue = string \| number \| Array<TreeSelectValue>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Array | - | uncontrolled property。Typescript：`TreeSelectValue` `type TreeSelectValue = string \| number \| Array<TreeSelectValue>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
onChange | Function |  | Typescript：`(value: TreeSelectValue, level: TreeLevel)  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`type TreeLevel = 0 \| 1 \| 2`<br/> | N

### TreeSelect Events

name | params | description
-- | -- | --
change | `(value: TreeSelectValue, level: TreeLevel) ` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`type TreeLevel = 0 \| 1 \| 2`<br/>

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-tree-bg-color | @bg-color-container | -
--td-tree-colum-text-color | @text-color-primary | -
--td-tree-colum-width | 103px | -
--td-tree-item-active-color | @brand-color | -
--td-tree-item-disabled-color | @text-color-disabled | -
--td-tree-item-font-size | 16px | -
--td-tree-item-height | 56px | -
--td-tree-root-bg-color | @bg-color-secondarycontainer | -
