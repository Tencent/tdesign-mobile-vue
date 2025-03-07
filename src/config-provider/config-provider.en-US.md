:: BASE_DOC ::

## API

### ConfigProvider Props

name | type | default | description | required
-- | -- | -- | -- | --
globalConfig | Object | - | global config。Typescript：`GlobalConfigProvider` | N

### GlobalConfigProvider

name | type | default | description | required
-- | -- | -- | -- | --
actionSheet | Object | - | ActionSheet global configs。Typescript：`ActionSheetConfig` | N
calendar | Object | - | Calendar global configs。Typescript：`CalendarConfig` | N
cascader | Object | - | Cascader global configs。Typescript：`CascaderConfig` | N
classPrefix | String | t | \- | N
dateTimePicker | Object | - | DateTimePicker global configs。Typescript：`DateTimePickerConfig` | N
dropdownMenu | Object | - | DropdownMenu global configs。Typescript：`DropdownMenuConfig` | N
guide | Object | - | Guide global configs。Typescript：`GuideConfig` | N
list | Object | - | List global configs。Typescript：`ListConfig` | N
picker | Object | - | Picker global configs。Typescript：`PickerConfig` | N
pullDownRefresh | Object | - | PullDownRefresh global configs。Typescript：`PullDownRefreshConfig` | N
rate | Object | - | Rate global configs。Typescript：`RateConfig` | N
tabBar | Object | - | TabBar global configs。Typescript：`TabBarConfig` | N
table | Object | - | Table global configs。Typescript：`TableConfig` | N
upload | Object | - | Upload global configs。Typescript：`UploadConfig` | N

### ActionSheetConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | String | - | cancel text | N

### CalendarConfig

name | type | default | description | required
-- | -- | -- | -- | --
confirm | String | - | confirm text | N
monthTitle | String | - | \- | N
months | Array | - | Typescript：`string[]` | N
title | String | - | \- | N
weekdays | Array | - | Typescript：`string[]` | N

### CascaderConfig

name | type | default | description | required
-- | -- | -- | -- | --
placeholder | String | - | \- | N
title | String | - | \- | N

### DateTimePickerConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | String | - | \- | N
confirm | String | - | \- | N
dateLabel | String | - | \- | N
format | String | YYYY-MM-DD | \- | N
hourLabel | String | - | \- | N
minuteLabel | String | - | \- | N
monthLabel | String | - | \- | N
secondLabel | String | - | \- | N
title | String | - | \- | N
yearLabel | String | - | \- | N

### DropdownMenuConfig

name | type | default | description | required
-- | -- | -- | -- | --
confirm | String | - | confirm text | N
reset | String | - | reset text | N

### GuideConfig

name | type | default | description | required
-- | -- | -- | -- | --
back | String | - | \- | N
finish | String | - | \- | N
next | String | - | \- | N
skip | String | - | \- | N

### ImageConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorText | String | - | loading text, default value is "Error" | N
loadingText | String | - | loading text, default value is "loading" | N
replaceImageSrc | Function | - | replace all `src` attribute of images。Typescript：`(params: ImageProps) => string`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/config-provider/type.ts) | N

### InputConfig

name | type | default | description | required
-- | -- | -- | -- | --
placeholder | String | - | \- | N

### ListConfig

name | type | default | description | required
-- | -- | -- | -- | --
loading | String | - | \- | N
loadingMoreText | String | - | \- | N
loosing | String | - | \- | N
pulling | String | - | \- | N
success | String | - | \- | N

### PickerConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | String | - | cancel text | N
confirm | String | - | confirm text | N

### PullDownRefreshConfig

name | type | default | description | required
-- | -- | -- | -- | --
loadingTexts | Array | - | Typescript：`string[]` | N

### RateConfig

name | type | default | description | required
-- | -- | -- | -- | --
noValueText | String | - | \- | N
valueText | String | - | \- | N

### TabBarConfig

name | type | default | description | required
-- | -- | -- | -- | --
haveMoreNewsAriaLabel | String | - | \- | N
haveNewsAriaLabel | String | - | \- | N
moreNewsAriaLabel | String | - | \- | N
newsAriaLabel | String | - | \- | N

### TableConfig

name | type | default | description | required
-- | -- | -- | -- | --
empty | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### UploadConfig

name | type | default | description | required
-- | -- | -- | -- | --
progress | Object | - | Typescript：`UploadConfigProgress` | N

### UploadConfigProgress

name | type | default | description | required
-- | -- | -- | -- | --
failText | String | - | \- | N
successText | String | - | \- | N
uploadingText | String | - | \- | N
waitingText | String | - | \- | N
