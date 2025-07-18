:: BASE_DOC ::

## API

### Image Props

name | type | default | description | required
-- | -- | -- | -- | --
alt | String | - | \- | N
error | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fallback | String | - | display `fallback` image on `src` loading failed. you can also use `error` to define more complex error content | N
fit | String | fill | options: contain/cover/fill/none/scale-down | N
lazy | Boolean | false | \- | N
loading | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
position | String | center | \- | N
referrerpolicy | String | - | attribute of `<img>`, [MDN Definition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)。options: no-referrer/no-referrer-when-downgrade/origin/origin-when-cross-origin/same-origin/strict-origin/strict-origin-when-cross-origin/unsafe-url | N
shape | String | square | options: circle/round/square | N
src | String | - | \- | N
srcset | Object | - | for `.avif` and `.webp` image url, load `srcset` before `src`。Typescript：`ImageSrcset` `interface ImageSrcset { 'image/avif': string; 'image/webp': string; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/image/type.ts) | N
onError | Function |  | Typescript：`(context: { e: ImageEvent }) => void`<br/>trigger on image load failed | N
onLoad | Function |  | Typescript：`(context: { e: ImageEvent }) => void`<br/>trigger on image loaded | N

### Image Events

name | params | description
-- | -- | --
error | `(context: { e: ImageEvent })` | trigger on image load failed
load | `(context: { e: ImageEvent })` | trigger on image loaded

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-image-color | @text-color-placeholder | - 
--td-image-loading-bg-color | @bg-color-secondarycontainer | - 
--td-image-loading-color | @text-color-placeholder | - 
--td-image-round-radius | @radius-default | - 
