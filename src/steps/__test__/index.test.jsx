import { mount } from '@vue/test-utils';
import { includes } from 'lodash';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { Steps, Step } from '../../steps';
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
                  return <Step title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.map(async (item, index) => {
        expect(item.find(`.t-step-icon__number`).text()).toEqual('');
        expect(item.find(`.t-step-icon__number`).classes().includes(`t-step-icon__dot`)).toBeTruthy();
        expect(item.find(`.t-step-title`).text()).toEqual(items[index].title);
        expect(item.find(`.t-step-description`).text()).toEqual(items[index].content);
        await item.find(`.t-step__inner`).trigger('click', event);
      });

      // theme = 'dot' 仅在 layout = 'vertical' 下有效, 不会触发 change
      expect(onChange).toHaveBeenCalledTimes(0);
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
                  return <Step title={item.title} content={item.content} />;
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.map(async (item, index) => {
        expect(item.find(`.t-step-icon__number`).text()).toEqual(String(index + 1));
        expect(item.find(`.t-step-title`).text()).toEqual(items[index].title);
        expect(item.find(`.t-step-description`).text()).toEqual(items[index].content);
        await item.find(`.t-step__inner`).trigger('click', event);
      });

      // readonly:true, 只读模式, 不会触发 change
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it(': options', async () => {
      const current = ref(1);
      const options = ref([
        {
          title: '步骤描述',
          content: '辅助信息文字最多两行',
        },
        {
          title: '选中步骤',
          content: '辅助信息文字最多两行',
        },
        {
          title: '未完成',
          content: '辅助信息文字最多两行',
        },
      ]);
      const wrapper = mount({
        setup() {
          return () => <Steps v-model={current.value} options={options} />;
        },
      });
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(options.value.length);
      $stepItems.map(async (item, index) => {
        expect(item.find(`.t-step-icon__number`).text()).toEqual(String(index + 1));
        expect(item.find(`.t-step-title`).text()).toEqual(options.value[index].title);
        expect(item.find(`.t-step-description`).text()).toEqual(options.value[index].content);

        // 默认选中 下标为1的子项, 则 1 状态为 process,  1 之前的子项状态为 finish,  1 之后的子项状态为 default
        const classes = item.find(`.t-step`).classes();
        if (index < 1) {
          expect(classes.includes(`t-step--finish`)).toBeTruthy();
        } else if (index === 1) {
          expect(classes.includes(`t-step--process`)).toBeTruthy();
        } else {
          expect(classes.includes(`t-step--default`)).toBeTruthy();
        }
      });
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
                  return <Step title={item.title} content={item.content} status={item.status} />;
                }),
              }}
            </Steps>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find(`.t-steps`).classes().includes(`t-steps--vertical`)).toBeTruthy();
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(itemStatus.length);

      $stepItems.map((item, index) => {
        const classes = item.find(`.t-step`).classes();
        expect(classes.includes(`t-step--${itemStatus[index].status}`)).toBeTruthy();
      });
    });
  });

  describe('StepItem Slots', () => {
    it(': content && title', () => {
      const current = ref(1);
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value}>
              {{
                default: items.map((item, index) => {
                  return (
                    <Step>
                      {{
                        title: item.title,
                        content: item.content,
                      }}
                    </Step>
                  );
                }),
              }}
            </Steps>
          );
        },
      });
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.map((item, index) => {
        expect(item.find(`.t-step-icon__number`).text()).toEqual(String(index + 1));
        expect(item.find(`.t-step-title`).text()).toEqual(items[index].title);
        expect(item.find(`.t-step-description`).text()).toEqual(items[index].content);
      });
    });
  });

  describe('event', () => {
    it(': change', async () => {
      const current = ref(1);
      const options = ref([
        {
          title: '步骤描述',
          content: '辅助信息文字最多两行',
        },
        {
          title: '选中步骤',
          content: '辅助信息文字最多两行',
        },
        {
          title: '未完成',
          content: '辅助信息文字最多两行',
        },
      ]);
      const onChange = vi.fn();
      const event = {};
      const wrapper = mount({
        setup() {
          return () => <Steps v-model={current.value} options={options} onChange={onChange} />;
        },
      });
      const $stepItems = wrapper.findAllComponents(Step);
      expect($stepItems.length).toEqual(options.value.length);
      // 点击第 2 项, 触发 change, 此时 current = 2,
      await $stepItems[2].find(`.t-step__inner`).trigger('click', event);
      expect(onChange).toHaveBeenCalledTimes(1);

      $stepItems.map(async (item, index) => {
        //  current = 2, 则 2 状态为 process,  2 之前的子项状态为 finish,  2 之后的子项状态为 default
        const classes = item.find(`.t-step`).attributes('class');
        if (index < 2) {
          expect(classes.includes(`t-step--finish`)).toBeTruthy();
        } else if (index === 2) {
          expect(classes.includes(`t-step--process`)).toBeTruthy();
        } else {
          expect(classes.includes(`t-step--default`)).toBeTruthy();
        }
      });
    });
  });
});
