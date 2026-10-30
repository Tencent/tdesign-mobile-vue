import { config } from '@vue/test-utils';

// DropdownMenu/Tabs/TreeSelect 等组件在 computed/watcher 中解析 slot 子组件 props，
// 触发 Vue 的 "Slot invoked outside render function" 警告（属组件库已知架构模式，不影响行为）。
// 测试中静默该警告，待组件渲染逻辑重构后移除。
var origWarn = console.warn;
console.warn = function () {
  var msg = String(arguments[0]);
  if (
    msg.includes('invoked outside of the render function') ||
    msg.includes('Non-function value encountered for slot') ||
    msg.includes('Invalid vnode type when creating vnode') ||
    msg.includes('provide() can only be used inside setup()')
  ) {
    return;
  }
  origWarn.apply(console, arguments);
};

config.global.stubs = {
  teleport: false,
};
