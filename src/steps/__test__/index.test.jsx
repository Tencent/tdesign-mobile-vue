import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { Steps, StepItem } from '../../steps';
const items = [
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行',
  },
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行',
  },
];
const itemStatus = [
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行',
    status: 'error',
  },
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行',
    status: 'process',
  },
];
describe('steps', () => {
  describe('props', () => {
    it(': theme', async () => {
      const current = ref(0);
      const theme = 'dot';
      const layout = 'vertical';
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} theme={theme} layout={layout} onChange={onChange}>
              {{
                default: items.map((item, index) => {
                  return <StepItem title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.map(async (item, index) => {
        expect(item.find(`.t-step-item__dot`).text()).toEqual('');
        expect(item.find(`.t-step-item__title`).text()).toEqual(items[index].title);
        expect(item.find(`.t-step-item__description`).text()).toEqual(items[index].content);
      });
    });

    it(': readonly', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} readonly={true} onChange={onChange}>
              {{
                default: items.map((item, index) => {
                  return <StepItem title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.map(async (item, index) => {
        expect(item.find(`.t-step-item__circle`).text()).toEqual(String(index + 1));
        expect(item.find(`.t-step-item__title`).text()).toEqual(items[index].title);
        expect(item.find(`.t-step-item__description`).text()).toEqual(items[index].content);
        await item.find(`.t-step-item`).trigger('click', event);
      });

      // readonly:true, 只读模式, 不会触发 change
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it(': layout', () => {
      const current = ref(1);
      const layout = 'vertical';
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} readonly={true} layout={layout}>
              {{
                default: itemStatus.map((item, index) => {
                  return <StepItem title={item.title} content={item.content} status={item.status} />;
                }),
              }}
            </Steps>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(itemStatus.length);

      $stepItems.map((item, index) => {
        const classes = item.find(`.t-step-item`).classes();
        expect(classes.includes(`t-step-item--${itemStatus[index].status}`)).toBeTruthy();
      });
    });
  });

  describe('StepItem Slots', () => {
    it(': content && title', async () => {
      const current = ref(1);
      const stepItems = ref(items.slice());
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value}>
              {{
                default: stepItems.value.map((item, index) => {
                  return <StepItem title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });

      stepItems.value.pop();
      await nextTick();

      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(stepItems.value.length);
      $stepItems.map((item, index) => {
        expect(item.find(`.t-step-item__title`).text()).toEqual(stepItems.value[index].title);
        expect(item.find(`.t-step-item__description`).text()).toEqual(stepItems.value[index].content);
      });
    });
  });

  describe('event', () => {
    it(': change', async () => {
      const current = ref(1);
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} onChange={onChange}>
              {{
                default: items.map((item, index) => {
                  return <StepItem title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(items.length);
      // 点击第 2 项, 触发 change, 此时 current = 2,
      await $stepItems[1].find(`.t-step-item`).trigger('click', event);
      expect(onChange).toHaveBeenCalledTimes(1);

      $stepItems.map(async (item, index) => {
        //  current = 2, 则 2 状态为 process,  2 之前的子项状态为 finish,  2 之后的子项状态为 default
        const classes = item.find(`.t-step-item`).attributes('class');
        if (index < 1) {
          expect(classes.includes(`t-step-item--finish`)).toBeTruthy();
        } else if (index === 1) {
          expect(classes.includes(`t-step-item--process`)).toBeTruthy();
        } else {
          expect(classes.includes(`t-step-item--default`)).toBeTruthy();
        }
      });
    });
  });
});
