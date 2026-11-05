/**
 * 创建挂载到 body 的 attach 目标容器，供 Popup / Toast / Drawer 等
 * teleport 类组件通过 `attach: () => container` 或 `attach: '#id'` 指定挂载点。
 */
export function createAttachContainer(id?: string): HTMLElement {
  const container = document.createElement('div');
  if (id) container.id = id;
  document.body.appendChild(container);
  return container;
}
