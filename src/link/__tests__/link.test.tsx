import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Icon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Link from '../link';
// const iconFunc = () => h(TIconApp);

// every component needs four parts: props/events/slots/functions.
describe('Link', () => {
  // test props api
  describe('props', () => {
    it('size[small/medium/large]', () => {
      const wrapper = mount({
        render() {
          return <Link size={'large'}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--large').exists()).toBeTruthy();
      const wrapperDefault = mount({
        render() {
          return <Link size={''}>text</Link>;
        },
      });
      expect(wrapperDefault.find('.t-link--medium').exists()).toBeTruthy();
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
          return <Link theme={''}>text</Link>;
        },
      });
      expect(wrapperDefault.find('.t-link--default').exists()).toBeTruthy();
    });
    it('hover[boolean]', () => {
      const wrapper = mount({
        render() {
          return <Link hover={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--hover').exists()).toBeTruthy();
    });
    it('underline[boolean]', () => {
      const wrapper = mount({
        render() {
          return <Link underline={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--underline').exists()).toBeTruthy();
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
      const wrapper = mount(() => <Link prefixIcon={<Icon />}>text</Link>);
      expect(wrapper.findComponent(Icon)).toBeTruthy();
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
    it('icon[slot]', () => {
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
