:: BASE_DOC ::

## API

### Overlay Props

name | type | default | description | required
-- | -- | -- | -- | --
backgroundColor | String | - | \- | N
customStyle | String | - | \- | N
duration | Number | 300 | \- | N
preventScrollThrough | Boolean | true | \- | N
visible | Boolean | false | \- | N
zIndex | Number | 1000 | \- | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Overlay Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-overlay-bg-color | @font-gray-1 | - 
--td-overlay-transition-duration | 300ms | - 
--td-overlay-zindex | 1000 | -