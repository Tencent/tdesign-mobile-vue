import { defineComponent, PropType, VNode } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { useContent, useTNodeDefault, useTNodeJSX } from '../tnode';

const TNodeHookTester = defineComponent({
  name: 'TNodeHookTester',
  props: {
    method: {
      type: String,
      required: true,
    },
    node: [String, Function, Boolean],
    valueDisplay: [String, Function, Boolean],
    default: [String, Function, Boolean],
    content: String,
    params: Object,
    defaultNode: [String, Object] as PropType<string | VNode>,
    name: {
      type: String,
      default: 'node',
    },
    slotFirst: Boolean,
  },
  setup(props) {
    const renderTNode = useTNodeJSX();
    const renderTNodeDefault = useTNodeDefault();
    const renderContent = useContent();

    return () => {
      if (props.method === 'useTNodeJSX') {
        return (
          <div>
            {renderTNode(props.name, {
              params: props.params || { label: 'prop content' },
              defaultNode: props.defaultNode || 'fallback content',
              slotFirst: props.slotFirst,
            })}
          </div>
        );
      }
      if (props.method === 'useTNodeDefault') {
        return <div>{renderTNodeDefault(props.name, { defaultNode: props.defaultNode || 'fallback content' })}</div>;
      }
      return (
        <div>
          {renderContent('default', 'content', {
            defaultNode: props.defaultNode || 'fallback content',
            params: props.params,
          })}
        </div>
      );
    };
  },
});

describe('useTNodeJSX', () => {
  it('renders a function prop with params before the slot', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
        node: (_h: unknown, params: { label: string }) => <span class="prop-node">{params.label}</span>,
      },
      slots: {
        node: () => <span class="slot-node">slot content</span>,
      },
    });

    expect(wrapper.find('.prop-node').text()).toBe('prop content');
    expect(wrapper.find('.slot-node').exists()).toBe(false);
  });

  it('renders the slot when the prop is not provided', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
      },
      slots: {
        node: 'slot content',
      },
    });

    expect(wrapper.text()).toBe('slot content');
  });

  it('prioritizes a string prop over the slot', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
        node: 'prop content',
      },
      slots: {
        node: 'slot content',
      },
    });

    expect(wrapper.text()).toBe('prop content');
  });

  it('falls back to the slot after the prop is removed', async () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
        node: 'prop content',
      },
      slots: {
        node: 'slot content',
      },
    });
    expect(wrapper.text()).toBe('prop content');

    await wrapper.setProps({ node: undefined });
    expect(wrapper.text()).toBe('slot content');

    await wrapper.setProps({ node: '' });
    expect(wrapper.text()).toBe('slot content');
  });

  it('uses the slot when slotFirst is enabled', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
        node: 'prop content',
        slotFirst: true,
      },
      slots: {
        node: 'slot content',
      },
    });

    expect(wrapper.text()).toBe('slot content');
  });

  it('renders a function prop with the supplied params', () => {
    const renderNode = vi.fn((_h: unknown, params: { label: string }) => <span>{params.label}</span>);
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeJSX',
        node: renderNode,
        params: { label: 'custom params' },
      },
    });

    expect(wrapper.text()).toBe('custom params');
    expect(renderNode).toHaveBeenCalledWith(expect.any(Function), { label: 'custom params' });
  });

  it('renders the slot or defaultNode when the prop is true', () => {
    const withSlot = mount(TNodeHookTester, {
      props: { method: 'useTNodeJSX', node: true },
      slots: { node: 'slot content' },
    });
    const withoutSlot = mount(TNodeHookTester, {
      props: { method: 'useTNodeJSX', node: true },
    });

    expect(withSlot.text()).toBe('slot content');
    expect(withoutSlot.text()).toBe('fallback content');
  });

  it('does not render when the prop is false or null', async () => {
    const wrapper = mount(TNodeHookTester, {
      props: { method: 'useTNodeJSX', node: false },
      slots: { node: 'slot content' },
    });

    expect(wrapper.text()).toBe('');
    await wrapper.setProps({ node: null });
    expect(wrapper.text()).toBe('');
  });

  it('supports kebab-case slots for camelCase names', () => {
    const wrapper = mount(TNodeHookTester, {
      props: { method: 'useTNodeJSX', name: 'valueDisplay' },
      slots: { 'value-display': 'kebab slot content' },
    });

    expect(wrapper.text()).toBe('kebab slot content');
  });
});

describe('useTNodeDefault', () => {
  it('uses defaultNode when the prop and slot are empty', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeDefault',
      },
    });

    expect(wrapper.text()).toBe('fallback content');
  });

  it('returns the rendered prop instead of defaultNode', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeDefault',
        node: 'prop content',
      },
    });

    expect(wrapper.text()).toBe('prop content');
  });

  it('uses defaultNode when the rendered prop is false', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useTNodeDefault',
        node: false,
        defaultNode: 'custom fallback',
      },
    });

    expect(wrapper.text()).toBe('custom fallback');
  });
});

describe('useContent', () => {
  it('prioritizes the default slot over the content prop and slot', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useContent',
        content: '属性内容',
      },
      slots: {
        default: '默认插槽内容',
        content: '具名插槽内容',
      },
    });

    expect(wrapper.text()).toBe('默认插槽内容');
  });

  it('prioritizes the content prop over the content slot', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useContent',
        content: '属性内容',
      },
      slots: {
        content: '具名插槽内容',
      },
    });

    expect(wrapper.text()).toBe('属性内容');
  });

  it('falls back to the second name and then to defaultNode', async () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useContent',
        default: '',
        content: 'second content',
      },
    });

    expect(wrapper.text()).toBe('second content');

    await wrapper.setProps({ content: '' });
    expect(wrapper.text()).toBe('fallback content');
  });

  it('passes params to function props for both content names', () => {
    const renderContent = vi.fn((_h: unknown, params: { value: string }) => <span>{params.value}</span>);
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useContent',
        default: renderContent,
        params: { value: 'content params' },
      },
    });

    expect(wrapper.text()).toBe('content params');
    expect(renderContent).toHaveBeenCalledWith(expect.any(Function), { value: 'content params' });
  });

  it('uses the second prop when the first content prop is false', () => {
    const wrapper = mount(TNodeHookTester, {
      props: {
        method: 'useContent',
        default: false,
        content: 'second content',
      },
    });

    expect(wrapper.text()).toBe('second content');
  });
});
