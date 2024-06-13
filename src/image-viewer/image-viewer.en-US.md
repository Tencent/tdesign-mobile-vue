:: BASE_DOC ::

## API

### ImageViewer Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
deleteBtn | Boolean / Slot / Function | false | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
images | Array | [] | Typescript：`Array<string\|{url: string;align: 'start' \| 'center' \| 'end';}>` | N
index | Number | - | `v-model:index` is supported | N
defaultIndex | Number | - | uncontrolled property | N
maxZoom | Number | 3 | Typescript：`Number` | N
showIndex | Boolean | false | \- | N
visible | Boolean | false | hide or show image viewer。`v-model` and `v-model:visible` is supported | N
defaultVisible | Boolean | false | hide or show image viewer。uncontrolled property | N
onClose | Function |  | Typescript：`(context: { trigger: 'overlay' \| 'close-btn', visible: Boolean, index: Number }) => void`<br/> | N
onDelete | Function |  | Typescript：`(index: Number) => void`<br/> | N
onIndexChange | Function |  | Typescript：`(index: number, context: { trigger: 'prev' \| 'next' }) => void`<br/> | N

### ImageViewer Events

name | params | description
-- | -- | --
close | `(context: { trigger: 'overlay' \| 'close-btn', visible: Boolean, index: Number })` | \-
delete | `(index: Number)` | \-
index-change | `(index: number, context: { trigger: 'prev' \| 'next' })` | \-


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-image-viewer-close-margin-left | @spacer-1 | - 
--td-image-viewer-delete-margin-right | @spacer-1 | - 
--td-image-viewer-mask-bg-color | #000 | - 
--td-image-viewer-nav-bg-color | @font-gray-3 | - 
--td-image-viewer-nav-color | @font-white-1 | - 
--td-image-viewer-nav-height | 48px | - 
--td-image-viewer-nav-index-font-size | @font-size-base | - 
