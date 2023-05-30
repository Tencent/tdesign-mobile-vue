:: BASE_DOC ::

## API
### DropdownMenu Props

name | type | default | description | required
-- | -- | -- | -- | --
closeOnClickOverlay | Boolean | true | \- | N
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
optionsLayout | String | columns | `deprecated` | N
value | String / Number | undefined | `v-model` and `v-model:value` is supported。Typescript：`DropdownValue ` `type DropdownValue = string \| number;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number | undefined | uncontrolled property。Typescript：`DropdownValue ` `type DropdownValue = string \| number;`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onConfirm | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N
onReset | Function |  | Typescript：`(value: DropdownValue) => void`<br/> | N

### DropdownItem Events

name | params | description
-- | -- | --
change | `(value: DropdownValue)` | \-
confirm | `(value: DropdownValue)` | \-
reset | `(value: DropdownValue)` | \-
