:: BASE_DOC ::

## API
### Badge Props

name | type | default | description | required
-- | -- | -- | -- | --
color | String | - | \- | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
count | String / Number / Slot / Function | 0 | Typescript：`string \| number \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
dot | Boolean | false | \- | N
maxCount | Number | 99 | \- | N
offset | Array | - | Typescript：`Array<string \| number>` | N
shape | String | circle | options：circle/square/bubble/ribbon | N
showZero | Boolean | false | \- | N
size | String | medium | options：medium/large | N


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-badge-basic-height | 16px | - 
--td-badge-basic-padding | 4px | - 
--td-badge-basic-width | 16px | - 
--td-badge-bg-color | @error-color | - 
--td-badge-border-radius | 2px | - 
--td-badge-bubble-border-radius | 10px 10px 10px 1px | - 
--td-badge-dot-size | 8px | - 
--td-badge-font-size | @font-size-xs | - 
--td-badge-font-weight | 600 | - 
--td-badge-large-font-size | @font-size-s | - 
--td-badge-large-height | 20px | - 
--td-badge-large-padding | 5px | - 
--td-badge-text-color | @font-white-1 | - 
