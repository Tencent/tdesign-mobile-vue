:: BASE_DOC ::

## API

### ColorPicker Props

name | type | default | description | required
-- | -- | -- | -- | --
autoClose | Boolean | true | \- | N
clearable | Boolean | false | \- | N
enableAlpha | Boolean | false | \- | N
footer | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | RGB | options: RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
popupProps | Object | {} | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts) | N
swatchColors | Array | - | swatch colors。Typescript：`Array<string> \| null` | N
type | String | base | options: base/multiple。Typescript：`TypeEnum ` `type TypeEnum = 'base' \| 'multiple'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts) | N
usePopup | Boolean | false | \- | N
value | String | - | color value。`v-model` and `v-model:value` is supported | N
defaultValue | String | - | color value。uncontrolled property | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-saturation-brightness' \| 'palette-saturation' \| 'palette-brightness' \| 'palette-hue-bar' \| 'palette-alpha-bar' \| 'input' \| 'preset' \| 'recent' `<br/> | N
onClose | Function |  | Typescript：`(trigger: ColorPickerTrigger) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerTrigger = 'overlay'`<br/> | N
onPaletteBarChange | Function |  | Typescript：`(context: { color: ColorObject }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/> | N

### ColorPicker Events

name | params | description
-- | -- | --
change | `(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-saturation-brightness' \| 'palette-saturation' \| 'palette-brightness' \| 'palette-hue-bar' \| 'palette-alpha-bar' \| 'input' \| 'preset' \| 'recent' `<br/>
close | `(trigger: ColorPickerTrigger)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerTrigger = 'overlay'`<br/>
palette-bar-change | `(context: { color: ColorObject })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/>
