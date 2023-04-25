:: BASE_DOC ::

## API

### Indexes Props

name | type | default | description | required
-- | -- | -- | -- | --
indexList | Array | - | Typescript：`string [] \| number[]` | N
list | Array | [] | `deprecated`。Typescript：`ListItem[] ` `interface ListItem { title: string;  index: string;  children: { title: string; [key: string]: any} [] }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/indexes/type.ts) | N
sticky | Boolean | true | Typescript：`Boolean` | N
stickyOffset | Number | 0 | \- | N
onChange | Function |  | Typescript：`(index: string \| number) => void`<br/> | N
onSelect | Function |  | Typescript：`(index: string \| number) => void`<br/> | N

### Indexes Events

name | params | description
-- | -- | --
change | `(index: string \| number)` | \-
select | `(index: string \| number)` | \-

### IndexesAnchor Props

name | type | default | description | required
-- | -- | -- | -- | --
index | String / Number | - | \- | N
