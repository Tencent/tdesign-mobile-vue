import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { useContent, useTNodeDefault, useTNodeJSX } from '../tnode';

const TNodeHookTester = defineComponent({
  name: 'TNodeHookTester',
  props: {
    method: {
      type: String,
      required: true,
    },
    node: [String, Function, Boolean],
    default: String,
    content: String,
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
            {renderTNode('node', {
              params: { label: 'prop content' },
              defaultNode: 'fallback content',
              slotFirst: props.slotFirst,
            })}
          </div>
        );
      }
      if (props.method === 'useTNodeDefault') {
        return <div>{renderTNodeDefault('node', { defaultNode: 'fallback content' })}</div>;
      }
      return <div>{renderContent('default', 'content', { defaultNode: 'fallback content' })}</div>;
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
});
