:: BASE_DOC ::

## API

### Divider Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | center | options: left/right/center | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
dashed | Boolean | false | \- | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | options: horizontal/vertical | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-divider-color | @bg-color-component | - 
--td-divider-content-color | @font-gray-3 | - 
--td-divider-content-font-size | 12px | - 
--td-divider-content-line-height | 20px | - 
--td-divider-content-line-style | solid | -