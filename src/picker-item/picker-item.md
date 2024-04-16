:: BASE_DOC ::

## API


### PickerItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
format | Function | - | 格式化标签。TS 类型：`(option: PickerItemOption) => string` | N
options | Array | [] | 数据源。TS 类型：`PickerItemOption[]` `interface PickerItemOption { label: string; value: string \| number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
