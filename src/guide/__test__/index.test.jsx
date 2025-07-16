import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Guide from '../guide';
import Popover from '../../popover';
import Popup from '../../popup';

beforeEach(() => {
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

describe('guide', () => {
  describe('props', () => {
    it(': model-value', () => {
      expect(document.body.classList.contains('t-guide--lock')).toBe(false);
      const testValue = async (props, target) => {
        mountBaseGuide(props);
        expect(document.body.classList.contains('t-guide--lock')).toBe(target);
      };

      testValue({}, false);
      testValue({ modelValue: -1 }, false);
      testValue({ defaultCurrent: -1 }, false);
      testValue({ modelValue: 0 }, true);
    });

    it(': mode', async () => {
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
  });

  describe('event', () => {
    it(': back', async () => {
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

    it(': next', async () => {
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
