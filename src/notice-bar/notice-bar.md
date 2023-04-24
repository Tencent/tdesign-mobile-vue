:: BASE_DOC ::

## API
### NoticeBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Array / Slot / Function | - | 文本内容。TS 类型：`string \| string[] \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
direction | String | horizontal | 滚动方向。可选项：horizontal/vertical | N
extra | String / Slot / Function | - | 已废弃。右侧额外信息。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
marquee | Boolean / Object | false | 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放。TS 类型：`boolean \| DrawMarquee` `interface DrawMarquee { speed?: number; loop?: number; delay?: number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/notice-bar/type.ts) | N
operation | String / Slot / Function | - | 右侧额外信息。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
prefixIcon | Slot / Function | - | 前缀图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 后缀图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | info | 内置主题。可选项：info/success/warning/error | N
visible | Boolean | false | 显示/隐藏。支持语法糖 `v-model` 或 `v-model:visible` | N
defaultVisible | Boolean | false | 显示/隐藏。非受控属性 | N
onChange | Function |  | TS 类型：`(value: boolean) => void`<br/>已废弃。展示或关闭公告栏时触发。参数为true时，代表展示公告栏。参数为false时，代表关闭公告栏 | N
onClick | Function |  | TS 类型：`(trigger: NoticeBarTrigger) => void`<br/>点击事件。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/notice-bar/type.ts)。<br/>`type NoticeBarTrigger = 'prefix-icon' \| 'content' \| 'operation' \| 'suffix-icon';`<br/> | N

### NoticeBar Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: boolean)` | 已废弃。展示或关闭公告栏时触发。参数为true时，代表展示公告栏。参数为false时，代表关闭公告栏
click | `(trigger: NoticeBarTrigger)` | 点击事件。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/notice-bar/type.ts)。<br/>`type NoticeBarTrigger = 'prefix-icon' \| 'content' \| 'operation' \| 'suffix-icon';`<br/>
