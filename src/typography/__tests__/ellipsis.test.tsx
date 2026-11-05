import { h, nextTick, ref } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import Ellipsis from '../ellipsis';
import ConfigProvider from '../../config-provider';
import { COMPONENT_NAME, longText, mountWithEllipsis } from './mount';

enableAutoUnmount(afterEach);

const CLAMP_STORE = '__webkitLineClamp';

describe('Ellipsis', () => {
  let originalLineClamp: PropertyDescriptor | undefined;

  beforeAll(() => {
    originalLineClamp = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'WebkitLineClamp');
    // jsdom 的 cssstyle 不支持 -webkit-line-clamp，注入存取器以便断言省略行数
    Object.defineProperty(CSSStyleDeclaration.prototype, 'WebkitLineClamp', {
      configurable: true,
      get(this: CSSStyleDeclaration) {
        return (this as any)[CLAMP_STORE] ?? '';
      },
      set(this: CSSStyleDeclaration, value: unknown) {
        (this as any)[CLAMP_STORE] = String(value);
      },
    });
  });

  afterAll(() => {
    if (originalLineClamp) {
      Object.defineProperty(CSSStyleDeclaration.prototype, 'WebkitLineClamp', originalLineClamp);
    } else {
      Reflect.deleteProperty(CSSStyleDeclaration.prototype, 'WebkitLineClamp');
    }
  });

  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: true,
          content: longText,
        },
      });
      expect(wrapper.text()).toBe(longText);
    });

    // 源码未实现：ellipsis.tsx 直接渲染 content 属性，未执行 TNode 函数
    it.todo('content[function]');

    // 源码未实现：ellipsis.tsx 未读取 content 插槽
    it.todo('content[slot]');

    // 源码未实现：ellipsis.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（未传 content 与插槽时甚至会因缺少插槽而抛错）
    it.todo('default[string]');

    // 源码未实现：ellipsis.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（未传 content 与插槽时甚至会因缺少插槽而抛错）
    it.todo('default[function]');
    it('default[slot]', () => {
      const wrapper = mount(Ellipsis, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      expect(wrapper.find('p').text()).toBe(longText);
    });

    it('ellipsis[boolean]', () => {
      const ellipsisWrapper = mount(Ellipsis, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      // 容器为 flex 布局，内容 p 应用单行省略样式
      const container = ellipsisWrapper.element as HTMLElement;
      expect(container.style.display).toBe('flex');
      expect(container.style.alignItems).toBe('flex-end');
      const pEl = ellipsisWrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
      expect(pEl.element.style.whiteSpace).toBe('normal');
      expect(pEl.element.style.display).toBe('-webkit-box');
      expect((pEl.element.style as any).WebkitLineClamp).toBe('1');

      const plainWrapper = mount(Ellipsis, {
        props: { ellipsis: false },
        slots: { default: () => longText },
      });
      expect(plainWrapper.find('p').element.getAttribute('style')).toBe(null);
    });

    it('ellipsis[object]', async () => {
      const wrapper = mount(Ellipsis, {
        props: { ellipsis: { row: 3 } },
        slots: { default: () => longText },
      });
      const pEl = wrapper.find('p');
      expect(pEl.element.style.overflow).toBe('hidden');
      expect((pEl.element.style as any).WebkitLineClamp).toBe('3');
      await wrapper.setProps({ ellipsis: { row: 5 } });
      expect((pEl.element.style as any).WebkitLineClamp).toBe('5');
      expect(wrapper.text()).toBe(longText);
    });

    it('ellipsis[expandable]', () => {
      const expandableWrapper = mountWithEllipsis(Ellipsis, { expandable: true });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');
      expect((symbol.element as HTMLElement).style.marginRight).toBe('0px');

      const collapsedWrapper = mountWithEllipsis(Ellipsis, { expandable: false });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[collapsible]', async () => {
      const collapsibleWrapper = mountWithEllipsis(Ellipsis, { expandable: true, collapsible: true });

      // 展开后内容样式恢复完整展示，按钮切换为「收起」
      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      const expandedPEl = collapsibleWrapper.find('p');
      expect(expandedPEl.element.style.overflow).toBe('visible');
      expect(expandedPEl.element.style.display).toBe('initial');

      // 收起后恢复省略样式与「展开」按钮
      await collapseSymbol.trigger('click');
      await nextTick();
      expect(collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mountWithEllipsis(Ellipsis, { expandable: true, collapsible: false });
      await unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();
      // collapsible 为 false 时展开后不再出现按钮，内容保持完整展示
      expect(unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
      expect(unCollapsibleWrapper.find('p').element.style.overflow).toBe('visible');
    });

    it('ellipsis[suffix-function]', async () => {
      const suffix = vi.fn((_h: typeof h, { expanded }: { expanded: boolean }) => (
        <span class="my-suffix">{expanded ? '收起' : '展开更多'}</span>
      ));
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
            suffix,
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.my-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('展开更多');
      expect(suffix).toHaveBeenCalledWith(h, { expanded: false });

      await symbol.trigger('click');
      expect(wrapper.find('.my-suffix').exists()).toBe(false);
      expect(wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('收起');
      await wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(wrapper.get('.my-suffix').text()).toBe('展开更多');
    });

    it('ellipsis[suffix-vnode]', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            // 运行时支持 VNode 后缀（类型声明仅包含 TNode 函数，需断言）
            suffix: h('span', { class: 'static-suffix' }, '查看更多') as any,
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.static-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('查看更多');
    });

    it('renderCopy[function]', async () => {
      const renderCopy = () => h('span', { class: 'copy-btn' }, '复制');
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: { expandable: true },
          renderCopy,
        },
        slots: { default: () => longText },
      });
      expect(wrapper.find('.copy-btn').exists()).toBe(true);
      // 存在复制按钮时展开按钮预留右边距
      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect((symbol.element as HTMLElement).style.marginRight).toBe('8px');
      await wrapper.setProps({ renderCopy: undefined });
      expect(wrapper.find('.copy-btn').exists()).toBe(false);
      expect((symbol.element as HTMLElement).style.marginRight).toBe('0px');
    });
  });

  describe('events', () => {
    it('expand', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
            onExpand,
          },
        },
        slots: { default: () => longText },
      });

      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      await nextTick();
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(false);
    });
  });

  describe('globalConfig', () => {
    it('typography', async () => {
      const globalConfig = ref({ typography: { expandText: 'More', collapseText: 'Less' } });
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={globalConfig.value}>
          <Ellipsis ellipsis={{ expandable: true, collapsible: true }}>{longText}</Ellipsis>
        </ConfigProvider>
      ));

      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.text()).toBe('More');

      await expandSymbol.trigger('click');
      await nextTick();

      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.text()).toBe('Less');

      globalConfig.value = { typography: { expandText: '展开全文', collapseText: '收起全文' } };
      await nextTick();
      expect(collapseSymbol.text()).toBe('收起全文');
      await collapseSymbol.trigger('click');
      expect(wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开全文');
    });

    it('typography falls back to default labels when configured text is empty', async () => {
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ typography: { expandText: '', collapseText: '' } }}>
          <Ellipsis ellipsis={{ expandable: true, collapsible: true }}>{longText}</Ellipsis>
        </ConfigProvider>
      ));
      expect(wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      await wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(wrapper.get(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('收起');
    });
  });
});
