import { h, nextTick } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { CheckIcon, CopyIcon } from 'tdesign-icons-vue-next';
import Text from '../text';
import Ellipsis from '../ellipsis';
import { copy } from '../../_util/copy-to-clipboard';
import { COMPONENT_NAME, longText, shortText, mountWithEllipsis } from './mount';

// 固定剪贴板行为：将复制工具替换为确定的 mock，便于断言被复制的文本
vi.mock('../../_util/copy-to-clipboard', () => ({ copy: vi.fn() }));

enableAutoUnmount(afterEach);

describe('Typography Text', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it('code[boolean]', () => {
      const wrapper = mount(Text, {
        props: { code: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('code').exists()).toBe(true);
      expect(wrapper.find('code').text()).toBe(shortText);
    });

    it('content[string]', () => {
      const wrapper = mount(Text, {
        props: { content: shortText },
      });
      expect(wrapper.find(`span.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('content[function]', () => {
      const wrapper = mount(Text, {
        props: { content: () => <b class="function-content">{shortText}</b> },
      });
      expect(wrapper.get('.function-content').text()).toBe(shortText);
    });

    it('content[slot]', () => {
      const wrapper = mount(Text, {
        slots: { content: () => shortText },
      });
      expect(wrapper.text()).toBe(shortText);
    });

    it('copyable[boolean]', async () => {
      const wrapper = mount(Text, {
        props: { copyable: true },
        slots: { default: () => shortText },
      });

      const copyBtn = wrapper.find(`.${COMPONENT_NAME}__copy`);
      expect(copyBtn.exists()).toBe(true);
      // 默认展示复制图标
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(true);
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);

      await copyBtn.trigger('click');
      await nextTick();
      expect(copy).toHaveBeenCalledWith(shortText);
      // 复制后展示已复制图标
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(false);
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(true);

      // 1500ms 后恢复复制图标
      vi.advanceTimersByTime(1500);
      await nextTick();
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(true);
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);
      await wrapper.setProps({ copyable: false });
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(false);
    });

    it('copyable[object]', async () => {
      const wrapper = mount(Text, {
        props: { copyable: {} },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
      // 未配置 suffix 时使用默认复制图标
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(true);

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(copy).toHaveBeenCalledWith(shortText);
    });

    it('copyable[text]', async () => {
      const customText = '自定义复制文本';
      const wrapper = mount(Text, {
        props: { copyable: { text: customText } },
        slots: { default: () => shortText },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(copy).toHaveBeenCalledWith(customText);
    });

    it('copyable[suffix-string]', () => {
      const wrapper = mount(Text, {
        props: { copyable: { suffix: 'copy-text' as any } },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).text()).toBe('copy-text');
    });

    it('copyable[suffix-function]', async () => {
      const suffix = vi.fn((_h: typeof h, { copied }: { copied: boolean }) => (
        <span class="custom-icon">{copied ? '已复制' : '复制'}</span>
      ));
      const wrapper = mount(Text, {
        props: { copyable: { suffix } },
        slots: { default: () => shortText },
      });

      expect(wrapper.find('.custom-icon').exists()).toBe(true);
      expect(wrapper.find('.custom-icon').text()).toBe('复制');
      expect(suffix).toHaveBeenCalledWith(h, { copied: false });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      await nextTick();
      // 已复制状态下隐藏自定义 suffix，回落为默认的已复制图标
      expect(wrapper.find('.custom-icon').exists()).toBe(false);
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(true);

      await vi.advanceTimersByTimeAsync(1500);
      expect(wrapper.get('.custom-icon').text()).toBe('复制');
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);
    });

    it('copyable[suffix-vnode]', () => {
      const wrapper = mount(Text, {
        props: {
          copyable: {
            // 运行时支持 VNode 后缀（类型声明仅包含 TNode 函数，需断言）
            suffix: h('span', { class: 'vnode-suffix' }, '复制') as any,
          },
        },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('.vnode-suffix').exists()).toBe(true);
      expect(wrapper.find('.vnode-suffix').text()).toBe('复制');
    });

    it('default[string]', () => {
      const wrapper = mount(Text, {
        props: { default: shortText },
      });
      expect(wrapper.text()).toBe(shortText);
    });

    it('default[function]', () => {
      const wrapper = mount(Text, {
        props: { default: () => <b class="function-default">{shortText}</b> },
      });
      expect(wrapper.get('.function-default').text()).toBe(shortText);
    });

    it('default[slot]', () => {
      const wrapper = mount(Text, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`span.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('delete[boolean]', () => {
      const wrapper = mount(Text, {
        props: { delete: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('del').exists()).toBe(true);
      expect(wrapper.find('del').text()).toBe(shortText);
    });

    it('disabled[boolean]', () => {
      const wrapper = mount(Text, {
        props: { disabled: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--disabled`);
    });

    it('ellipsis[boolean]', () => {
      const wrapper = mountWithEllipsis(Text, true);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
      const pEl = wrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
    });

    it('ellipsis[object]', async () => {
      const wrapper = mountWithEllipsis(Text, { row: 2 });
      expect(wrapper.findComponent(Ellipsis).props('ellipsis')).toEqual({ row: 2 });
      expect(wrapper.find('p').element.style.overflow).toBe('hidden');

      await wrapper.setProps({ ellipsis: false });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
      expect(wrapper.element.tagName).toBe('SPAN');
      expect(wrapper.text()).toBe(longText);
    });

    it('ellipsis[expandable]', () => {
      const expandableWrapper = mountWithEllipsis(Text, { expandable: true });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');

      const collapsedWrapper = mountWithEllipsis(Text, { expandable: false });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[collapsible]', async () => {
      const collapsibleWrapper = mountWithEllipsis(Text, { expandable: true, collapsible: true });

      // 展开后出现「收起」按钮，且内容样式恢复完整展示
      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      expect((collapseSymbol.element as HTMLElement).style.marginRight).toBe('0px');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('visible');
      expect(collapsibleWrapper.find('p').element.style.display).toBe('initial');

      // 再次点击收起，恢复省略样式与「展开」按钮
      await collapseSymbol.trigger('click');
      const expandSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mountWithEllipsis(Text, { expandable: true, collapsible: false });
      await unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      // collapsible 为 false 时展开后不再出现任何按钮，内容保持完整展示
      expect(unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
      expect(unCollapsibleWrapper.find('p').element.style.overflow).toBe('visible');
    });

    it('ellipsis[suffix-function]', () => {
      const wrapper = mount(Text, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: (h: any, { expanded }: any) => h('span', { class: 'custom-suffix' }, expanded ? '收起' : '更多'),
          },
        },
        slots: { default: () => longText },
      });
      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.custom-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('更多');
    });

    it('italic[boolean]', () => {
      const wrapper = mount(Text, {
        props: { italic: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('i').exists()).toBe(true);
      expect(wrapper.find('i').text()).toBe(shortText);
    });

    it('keyboard[boolean]', () => {
      const wrapper = mount(Text, {
        props: { keyboard: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('kbd').exists()).toBe(true);
      expect(wrapper.find('kbd').text()).toBe(shortText);
    });

    it('mark[boolean]', () => {
      const wrapper = mount(Text, {
        props: { mark: true },
        slots: { default: () => shortText },
      });
      const markEl = wrapper.find('mark');
      expect(markEl.exists()).toBe(true);
      expect(markEl.element.style.backgroundColor).toBe('');
    });

    it('mark[string]', () => {
      const wrapper = mount(Text, {
        props: { mark: '#07c160' },
        slots: { default: () => shortText },
      });
      const markEl = wrapper.find('mark');
      expect(markEl.exists()).toBe(true);
      // jsdom 会将十六进制颜色转换为 rgb 格式
      expect(markEl.element.style.backgroundColor).toBe('rgb(7, 193, 96)');
    });

    it('strong[boolean]', () => {
      const wrapper = mount(Text, {
        props: { strong: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('strong').exists()).toBe(true);
      expect(wrapper.find('strong').text()).toBe(shortText);
    });

    it('theme[primary]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'primary' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--primary`);
    });

    it('theme[secondary]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'secondary' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--secondary`);
    });

    it('theme[success]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'success' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--success`);
    });

    it('theme[warning]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'warning' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--warning`);
    });

    it('theme[error]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'error' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--error`);
    });

    it('underline[boolean]', () => {
      const wrapper = mount(Text, {
        props: { underline: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('u').exists()).toBe(true);
      expect(wrapper.find('u').text()).toBe(shortText);
    });
  });

  describe('events', () => {
    it('copy', async () => {
      const onCopy = vi.fn();
      const wrapper = mount(Text, {
        props: { copyable: { onCopy } },
        slots: { default: () => shortText },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(onCopy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(shortText);
    });

    it('expand', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Text, {
        props: { ellipsis: { expandable: true, collapsible: true, onExpand } },
        slots: { default: () => longText },
      });

      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(false);
    });
  });

  describe('scenarios', () => {
    it('disabled[boolean] & theme[primary]', async () => {
      const wrapper = mount(Text, {
        props: { theme: 'primary', disabled: true },
        slots: { default: () => shortText },
      });
      // disabled 优先级高于 theme，只保留禁用样式类
      expect(wrapper.classes()).toContain(`${COMPONENT_NAME}--disabled`);
      expect(wrapper.classes()).not.toContain(`${COMPONENT_NAME}--primary`);
      await wrapper.setProps({ disabled: false });
      expect(wrapper.classes()).not.toContain(`${COMPONENT_NAME}--disabled`);
      expect(wrapper.classes()).toContain(`${COMPONENT_NAME}--primary`);
    });

    it('ellipsis[boolean] & copyable[boolean]', async () => {
      const wrapper = mount(Text, {
        props: { ellipsis: true, copyable: true },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      // 省略模式下复制按钮由 Ellipsis 渲染
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
      await wrapper.get(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(copy).toHaveBeenCalledExactlyOnceWith(longText);
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(true);
      await vi.advanceTimersByTimeAsync(1500);
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(true);
    });

    it('multiple decorations nested in fixed order', () => {
      const wrapper = mount(Text, {
        props: {
          strong: true,
          underline: true,
          delete: true,
          code: true,
          mark: true,
          keyboard: true,
          italic: true,
        },
        slots: { default: () => shortText },
      });
      // 修饰标签按 strong/underline/delete/code/mark/keyboard/italic 依次向外嵌套
      expect(wrapper.find('i kbd mark code del u strong').exists()).toBe(true);
      expect(wrapper.find('i kbd mark code del u strong').text()).toBe(shortText);
    });

    it('removes decoration tags when their props are disabled', async () => {
      const wrapper = mount(Text, {
        props: { code: true, delete: true, italic: true, keyboard: true, mark: true, strong: true, underline: true },
        slots: { default: () => shortText },
      });
      await wrapper.setProps({
        code: false,
        delete: false,
        italic: false,
        keyboard: false,
        mark: false,
        strong: false,
        underline: false,
      });
      expect(wrapper.find('code, del, i, kbd, mark, strong, u').exists()).toBe(false);
      expect(wrapper.text()).toBe(shortText);
    });

    it('copies string content without navigating or bubbling the click', async () => {
      const onParentClick = vi.fn();
      const wrapper = mount(() => (
        <a href="#copy-target" onClick={onParentClick}>
          <Text content={shortText} copyable />
        </a>
      ));
      const text = wrapper.getComponent(Text);
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      text.get(`.${COMPONENT_NAME}__copy`).element.dispatchEvent(event);
      await nextTick();
      expect(copy).toHaveBeenCalledExactlyOnceWith(shortText);
      expect(event.defaultPrevented).toBe(true);
      expect(onParentClick).not.toHaveBeenCalled();
    });

    it('copies the latest content after the prop changes', async () => {
      const wrapper = mount(Text, { props: { content: '初始文本', copyable: true } });
      await wrapper.setProps({ content: '更新文本' });
      await wrapper.get(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(copy).toHaveBeenCalledExactlyOnceWith('更新文本');
    });

    // 源码未实现：content 属性透传到 Ellipsis 后覆盖已包装的插槽内容，strong 等修饰标签丢失
    it.todo('preserves decoration tags when the content prop is ellipsized');

    it('renders as span without ellipsis', () => {
      const wrapper = mount(Text, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`span.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
    });

    it('default slot takes precedence over content prop', () => {
      const wrapper = mount(Text, {
        props: { content: 'content-prop' },
        slots: { default: () => 'default-slot' },
      });
      expect(wrapper.text()).toBe('default-slot');
    });

    it('derives copy text from nested vnode children', async () => {
      const wrapper = mount(Text, {
        props: { copyable: true },
        slots: { default: () => [h('b', {}, 'Bold'), ' plain', h('i', {}, ' italic')] },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(copy).toHaveBeenCalledWith('Bold plain italic');
    });

    it('copies empty string when content is a function', async () => {
      const wrapper = mount(Text, {
        props: { content: () => shortText, copyable: true },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      // 函数内容无法提取文本，复制内容为空字符串
      expect(copy).toHaveBeenCalledWith('');
    });
  });
});
