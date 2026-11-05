---
name: tdesign-mobile-vue-unit-test
description: 按 tdesign-mobile-vue 规范编写、补充、迁移或审查 Vue 组件单元测试，并运行 Vitest 验证。适用于 src 下的组件 API 测试、Issue 回归测试，以及相关 plugin、hooks、utils 测试。
---

# TDesign Mobile Vue Unit Test

## 规范来源

开始前阅读 `test/README.md`，以其中的“单元测试规范”为唯一规范来源。Skill 只负责执行规范，不另行定义冲突规则。

## 工作流程

1. 阅读目标组件源码、API 定义、现有测试和相邻组件测试，不根据文件名猜测行为。
2. 按 `test/README.md` 的规范梳理需要覆盖的 API 和测试分组，确认现有覆盖后再修改。
3. 沿用项目现有的 Vitest、Vue Test Utils 和 TSX 写法；文件拆分、命名和存放位置遵循 `test/README.md`，不在 Skill 中重复维护。
4. 仅修改任务涉及的测试。除非任务明确要求，不批量迁移无关存量用例。
5. 优先验证公开 API 和用户可观察行为，避免为覆盖实现细节重复断言。

## 验证

从仓库根目录运行目标组件测试：

```bash
pnpm run test:unit <component>
```

需要覆盖率时运行：

```bash
pnpm run test:unit-coverage <component>
```

若调整存量测试结构，确保用例语义、断言和快照保持不变，并报告测试结果及未验证项。
