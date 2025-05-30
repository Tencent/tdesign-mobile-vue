:: BASE_DOC ::

## API

### ColorPicker Props

name | type | default | description | required
-- | -- | -- | -- | --
clearable | Boolean | false | \- | N
enableAlpha | Boolean | false | \- | N
fixed | Boolean | false | \- | N
format | String | RGB | When `enableAlpha` is true, `HEX8/RGBA/HSLA/HSVA` are valid。options: HEX/HEX8/RGB/RGBA/HSL/HSLA/HSV/HSVA/CMYK/CSS | N
swatchColors | Array | undefined | swatch colors。Typescript：`Array<string> \| null \| undefined` | N
type | String | base | options: base/multiple。Typescript：`TypeEnum ` `type TypeEnum = 'base' \| 'multiple'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts) | N
value | String | - | color value。`v-model` and `v-model:value` is supported | N
defaultValue | String | - | color value。uncontrolled property | N
onChange | Function |  | Typescript：`(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-hue-bar' \| 'palette-alpha-bar' \| 'preset' `<br/> | N
onPaletteBarChange | Function |  | Typescript：`(context: { color: ColorObject }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/> | N

### ColorPicker Events

name | params | description
-- | -- | --
change | `(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-hue-bar' \| 'palette-alpha-bar' \| 'preset' `<br/>
palette-bar-change | `(context: { color: ColorObject })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; value: number;}`<br/>
