:: BASE_DOC ::

## API

### SwipeCell

| 名称     | 类型                          | 默认值 | 说明                                                   | 必传 |
| -------- | ----------------------------- | ------ | ------------------------------------------------------ | ---- |
| disabled | Boolean                       | false  | 禁止滑动                                               | N    |
| left     | BtnItem[]                     | []     | 如果设置了 :left="[]"，还需要设置 onClick              | N    |
| right    | BtnItem[]                     | []     | 如果设置了 :right="[]"，还需要设置 onClick             | N    |
| opened   | Boolean \| [Boolean, Boolean] | false  | 通过 ref.value.initData.opened 获取菜单的展开/收回状态 | N    |

### BtnItem

t-button 按钮的部分属性，复杂按钮请使用 slot#left/right

| 名称      | 类型          | 默认值       | 说明                                                           | 必传 |
| --------- | ------------- | ------------ | -------------------------------------------------------------- | ---- |
| content   | String / Slot | -            | 按钮内容                                                       | Y    |
| className | String        | -            | 按钮 class 类名                                                | N    |
| style     | String        | height: 100% | 按钮 css 样式                                                  | N    |
| size      | String        | small        | 组件尺寸。可选项：small/medium/large。                         | N    |
| theme     | String        | primary      | 组件风格，依次为品牌色、危险色。可选项：default/primary/danger | N    |

### Events

| 名称    | 说明                                    | 回调参数                                               |
| ------- | --------------------------------------- | ------------------------------------------------------ |
| onClick | 传递 left 和 right 属性时绑定的点击事件 | ({action: BtnItem, source: 'left' \| 'right'}) => void |

### Slots

| 名称    | 说明   |
| ------- | ------ |
| -       | 内容   |
| content | 内容   |
| left    | 左菜单 |
| right   | 右菜单 |
