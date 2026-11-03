import { DOMWrapper, flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Guide from '../guide';
import type { GuideStep, TdGuideProps } from '../type';
import Popover from '../../popover';
import Popup from '../../popup';
import ConfigProvider from '../../config-provider';
import { sleep } from '../../shared/util';

const steps: GuideStep[] = [
  { element: '#guide-target-1', title: '第一步', body: '第一步说明' },
  { element: '#guide-target-2', title: '第二步', body: '第二步说明' },
];
const wrappers: VueWrapper[] = [];
let targets: HTMLDivElement;

beforeEach(() => {
  targets = document.createElement('div');
  targets.innerHTML = '<div id="guide-target-1"></div><div id="guide-target-2"></div>';
  document.body.appendChild(targets);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(async () => {
  await sleep(0);
  wrappers
    .splice(0)
    .reverse()
    .forEach((wrapper) => wrapper.unmount());
  targets.remove();
  // Guide 卸载时未清理 body 锁，仅在中断/完成的 watcher 中清理。
  document.body.classList.remove('t-guide--lock');
  vi.restoreAllMocks();
});

const mountGuide = async (props: TdGuideProps = {}, slots = {}) => {
  const wrapper = mount(Guide, {
    props: { steps, defaultCurrent: 0, mode: 'dialog', ...props },
    slots,
  });
  wrappers.push(wrapper);
  await flushPromises();
  return wrapper;
};

const getNode = (selector: string) => new DOMWrapper(document.body).get(selector);
const click = async (selector: string) => {
  await getNode(selector).trigger('click');
  await flushPromises();
};

describe('Guide', () => {
  describe('props', () => {
    it('backButtonProps[object]', async () => {
      await mountGuide({ current: 1, backButtonProps: { content: '返回上一步', disabled: true } });
      expect(getNode('.t-guide__back').text()).toBe('返回上一步');
      expect(getNode('.t-guide__back').attributes('disabled')).toBeDefined();
    });

    it('counter[function]', async () => {
      const counter = vi.fn((_h, { current, total }: { current: number; total: number }) => (
        <span class="custom-counter">
          {current + 1}/{total}
        </span>
      ));
      await mountGuide({ counter });
      expect(getNode('.custom-counter').text()).toBe('1/2');
      expect(counter).toHaveBeenCalledWith(expect.any(Function), { current: 0, total: 2 });
    });

    it('current[number]', async () => {
      const wrapper = await mountGuide({ current: 0 });
      expect(getNode('.t-guide__title').text()).toBe('第一步');
      await wrapper.setProps({ current: 1 });
      await flushPromises();
      expect(getNode('.t-guide__title').text()).toBe('第二步');
      await wrapper.setProps({ current: -1 });
      await flushPromises();
      expect(document.querySelector('.t-guide__wrapper')).toBeNull();
      expect(document.body.classList.contains('t-guide--lock')).toBe(false);
    });

    it('modelValue[number]', async () => {
      const wrapper = await mountGuide({ modelValue: 0 });
      await click('.t-guide__next');
      expect(wrapper.emitted('update:modelValue')).toEqual([[1, { e: expect.any(MouseEvent), total: 2 }]]);
      expect(getNode('.t-guide__title').text()).toBe('第一步');
      await wrapper.setProps({ modelValue: 1 });
      await flushPromises();
      expect(getNode('.t-guide__title').text()).toBe('第二步');
    });

    it('defaultCurrent[number]', async () => {
      await mountGuide({ defaultCurrent: 0 });
      await click('.t-guide__next');
      expect(getNode('.t-guide__title').text()).toBe('第二步');
    });

    it('finishButtonProps[object]', async () => {
      await mountGuide({ current: 1, finishButtonProps: { content: '完成引导', disabled: true } });
      expect(getNode('.t-guide__finish').text()).toContain('完成引导');
      expect(getNode('.t-guide__finish').attributes('disabled')).toBeDefined();
    });

    it('hideBack[boolean]', async () => {
      const wrapper = await mountGuide({ current: 1 });
      expect(document.querySelector('.t-guide__back')).not.toBeNull();
      await wrapper.setProps({ hideBack: true });
      expect(document.querySelector('.t-guide__back')).toBeNull();
      expect(document.querySelector('.t-guide__finish')).not.toBeNull();
    });

    it('hideCounter[boolean]', async () => {
      const wrapper = await mountGuide();
      expect(getNode('.t-guide__next').text()).toContain('(1/2)');
      await wrapper.setProps({ hideCounter: true });
      expect(getNode('.t-guide__next').text()).not.toContain('(1/2)');
    });

    it('hideSkip[boolean]', async () => {
      const wrapper = await mountGuide();
      expect(document.querySelector('.t-guide__skip')).not.toBeNull();
      await wrapper.setProps({ hideSkip: true });
      expect(document.querySelector('.t-guide__skip')).toBeNull();
    });

    it('highlightPadding[number]', async () => {
      await mountGuide({ mode: 'popover', highlightPadding: 12 });
      const highlight = getNode('.t-guide__highlight').element as HTMLElement;
      expect(highlight.style.width).toBe('24px');
      expect(highlight.style.height).toBe('24px');
      expect(highlight.style.top).toBe('-12px');
      expect(highlight.style.left).toBe('-12px');
    });

    it('mode[popover/dialog]', async () => {
      const wrapper = await mountGuide({ mode: 'popover' });
      expect(wrapper.findComponent(Popover).props()).toMatchObject({ theme: 'light', showArrow: false, visible: true });
      expect(wrapper.findComponent(Popup).exists()).toBe(false);
      await wrapper.setProps({ mode: 'dialog' });
      await flushPromises();
      expect(wrapper.findComponent(Popup).props()).toMatchObject({ placement: 'center', visible: true });
      expect(wrapper.findComponent(Popover).exists()).toBe(false);
    });

    it('nextButtonProps[object]', async () => {
      await mountGuide({ nextButtonProps: { content: '去下一步', disabled: true } });
      expect(getNode('.t-guide__next').text()).toContain('去下一步');
      expect(getNode('.t-guide__next').attributes('disabled')).toBeDefined();
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = await mountGuide({ showOverlay: true });
      expect(getNode('.t-guide__highlight').classes()).toContain('t-guide__highlight--mask');
      await wrapper.setProps({ showOverlay: false });
      expect(getNode('.t-guide__highlight').classes()).toContain('t-guide__highlight--nomask');
      expect(getNode('.t-guide__highlight').classes()).not.toContain('t-guide__highlight--mask');
    });

    it('skipButtonProps[object]', async () => {
      await mountGuide({ skipButtonProps: { content: '跳过引导', theme: 'danger' } });
      expect(getNode('.t-guide__skip').text()).toBe('跳过引导');
      expect(getNode('.t-guide__skip').classes()).toContain('t-button--danger');
    });

    it('steps[array]', async () => {
      await mountGuide({
        steps: [
          {
            element: () => document.querySelector('#guide-target-1'),
            title: () => <b>函数标题</b>,
            body: () => <i>函数描述</i>,
          },
        ],
      });
      expect(getNode('.t-guide__title b').text()).toBe('函数标题');
      expect(getNode('.t-guide__desc i').text()).toBe('函数描述');
      expect(document.querySelector('.t-guide__finish')).not.toBeNull();
      expect(document.querySelector('.t-guide__next')).toBeNull();
    });

    it('zIndex[number]', async () => {
      await mountGuide({ zIndex: 5000 });
      expect(getNode('.t-guide__wrapper').attributes('style')).toContain('z-index: 5000');
      expect(getNode('.t-guide__highlight').attributes('style')).toContain('z-index: 4999');
      expect(getNode('.t-guide__overlay').attributes('style')).toContain('z-index: 4998');
    });
  });

  describe('events', () => {
    it('back', async () => {
      const onBack = vi.fn();
      const onChange = vi.fn();
      await mountGuide({ current: 1, onBack, onChange });
      await click('.t-guide__back');
      expect(onBack).toHaveBeenCalledTimes(1);
      expect(onBack).toHaveBeenCalledWith({ e: expect.any(MouseEvent), current: 1, total: 2 });
      expect(onChange).toHaveBeenCalledWith(0, { e: expect.any(MouseEvent), total: 2 });
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = await mountGuide({ current: 0, onChange });
      await click('.t-guide__next');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1, { e: expect.any(MouseEvent), total: 2 });
      expect(wrapper.emitted('update:current')).toEqual([[1, { e: expect.any(MouseEvent), total: 2 }]]);
    });

    it('finish', async () => {
      const onFinish = vi.fn();
      const onChange = vi.fn();
      await mountGuide({ current: 1, onFinish, onChange });
      await click('.t-guide__finish');
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish).toHaveBeenCalledWith({ e: expect.any(MouseEvent), current: 1, total: 2 });
      expect(onChange).toHaveBeenCalledWith(-1, { e: expect.any(MouseEvent), total: 2 });
    });

    it('nextStepClick', async () => {
      const onNextStepClick = vi.fn();
      await mountGuide({ current: 0, onNextStepClick });
      await click('.t-guide__next');
      expect(onNextStepClick).toHaveBeenCalledTimes(1);
      expect(onNextStepClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent), next: 1, current: 0, total: 2 });
    });

    it('skip', async () => {
      const onSkip = vi.fn();
      const onChange = vi.fn();
      await mountGuide({ current: 0, onSkip, onChange });
      await click('.t-guide__skip');
      expect(onSkip).toHaveBeenCalledTimes(1);
      expect(onSkip).toHaveBeenCalledWith({ e: expect.any(MouseEvent), current: 0, total: 2 });
      expect(onChange).toHaveBeenCalledWith(-1, { e: expect.any(MouseEvent), total: 2 });
    });
  });

  describe('slots', () => {
    it('title', async () => {
      const title = vi.fn(({ currentStepInfo }: { currentStepInfo: GuideStep }) => <b>{currentStepInfo.title}插槽</b>);
      await mountGuide({}, { title });
      expect(getNode('.t-guide__title b').text()).toBe('第一步插槽');
      expect(title).toHaveBeenCalledWith(expect.objectContaining({ currentStepInfo: steps[0] }));
    });

    it('body', async () => {
      await mountGuide(
        {},
        { body: ({ currentStepInfo }: { currentStepInfo: GuideStep }) => <b>{currentStepInfo.body}插槽</b> },
      );
      expect(getNode('.t-guide__desc b').text()).toBe('第一步说明插槽');
    });

    it('counter', async () => {
      await mountGuide(
        {},
        {
          counter: ({ current, total }: { current: number; total: number }) => (
            <b class="slot-counter">
              {current + 1}/{total}
            </b>
          ),
        },
      );
      expect(getNode('.slot-counter').text()).toBe('1/2');
    });

    it('highlightContent', async () => {
      await mountGuide(
        { mode: 'popover' },
        {
          highlightContent: ({ currentStepInfo }: { currentStepInfo: GuideStep }) => (
            <b class="slot-highlight">{currentStepInfo.title}</b>
          ),
        },
      );
      expect(getNode('.t-guide__highlight .slot-highlight').text()).toBe('第一步');
    });

    it('content', async () => {
      await mountGuide(
        { mode: 'popover' },
        {
          content: ({ current, total }: { current: number; total: number }) => (
            <b class="slot-content">
              {current + 1}/{total}
            </b>
          ),
        },
      );
      expect(getNode('.slot-content').text()).toBe('1/2');
      expect(document.querySelector('.t-guide__tooltip')).toBeNull();
    });
  });

  describe('scenarios', () => {
    it('current overrides modelValue and defaultCurrent', async () => {
      await mountGuide({ current: 0, modelValue: 1, defaultCurrent: 1 });
      expect(getNode('.t-guide__title').text()).toBe('第一步');
    });

    it('skipping an uncontrolled guide removes its overlay and body lock', async () => {
      await mountGuide();
      expect(document.body.classList.contains('t-guide--lock')).toBe(true);
      await click('.t-guide__skip');
      expect(document.querySelector('.t-guide__wrapper')).toBeNull();
      expect(document.querySelector('.t-guide__overlay')).toBeNull();
      expect(document.body.classList.contains('t-guide--lock')).toBe(false);
    });

    it('center placement uses a full-width reference and passes popoverProps', async () => {
      const wrapper = await mountGuide({
        mode: 'popover',
        steps: [{ ...steps[0], placement: 'center', popoverProps: { theme: 'dark', showArrow: true } }],
      });
      expect(wrapper.findComponent(Popover).props()).toMatchObject({
        placement: 'bottom',
        theme: 'dark',
        showArrow: true,
      });
      expect(getNode('.t-guide__reference').attributes('style')).toContain('width: 100vw');
      expect(getNode('.t-guide__reference').attributes('style')).toContain('left: 0px');
    });

    it('step backButtonProps override component backButtonProps', async () => {
      await mountGuide({
        current: 1,
        backButtonProps: { content: '组件返回' },
        steps: [steps[0], { ...steps[1], backButtonProps: { content: '步骤返回', theme: 'danger' } }],
      });
      expect(getNode('.t-guide__back').text()).toBe('步骤返回');
      expect(getNode('.t-guide__back').classes()).toContain('t-button--danger');
    });

    it('completes the uncontrolled next, back and finish flow', async () => {
      await mountGuide();
      expect(getNode('.t-guide__title').text()).toBe('第一步');
      await click('.t-guide__next');
      expect(getNode('.t-guide__title').text()).toBe('第二步');
      await click('.t-guide__back');
      expect(getNode('.t-guide__title').text()).toBe('第一步');
      await click('.t-guide__next');
      await click('.t-guide__finish');
      expect(document.querySelector('.t-guide__wrapper')).toBeNull();
      expect(document.body.classList.contains('t-guide--lock')).toBe(false);
    });

    it('does not render when no current step is active', async () => {
      await mountGuide({ defaultCurrent: -1 });
      expect(document.querySelector('.t-guide__wrapper')).toBeNull();
      expect(document.body.classList.contains('t-guide--lock')).toBe(false);
    });

    it('step settings override component mode, overlay, padding and buttons', async () => {
      const wrapper = await mountGuide({
        mode: 'dialog',
        showOverlay: true,
        highlightPadding: 8,
        nextButtonProps: { content: '全局下一步' },
        skipButtonProps: { content: '全局跳过' },
        steps: [
          {
            ...steps[0],
            mode: 'popover',
            showOverlay: false,
            highlightPadding: 4,
            nextButtonProps: { content: '步骤下一步' },
            skipButtonProps: { content: '步骤跳过' },
          },
          steps[1],
        ],
      });
      expect(wrapper.findComponent(Popover).exists()).toBe(true);
      expect(getNode('.t-guide__highlight').classes()).toContain('t-guide__highlight--nomask');
      expect(getNode('.t-guide__highlight').attributes('style')).toContain('width: 8px');
      expect(getNode('.t-guide__next').text()).toContain('步骤下一步');
      expect(getNode('.t-guide__skip').text()).toBe('步骤跳过');
    });

    it('counter prop overrides counter slot', async () => {
      await mountGuide(
        { counter: () => <b class="prop-counter">属性计数</b> },
        {
          counter: () => <b class="slot-counter">插槽计数</b>,
        },
      );
      expect(getNode('.prop-counter').text()).toBe('属性计数');
      expect(document.querySelector('.slot-counter')).toBeNull();
    });

    it('step title and body functions override their slots', async () => {
      await mountGuide(
        { steps: [{ ...steps[0], title: () => <b>属性标题</b>, body: () => <b>属性描述</b> }] },
        {
          title: () => <i>插槽标题</i>,
          body: () => <i>插槽描述</i>,
        },
      );
      expect(getNode('.t-guide__title').text()).toBe('属性标题');
      expect(getNode('.t-guide__desc').text()).toBe('属性描述');
    });

    it('step content function replaces the default popover and overrides content slot', async () => {
      await mountGuide(
        { mode: 'popover', steps: [{ ...steps[0], content: () => <b class="custom-content">自定义内容</b> }] },
        {
          content: () => <i class="slot-content">插槽内容</i>,
        },
      );
      expect(getNode('.custom-content').text()).toBe('自定义内容');
      expect(document.querySelector('.slot-content')).toBeNull();
      expect(document.querySelector('.t-guide__tooltip')).toBeNull();
    });

    it('step highlight function overrides highlight slot', async () => {
      await mountGuide(
        { mode: 'popover', steps: [{ ...steps[0], highlightContent: () => <b class="custom-highlight">属性高亮</b> }] },
        {
          highlightContent: () => <i class="slot-highlight">插槽高亮</i>,
        },
      );
      expect(getNode('.custom-highlight').text()).toBe('属性高亮');
      expect(document.querySelector('.slot-highlight')).toBeNull();
    });

    it('ignores custom highlight content outside popover mode', async () => {
      await mountGuide({
        mode: 'dialog',
        steps: [{ ...steps[0], highlightContent: () => <b class="custom-highlight">自定义高亮</b> }],
      });
      expect(document.querySelector('.custom-highlight')).toBeNull();
    });

    it('uses global guide button text', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { globalConfig: { guide: { next: 'Next', skip: 'Skip', back: 'Back', finish: 'Finish' } } },
        slots: { default: () => <Guide mode="dialog" defaultCurrent={0} steps={steps} /> },
      });
      wrappers.push(wrapper);
      await flushPromises();
      expect(getNode('.t-guide__next').text()).toContain('Next');
      expect(getNode('.t-guide__skip').text()).toBe('Skip');
      await click('.t-guide__next');
      expect(getNode('.t-guide__back').text()).toBe('Back');
      expect(getNode('.t-guide__finish').text()).toContain('Finish');
    });

    it('button props override global guide button text', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { globalConfig: { guide: { next: 'Next', skip: 'Skip', back: 'Back', finish: 'Finish' } } },
        slots: {
          default: () => (
            <Guide
              mode="dialog"
              defaultCurrent={0}
              steps={steps}
              nextButtonProps={{ content: '前进' }}
              skipButtonProps={{ content: '跳过引导' }}
              backButtonProps={{ content: '返回起点' }}
              finishButtonProps={{ content: '结束引导' }}
            />
          ),
        },
      });
      wrappers.push(wrapper);
      await flushPromises();
      expect(getNode('.t-guide__next').text()).toContain('前进');
      expect(getNode('.t-guide__next').text()).not.toContain('Next');
      expect(getNode('.t-guide__skip').text()).toBe('跳过引导');
      await click('.t-guide__next');
      expect(getNode('.t-guide__back').text()).toBe('返回起点');
      expect(getNode('.t-guide__finish').text()).toContain('结束引导');
      expect(getNode('.t-guide__finish').text()).not.toContain('Finish');
    });

    // Guide 没有 onBeforeUnmount 清理 LOCK_CLASS。
    it.todo('releases body scroll lock when unmounted while active');
    // renderPopup 使用 isPopover && renderContentNode，dialog 模式忽略自定义 content。
    it.todo('renders custom content in dialog mode');
    // 非受控 setInnerCurrent 会立即改变 innerCurrent，事件上下文随后读取到更新后的步骤。
    it.todo('nextStepClick reports the original current and intended next step in uncontrolled mode');
    // GuideStep 声明 offset，但组件没有消费或透传此字段。
    it.todo('step offset adjusts popover position');
  });
});
