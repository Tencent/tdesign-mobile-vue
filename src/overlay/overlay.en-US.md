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
