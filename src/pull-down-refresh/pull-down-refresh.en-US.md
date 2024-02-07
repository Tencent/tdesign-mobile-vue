:: BASE_DOC ::

## API

### PullDownRefresh Props

name | type | default | description | required
-- | -- | -- | -- | --
loadingBarHeight | String / Number | 50 | \- | N
loadingProps | Object | - | Typescript：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/pull-down-refresh/type.ts) | N
loadingTexts | Array | [] | Typescript：`string[]` | N
maxBarHeight | String / Number | 80 | \- | N
refreshTimeout | Number | 3000 | \- | N
value | Boolean | false | `v-model` and `v-model:value` is supported | N
defaultValue | Boolean | false | uncontrolled property | N
onChange | Function |  | Typescript：`(value: boolean) => void`<br/> | N
onRefresh | Function |  | Typescript：`() => void`<br/> | N
onScrolltolower | Function |  | Typescript：`() => void`<br/> | N
onTimeout | Function |  | Typescript：`() => void`<br/> | N

### PullDownRefresh Events

name | params | description
-- | -- | --
change | `(value: boolean)` | \-
refresh | \- | \-
scrolltolower | \- | \-
timeout | \- | \-
