# 测试规范

## 概览

### 主要 script 命令

```bash
# 组件单元测试与组件快照测试
pnpm run test
# 快照更新
pnpm run test:update
```

### 组件单元测试 `unit`

```bash
# 运行全量单测
pnpm run test:unit
# 运行全量单测并 watch 更改
pnpm run test:unit-dev
# 指定组件进行单测，组件测试时推荐使用此方式
pnpm run test:unit-dev button
# 展示 UI 界面，可查看覆盖率
pnpm run test:unit-gui
# 展示 UI 界面-指定组件
pnpm run test:unit-gui button
# 生成覆盖率报告
pnpm run test:unit-coverage
```

### 组件快照测试 `snap`

组件 `demos` 目录下的示例快照测试由 `npm run test:demo` 生成在各组件 `__tests__/demo.test.jsx`，通过 `pnpm run test:snap` 运行，不适用组件单测的分组规范。新增或调整 `demos` 后需重新执行 `pnpm run test:demo` 再运行/更新快照。`test/snap/`、`test/ssr/` 目录为历史遗留入口，当前 `vitest.config.mjs` 的 `include` 不会收集其中用例。

```bash
# 重新生成各组件 demo 测试文件（demo.test.jsx）
pnpm run test:demo
# 快照
pnpm run test:snap
# 更新快照
pnpm run test:snap-update
```

### E2E

`test:e2e` / `test:e2e-gui` 为 Cypress 命令（配置见 `scripts/test/cypress.json`），当前仓库未提交 `test/e2e` 用例，日常组件测试不涉及。

## 单元测试规范

### 测试用例覆盖范围

- 组件的每个 API 都必须编写测试用例。
- 如果某个 API 同时支持基础数据类型（string/number/boolean）和复杂数据类型（Slot/Function），则需分别编写测试用例，覆盖不同类型的输入。
- 参考 Form 组件的测试用例，确保覆盖率达到或接近 100%。

### 测试内容范围

- 组件本身的功能和行为。
- 组件内部的 hooks（自定义 Hook）。
- 组件内部的 utils（工具函数）。

### 测试环境与挂载约定

- 单测运行在 jsdom 环境，公共配置见 `vitest.config.mjs` 与 `scripts/test/setup.js`。
- setup 中设置了 `config.global.stubs.teleport = false`：Popup、Toast、Dialog、Drawer 等经 Teleport 挂载到 `document.body` 的组件无法通过 `wrapper.find` 查询，需改用 `document.querySelector` 或 `new DOMWrapper(document.body)` 断言；必要时在用例开始前重置 `document.body.innerHTML`。
- 组件实例清理统一使用 `enableAutoUnmount(afterEach)`（来自 `@vue/test-utils`）；Teleport 类组件卸载还需等待过渡与重渲染，可使用 `test/utils/flush.ts` 的 `flush` / `finishTransitions`。
- jsdom 不执行布局、无法触发真实键盘输入：尺寸/定位类逻辑用 `test/utils/mock-rect.ts`，Input/Textarea 值变更用 `test/utils/input.ts` 的 `simulateInputEvent`，触摸/指针手势用 `test/utils/touch.ts` 的 `trigger`。

### 测试文件命名及存放规范

- 测试文件统一放置在组件目录 `src/[组件名]/__tests__/` 中，例如 `src/watermark/__tests__/watermark.test.tsx`。
- 组件测试文件：`[组件名].test.tsx`，例如 `watermark.test.tsx`。
- 插件测试文件：`[组件名].plugin.test.tsx`，例如 `drawer.plugin.test.tsx`。插件测试必须独立于组件测试文件；插件的创建、安装和返回实例方法均放在插件测试文件中。
- 多子组件场景：每个子组件单独编写测试文件，例如 `form.test.tsx` 和 `form-item.test.tsx`，同样放在 `src/form/__tests__/` 下。
- 组件内部 hooks 测试文件：`[组件名].hooks.test.tsx`，例如 `form.hooks.test.tsx`。
- 仓库级共享 hooks（`src/hooks`）的测试放在 `src/hooks/__tests__/`，命名 `[hook 名].hooks.test.tsx`，例如 `tnode.hooks.test.tsx`。
- 组件内部 utils 测试文件：`[组件名].utils.test.tsx`，例如 `config-provider.utils.test.tsx`。
- 多个测试文件共用的挂载逻辑可提取到 `mount.tsx`，用于存放 mount factory、测试数据、查询方法和清理逻辑；仅被单个测试文件使用的辅助逻辑应保留在原测试文件中。
- 跨组件共享的测试辅助（touch 手势模拟、flush、attach 容器、mock-rect、input 输入模拟等）统一放在仓库根目录 `test/utils/`，测试中通过相对路径 `../../../test/utils/<模块名>` 引用；不得放入 `src/` 目录，避免被构建收集。
- `mount.tsx` 是测试辅助文件，不直接编写测试用例，也不要求使用组件测试分组。
- `demo.test.jsx` 为 demo 快照（由 `npm run test:demo` 自动生成，禁止手写修改）。

