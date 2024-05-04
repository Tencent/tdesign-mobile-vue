:: BASE_DOC ::

## API

### Loading Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
delay | Number | 0 | \- | N
duration | Number | 800 | \- | N
indicator | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
inheritColor | Boolean | false | \- | N
layout | String | horizontal | options: horizontal/vertical | N
loading | Boolean | true | \- | N
pause | Boolean | false | \- | N
reverse | Boolean | - | \- | N
size | String | '20px' | \- | N
text | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | circular | options: circular/spinner/dots | N

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-loading-color | @brand-color | - 
--td-loading-text-font-size | 12px | - 
--td-loading-text-line-height | 20px | -