import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Icon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Link from '../link';
// const iconFunc = () => h(TIconApp);

// every component needs four parts: props/events/slots/functions.
describe('Link', () => {
  // test props api
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <Link content="foo">bar</Link>
              <Link default="foo">bar</Link>
              <Link content={'0'}>bar</Link>
            </div>
          );
        },
      });
      expect(wrapper.find('.t-link--content')).toBeTruthy();
    });

    it('content[function]', () => {
      const renderContent = function () {
        return 'foo';
      };
      const wrapper = mount({
        render() {
          return (
            <div>
              <Link content={renderContent}>bar</Link>
              <Link default={renderContent}>bar</Link>
            </div>
          );
        },
      });
      expect(wrapper.find('.t-link--content')).toBeTruthy();
    });

    it('default[string]', () => {
      // default prop 与默认插槽同名，此处验证 prop 传入通道
      const wrapper = mount(Link, {
        props: {
          default: '默认内容',
        },
      });
      expect(wrapper.find('.t-link__content').text()).toBe('默认内容');
    });

    it('default[function]', () => {
      const wrapper = mount(Link, {
        props: {
          default: () => <span class="default-content">函数默认内容</span>,
        },
      });
      expect(wrapper.find('.t-link__content').find('.default-content').text()).toBe('函数默认内容');
    });

    it('disabled[boolean]', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <Link disabled={true} onClick={fn}>
              text
            </Link>
          );
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.find('.t-link--disabled').exists()).toBeTruthy();
    });

    it('hover[boolean]', () => {
      const wrapper = mount({
        render() {
          return <Link hover={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--hover').exists()).toBeTruthy();
    });

    it('href[string]', () => {
      const wrapper = mount(() => (
        <Link href="https://tdesign.tencent.com" target="_blank">
          链接
        </Link>
      ));
      expect(wrapper.element.tagName.toLowerCase()).toBe('a');
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com');
      expect(wrapper.attributes('target')).toBe('_blank');
    });

    it('prefixIcon[function]', () => {
      const wrapper = mount(() => <Link prefixIcon={() => <Icon />}>text</Link>);
      expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
    });

    it('size[small/medium/large]', () => {
      const wrapper = mount({
        render() {
          return <Link size={'large'}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--large').exists()).toBeTruthy();
      const wrapperDefault = mount({
        render() {
          return <Link>text</Link>;
        },
      });
      expect(wrapperDefault.find('.t-link--medium').exists()).toBeTruthy();
    });

    it('suffixIcon[function]', () => {
      const wrapper = mount(Link, {
        props: {
          suffixIcon: () => <Icon />,
        },
      });
      expect(wrapper.find('.t-link__suffix-icon').exists()).toBeTruthy();
      expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
    });

    it('target[string]', () => {
      const wrapper = mount(Link, {
        props: {
          href: 'https://tdesign.tencent.com',
          target: '_self',
        },
      });
      // target 透传给原生 a 元素
      expect(wrapper.attributes('target')).toBe('_self');
    });

    it('theme[default/primary/danger/warning/success]', () => {
      const wrapper = mount({
        render() {
          return <Link theme={'primary'}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--primary').exists()).toBeTruthy();
      const wrapperDefault = mount({
        render() {
          return <Link>text</Link>;
        },
      });
      expect(wrapperDefault.find('.t-link--default').exists()).toBeTruthy();
    });

    it('underline[boolean]', () => {
      const wrapper = mount({
        render() {
          return <Link underline={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--underline').exists()).toBeTruthy();
    });
  });

  // test events
  describe('events', () => {
    it('event passthrough', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Link onClick={fn}>text</Link>;
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });

  // test slots
  describe('slots', () => {
    it('icon', () => {
      const suffixIcon = () => <TIconApp />;
      const wrapper = mount(Link, {
        props: {
          suffixIcon,
        },
      });
      expect(wrapper.find('.t-link__suffix-icon').exists()).toBeTruthy();
    });
  });
});
