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
