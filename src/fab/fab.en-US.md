:: BASE_DOC ::

## API

### Fab Props

name | type | default | description | required
-- | -- | -- | -- | --
buttonProps | Object | - | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
style | String | right: 16px; bottom: 32px; | \- | N
text | String | - | \- | N
onClick | Function |  | Typescript：`(context: {e: MouseEvent}) => void`<br/> | N

### Fab Events

name | params | description
-- | -- | --
click | `(context: {e: MouseEvent})` | \-


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-fab-shadow | @shadow-2 | - 
