/**
 * 模拟原生 input/textarea 输入：先写入 value 再派发事件。
 * jsdom 无法触发真实键盘输入，Input/Textarea 的值变更需借助此工具驱动。
 */
export const simulateInputEvent = (target: HTMLInputElement | HTMLTextAreaElement, value: string, event: string) => {
  target.value = value;
  target.dispatchEvent(new Event(event));
};
