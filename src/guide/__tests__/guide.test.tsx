import { mount } from '@vue/test-utils';
import { vi, afterEach } from 'vitest';
import { nextTick } from 'vue';
import Guide from '../index';
import Popover from '../../popover';
import Popup from '../../popup';

// 用例结束后先排空浮层/Popper 异步任务再清理挂载容器，避免卸载期间的 patch 报错
afterEach(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  document.body.innerHTML = '';
});

const mountBaseGuide = async (
  props,
  attachTo,
  steps = [
    {
      element: '.guide-element-1',
    },
  ],
) => {
  return mount(
    {
      setup() {
        return () => (
          <div>
            <div class="guide-container">
              <div class="guide-element-1"></div>
              <div class="guide-element-2"></div>
            </div>
            <Guide steps={steps} {...props} />
          </div>
        );
      },
    },
    {
      attachTo,
    },
  );
};

const createEmptyDomUnderBody = (id = 'test-container') => {
  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
};

const makeEvent = (el, eventName = 'click') => {
  const event = new Event(eventName);
  el.dispatchEvent(event);
};

describe('Guide', () => {
  describe('props', () => {
    it('backButtonProps[object]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(
        { mode: 'dialog', modelValue: 0, backButtonProps: { content: '返回上一步' } },
        `#test-container`,
      );
      expect(document.querySelector('.t-guide__back').textContent).toContain('返回上一步');
    });

    it('counter[function] & hideCounter[boolean]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ mode: 'dialog', modelValue: 0, counter: () => '1/2' }, `#test-container`, [
        { element: '.guide-element-1' },
        { element: '.guide-element-2' },
      ]);
      expect(document.querySelector('.t-guide__next').textContent).toContain('1/2');

      createEmptyDomUnderBody('test-container-2');
      await mountBaseGuide(
        { mode: 'dialog', modelValue: 0, counter: () => '1/2', hideCounter: true },
        `#test-container-2`,
        [{ element: '.guide-element-1' }, { element: '.guide-element-2' }],
      );
      // 两个实例均 teleport 到 body，遍历断言 hideCounter 实例的 next 按钮不含 counter 文本
      const nextBtns = document.querySelectorAll('.t-guide__next');
      const hiddenCounterBtn = Array.from(nextBtns).find((btn) => !btn.textContent.includes('1/2'));
      expect(hiddenCounterBtn).toBeTruthy();
    });

    it('current[number]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ current: 0 }, `#test-container`);
      expect(document.body.classList.contains('t-guide--lock')).toBe(true);
    });

    it('modelValue[number]', async () => {
      // 重置 body 锁定状态，避免依赖其他用例的清理行为
      document.body.classList.remove('t-guide--lock');
      const testValue = async (props, target) => {
        await mountBaseGuide(props);
        expect(document.body.classList.contains('t-guide--lock')).toBe(target);
      };

      await testValue({}, false);
      await testValue({ modelValue: -1 }, false);
      await testValue({ defaultCurrent: -1 }, false);
      await testValue({ modelValue: 0 }, true);
    });

    it('finishButtonProps[object]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(
        { mode: 'dialog', modelValue: 0, finishButtonProps: { content: '完成引导' } },
        `#test-container`,
      );
      expect(document.querySelector('.t-guide__finish').textContent).toContain('完成引导');
    });

    it('hideBack[boolean]', async () => {
      const props = {
        mode: 'dialog',
        modelValue: 0,
        hideBack: true,
      };

      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(props, `#test-container`);

      expect(document.querySelector('.t-guide__tooltip')).toBeTruthy();
      expect(document.querySelector('.t-guide__back')).toBeFalsy();
      expect(document.querySelector('.t-guide__finish')).toBeTruthy();
    });

    it('hideSkip[boolean]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ mode: 'dialog', modelValue: 0 }, `#test-container`, [
        { element: '.guide-element-1' },
        { element: '.guide-element-2' },
      ]);
      expect(document.querySelector('.t-guide__skip')).toBeTruthy();

      createEmptyDomUnderBody('test-container-2');
      await mountBaseGuide({ mode: 'dialog', modelValue: 0, hideSkip: true }, `#test-container-2`, [
        { element: '.guide-element-1' },
        { element: '.guide-element-2' },
      ]);
      // 两个实例均 teleport 到 body：hideSkip 实例不渲染跳过按钮，全 body 仅剩第一个实例的 1 个
      expect(document.querySelectorAll('.t-guide__skip').length).toBe(1);
    });

    it('highlightPadding[number]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ modelValue: 0, highlightPadding: 8 }, `#test-container`);
      // 等待 popover 定位计算完成
      await nextTick();
      await nextTick();
      await nextTick();
      const highlight = document.querySelector('.t-guide__highlight');
      // 目标元素尺寸为 0 时，高亮框尺寸为 highlightPadding 的两倍，并按内边距外扩偏移
      expect(highlight.getAttribute('style')).toContain('width: 16px');
      expect(highlight.getAttribute('style')).toContain('height: 16px');
      expect(highlight.getAttribute('style')).toContain('top: -8px');
      expect(highlight.getAttribute('style')).toContain('left: -8px');
    });

    it('mode[popover/dialog]', async () => {
      const testMode = async ({ props, component, expectProps }) => {
        const div = document.createElement('div');
        div.id = 'test-container';
        document.body.appendChild(div);

        const wrapper = await mountBaseGuide(props, `#${div.id}`);

        const popoverWrapper = wrapper.findComponent(component);
        expect(popoverWrapper.exists()).toBe(true);
        if (Object.keys(expectProps).length) {
          Object.keys(expectProps).forEach((prop) => {
            expect(popoverWrapper.props(prop)).toBe(expectProps[prop]);
          });
        }
      };

      await testMode({
        props: {
          modelValue: 0,
        },
        component: Popover,
        expectProps: {
          theme: 'light',
          showArrow: false,
          visible: false,
        },
      });

      await testMode({
        props: {
          mode: 'popover',
          modelValue: 0,
        },
        component: Popover,
        expectProps: {
          theme: 'light',
          showArrow: false,
          visible: false,
        },
      });

      await testMode({
        props: {
          mode: 'dialog',
          modelValue: 0,
          zIndex: 999999,
        },
        component: Popup,
        expectProps: {
          placement: 'center',
          visible: false,
          zIndex: 999999,
        },
      });
    });

    it('nextButtonProps[object]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(
        { mode: 'dialog', modelValue: 0, nextButtonProps: { content: '去下一步' } },
        `#test-container`,
        [{ element: '.guide-element-1' }, { element: '.guide-element-2' }],
      );
      expect(document.querySelector('.t-guide__next').textContent).toContain('去下一步');
    });

    it('showOverlay[boolean]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ modelValue: 0 }, `#test-container`);
      expect(document.querySelector('.t-guide__highlight--mask')).toBeTruthy();

      createEmptyDomUnderBody('test-container-2');
      await mountBaseGuide({ modelValue: 0, showOverlay: false }, `#test-container-2`);
      expect(document.querySelector('.t-guide__highlight--nomask')).toBeTruthy();
    });

    it('skipButtonProps[object]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(
        { mode: 'dialog', modelValue: 0, skipButtonProps: { content: '跳过引导' } },
        `#test-container`,
        [{ element: '.guide-element-1' }, { element: '.guide-element-2' }],
      );
      expect(document.querySelector('.t-guide__skip').textContent).toContain('跳过引导');
    });

    it('steps[array]', async () => {
      const steps = [
        { element: '.guide-element-1', title: '第一步标题', body: '第一步描述内容' },
        { element: '.guide-element-2', title: '第二步标题', body: '第二步描述内容' },
      ];

      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ mode: 'dialog', modelValue: 0 }, `#test-container`, steps);
      // steps 第一项的 title/body 驱动引导内容渲染
      expect(document.querySelector('.t-guide__title').textContent).toBe('第一步标题');
      expect(document.querySelector('.t-guide__desc').textContent).toBe('第一步描述内容');
      // 第一步非最后一步，渲染下一步/跳过按钮
      expect(document.querySelector('.t-guide__next')).toBeTruthy();
      expect(document.querySelector('.t-guide__finish')).toBeFalsy();

      createEmptyDomUnderBody('test-container-2');
      await mountBaseGuide({ mode: 'dialog', modelValue: 1 }, `#test-container-2`, steps);
      // 切换到第二项后渲染对应的 title/body，且为最后一步，渲染完成/返回按钮
      // （两个实例均 teleport 到 body，取最后一个实例的节点）
      const titles = document.querySelectorAll('.t-guide__title');
      const descs = document.querySelectorAll('.t-guide__desc');
      expect(titles[titles.length - 1].textContent).toBe('第二步标题');
      expect(descs[descs.length - 1].textContent).toBe('第二步描述内容');
      expect(document.querySelector('.t-guide__finish')).toBeTruthy();
      expect(document.querySelector('.t-guide__back')).toBeTruthy();
    });

    it('zIndex[number]', async () => {
      createEmptyDomUnderBody('test-container');
      await mountBaseGuide({ mode: 'dialog', modelValue: 0, zIndex: 5000 }, `#test-container`);
      // 提示层使用 zIndex，高亮层与其覆盖层依次递减
      expect(document.querySelector('.t-guide__wrapper').getAttribute('style')).toContain('z-index: 5000');
      expect(document.querySelector('.t-guide__highlight').getAttribute('style')).toContain('z-index: 4999');
      expect(document.querySelector('.t-guide__overlay').getAttribute('style')).toContain('z-index: 4998');
    });
  });

  describe('events', () => {
    it('back', async () => {
      expect(document.querySelector('.t-guide__back')).toBeFalsy();
      expect(document.querySelector('.t-guide__finish')).toBeFalsy();
      const onBack = vi.fn();
      const onFinish = vi.fn();
      const props = {
        mode: 'dialog',
        modelValue: 0,
        onBack,
        onFinish,
      };

      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(props, `#test-container`);

      expect(document.querySelector('.t-guide__tooltip')).toBeTruthy();
      expect(document.querySelector('.t-guide__back')).toBeTruthy();
      expect(document.querySelector('.t-guide__finish')).toBeTruthy();

      expect(document.querySelector('.t-guide__next')).toBeFalsy();
      expect(document.querySelector('.t-guide__skip')).toBeFalsy();

      makeEvent(document.querySelector('.t-guide__back'));
      expect(onBack).toHaveBeenCalledTimes(1);

      makeEvent(document.querySelector('.t-guide__finish'));
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it('next', async () => {
      expect(document.querySelector('.t-guide__next')).toBeFalsy();
      expect(document.querySelector('.t-guide__skip')).toBeFalsy();

      const onNextStepClick = vi.fn();
      const onSkip = vi.fn();
      const props = {
        mode: 'dialog',
        modelValue: 0,
        onNextStepClick,
        onSkip,
      };

      createEmptyDomUnderBody('test-container');
      await mountBaseGuide(props, `#test-container`, [
        {
          element: '.guide-element-1',
        },
        {
          element: '.guide-element-2',
        },
      ]);
      expect(document.querySelector('.t-guide__tooltip')).toBeTruthy();
      expect(document.querySelector('.t-guide__next')).toBeTruthy();
      expect(document.querySelector('.t-guide__skip')).toBeTruthy();

      makeEvent(document.querySelector('.t-guide__next'));
      expect(onNextStepClick).toHaveBeenCalledTimes(1);

      makeEvent(document.querySelector('.t-guide__skip'));
      expect(onSkip).toHaveBeenCalledTimes(1);
    });
  });
});
