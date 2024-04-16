:: BASE_DOC ::

## API

### SideBar Props

name | type | default | description | required
-- | -- | -- | -- | --
value | String / Number | - | `v-model` and `v-model:value` is supported | N
defaultValue | String / Number | - | uncontrolled property | N
onChange | Function |  | Typescript：`(value: number \| string) => void`<br/> | N
onClick | Function |  | Typescript：`(value: number \| string, label: string) => void`<br/> | N

### SideBar Events

name | params | description
-- | -- | --
change | `(value: number \| string)` | \-
click | `(value: number \| string, label: string)` | \-


### SideBarItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badgeProps | Object | - | \- | N
disabled | Boolean | false | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String | - | \- | N
value | String / Number | - | \- | N

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-side-bar-active-color | @brand-color | - 
--td-side-bar-bg-color | @bg-color-secondarycontainer | - 
--td-side-bar-bg-color | @bg-color-secondarycontainer | - 
--td-side-bar-border-radius | 9px | - 
--td-side-bar-color | @font-gray-1 | - 
--td-side-bar-disabled-color | @font-gray-4 | - 
--td-side-bar-font-size | 16px | - 
--td-side-bar-height | 100% | - 
--td-side-bar-icon-size | 20px | - 
--td-side-bar-item-height | 56px | - 
--td-side-bar-item-line-height | 24px | - 
--td-side-bar-width | 103px | -