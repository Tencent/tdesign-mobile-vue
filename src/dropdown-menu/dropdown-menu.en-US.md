:: BASE_DOC ::

## API

### DropdownMenu Props

name | type | default | description | required
-- | -- | -- | -- | --
closeOnClickOverlay | Boolean | true | \- | N
direction | String | down | options: down/up | N
duration | String / Number | 200 | \- | N
showOverlay | Boolean | true | \- | N
zIndex | Number | 11600 | \- | N


### DropdownItem Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | false | \- | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String | - | \- | N
multiple | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<DropdownOption>` `interface DropdownOption { label: string; disabled: boolean; value: DropdownValue; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
optionsColumns | String / Number | 1 | \- | N
value | String / Number / Array | undefined | `v-model` and `v-model:value` is supported。Typescript：`DropdownValue ` `type DropdownValue = string \| number \| Array<DropdownValue>;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number / Array | undefined | uncontrolled property。Typescript：`DropdownValue ` `type DropdownValue = string \| number \| Array<DropdownValue>;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
onChange | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onConfirm | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onReset | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N

### DropdownItem Events

name | params | description
-- | -- | --
change | `(value: DropdownValue)` | \-
confirm | `(value: DropdownValue)` | \-
reset | `(value: DropdownValue)` | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-dropdown-body-max-height | 280px | - 
--td-dropdown-menu-bg-color | @bg-color-container | - 
--td-dropdown-menu-active-colorm | @brand-color | - 
--td-dropdown-menu-bg-colorm | @bg-color-container | - 
--td-dropdown-menu-colorm | @font-gray-1 | - 
--td-dropdown-menu-disabled-colorm | @font-gray-4 | - 
--td-dropdown-menu-font-sizem | 14px | - 
--td-dropdown-menu-icon-sizem | 24px | -