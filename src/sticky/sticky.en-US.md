:: BASE_DOC ::

## API

### Sticky Props

name | type | default | description | required
-- | -- | -- | -- | --
container | String / Object | - | Typescript: `Element` | N
disabled | Boolean | false | \- | N
offsetTop | String / Number | 0 | \- | N
zIndex | Number | 99 | \- | N
onScroll | Function |  | Typescript: `(context: { scrollTop: number, isFixed: boolean }) => void`<br/> | N

### Sticky Events

name | params | description
-- | -- | --
scroll | `(context: { scrollTop: number, isFixed: boolean })` | \-
