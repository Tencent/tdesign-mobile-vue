:: BASE_DOC ::

## API


### PickerItem Props

name | type | default | description | required
-- | -- | -- | -- | --
format | Function | - | Typescript：`(option: PickerItemOption) => string` | N
options | Array | [] | Typescript：`PickerItemOption[]` `interface PickerItemOption { label: string; value: string \| number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