### 组件测试分组规范

组件测试使用 BDD 模式。顶层 `describe` 使用组件名，其直接子级按以下类别组织：

- `props`：验证不同 Props（含插槽输入通道）对组件渲染和行为的影响。
- `events`：验证事件触发时机及回调参数。
- `instanceFunctions`：验证组件通过 ref 暴露的实例方法。
- `globalConfig`：验证通过 ConfigProvider 注入的组件全局配置对渲染和行为的影响，与 `props` 等分组同级。

遵循以下原则：

- 分组按需创建，不保留空的 `describe`。
- `props` 分组内的用例按组件属性声明顺序排列（主组件为 `props.ts`，子组件为 `*-props.ts`）；`it.todo` 同样参与排序；插槽用例按同名 Prop 的声明位置穿插（如 `it('icon[function]')` 之后接 `it('icon[slot]')`），未在声明文件中找到的属性名或插槽名（如 `default`）置于分组末尾，保持原有相对顺序。
- 组件根 `describe` 下不直接放置 `it` 或 `test`。
- 能明确归属于单一公开 API 类型的测试放入 `props`、`events` 或 `instanceFunctions`；全局配置测试放入 `globalConfig`。
- 当 Prop 和 Slot 提供相同能力时，在 `props` 分组内分别验证各自的输入通道。
- 为修复 Issue 新增或补充的回归测试，应在对应的 `it` 或 `test` 紧邻上方以 `// Issue: <完整 Issue URL>` 标注来源，不只填写 Issue 编号。该规则适用于所有分组。
- hooks、utils 等非组件测试不强制使用上述分组；子组件测试仍遵循组件测试分组规范。

```ts
// Issue: https://github.com/Tencent/tdesign-mobile-vue/issues/1234
it('handles the reported edge case', () => {});
```

## it 标题命名规则

Props 用例标题格式为 `it('propName[类型]', ...)`，每个声明类型一个独立用例：

- 声明为单一类型时直接标注：`it('text[string]')`、`it('disabled[boolean]')`、`it('count[number]')`。
- 声明为多类型联合（如 `[String, Function]`）时，拆成独立用例分别验证各类型通道：
  `it('content[string]')` + `it('content[function]')`，不合并写成 `[string/function]`。
- 同一 Prop 需按不同取值区分时，用无冒号的取值标注：`it('placement[top]')`、`it('theme[default]')`。
- 枚举类 Prop 用 `it.each` 逐值生成用例，标题仍为单值形式：`it.each(['list', 'grid'] as const)('theme[%s]')` 生成 `theme[list]`、`theme[grid]` 两个用例，不写成 `theme[list/grid]` 合并标题。
- 事件用例直接使用事件名称：`it('change')`、`it('visibleChange')`。
- 实例方法用例直接使用方法名：`it('clearValidate')`。
- 插槽用例放入 `props` 分组，`[slot]` 作为一种输入类型标注：`it('icon[slot]')`、`it('default[slot]')`，与同名 Prop 的其它类型用例（如 `it('icon[function]')`）相邻排列。
- 多 Prop 组合验证用 `&` 连接：`it('title[string] & content[string]')`、`it('default[slot] & content[slot]')`。
- 未实现的 API 用 `it.todo('propName[type]')` 标注，并逐类型拆分。
- 标题中不使用 `:` 开头（事件/实例方法）、不使用 `=` 连接、不使用 `others`/`misc` 等模糊名称。

详情见 [TDesign 单元测试规范](https://github.com/Tencent/tdesign-mobile-vue/wiki/TDesign-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83)。

## 测试示例

使用 BDD 模式进行开发，测试必须在流水线中通过。可参照 `src/action-sheet/__tests__/action-sheet.test.tsx`。

```ts
describe('ComponentName', () => {
  // 组件属性测试：验证不同 Props（含插槽输入通道）对渲染和行为的影响
  describe('props', () => {});

  // 组件事件测试：验证事件触发时机及回调参数
  describe('events', () => {});

  // 组件实例方法测试：验证通过 ref 暴露的方法
  describe('instanceFunctions', () => {});

  // 全局配置测试：验证通过 ConfigProvider 注入的组件配置
  describe('globalConfig', () => {
    it('componentName', () => {});
  });
});
```

示例用于展示完整结构；实际测试中应删除没有对应测试用例的空分组。
