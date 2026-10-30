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
describe('Steps', () => {
  describe('props', () => {
    it('theme[default/dot]', async () => {
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
                default: () =>
                  items.map((item, index) => {
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

    it('readonly[boolean]', async () => {
      const current = ref(0);
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} readonly={true} onChange={onChange}>
              {{
                default: () =>
                  items.map((item, index) => {
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

    it('layout[horizontal/vertical]', () => {
      const current = ref(1);
      const layout = 'vertical';
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} readonly={true} layout={layout}>
              {{
                default: () =>
                  itemStatus.map((item, index) => {
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

      $stepItems.forEach((item, index) => {
        const classes = item.find(`.t-step-item`).classes();
        expect(classes.includes(`t-step-item--${itemStatus[index].status}`)).toBeTruthy();
      });
    });

    it('defaultCurrent[number]', () => {
      const wrapper = mount(() => (
        <Steps defaultCurrent={1}>
          <StepItem title="步骤1" content="描述1" />
          <StepItem title="步骤2" content="描述2" />
        </Steps>
      ));
      // currentStatus 默认 process，defaultCurrent 项为 process 态，之前的项为 finish 态
      expect(wrapper.findAll('.t-step-item')[0].classes()).toContain('t-step-item--finish');
      expect(wrapper.findAll('.t-step-item')[1].classes()).toContain('t-step-item--process');
    });

    it('currentStatus[default/process/finish/error]', () => {
      const wrapper = mount(() => (
        <Steps current={0} currentStatus="error">
          <StepItem title="步骤1" content="描述1" />
          <StepItem title="步骤2" content="描述2" />
        </Steps>
      ));
      expect(wrapper.findAll('.t-step-item')[0].classes()).toContain('t-step-item--error');
    });

    it('sequence[positive/reverse]', () => {
      const wrapper = mount(() => (
        <Steps sequence="reverse">
          <StepItem title="步骤1" content="描述1" />
          <StepItem title="步骤2" content="描述2" />
        </Steps>
      ));
      expect(wrapper.find('.t-steps--reverse').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const current = ref(1);
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} onChange={onChange}>
              {{
                default: () =>
                  items.map((item, index) => {
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
