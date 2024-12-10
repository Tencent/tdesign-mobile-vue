import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Icon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Link from '../link';
// const iconFunc = () => h(TIconApp);

// every component needs four parts: props/events/slots/functions.
describe('Link', () => {
  // test props api
  describe('props', () => {
    it(':size', () => {
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
    it(':theme', () => {
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
    it(':hover', () => {
      const wrapper = mount({
        render() {
          return <Link hover={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--hover').exists()).toBeTruthy();
    });
    it(':underline', () => {
      const wrapper = mount({
        render() {
          return <Link underline={true}>text</Link>;
        },
      });
      expect(wrapper.find('.t-link--underline').exists()).toBeTruthy();
    });
    it(':disabled', () => {
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
    it(':content', () => {
      const renderContent = function () {
        return 'foo';
      };
      const wrapper = mount({
        render() {
          return (
            <div>
              <Link content="foo">bar</Link>
              <Link content={renderContent}>bar</Link>
              <Link default="foo">bar</Link>
              <Link default={renderContent}>bar</Link>
              <Link content={'0'}>bar</Link>
            </div>
          );
        },
      });
      expect(wrapper.find('.t-link--content')).toBeTruthy();
    });
    it('prefixIcon', () => {
      const wrapper = mount(() => <Link prefixIcon={<Icon />}>text</Link>);
      expect(wrapper.findComponent(Icon)).toBeTruthy();
    });
  });

  // test events
  describe('@event', () => {
    it('Event passthrough ', async () => {
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
  describe('<slot>', () => {
    it(':icon', () => {
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
