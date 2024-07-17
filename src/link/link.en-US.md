:: BASE_DOC ::

## API

### Link Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | make link to be disabled | N
hover | Boolean | - | \- | N
href | String | - | \- | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
target | String | - | target is an attribute of `<a>` | N
theme | String | default | options: default/primary/danger/warning/success | N
underline | Boolean | - | \- | N
onClick | Function |  | Typescript：`(e: MouseEvent) => void`<br/>click event, it won't trigger when it's disabled | N

### Link Events

name | params | description
-- | -- | --
click | `(e: MouseEvent)` | click event, it won't trigger when it's disabled

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-link-danger-active-color | @error-color-active | - 
--td-link-danger-color | @error-color | - 
--td-link-danger-disabled-color | @error-color-disabled | - 
--td-link-default-active-color | @brand-color-active | - 
--td-link-default-color | @font-gray-1 | - 
--td-link-default-disabled-color | @text-color-disabled | - 
--td-link-primary-active-color | @brand-color-active | - 
--td-link-primary-color | @brand-color | - 
--td-link-primary-disabled-color | @brand-color-disabled | - 
--td-link-success-active-color | @success-color-active | - 
--td-link-success-color | @success-color | - 
--td-link-success-disabled-color | @success-color-disabled | - 
--td-link-warning-active-color | @warning-color-active | - 
--td-link-warning-color | @warning-color | - 
--td-link-warning-disabled-color | @warning-color-disabled | -