import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick, ref } from 'vue';
import { Steps, StepItem } from '../index';

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

describe('StepItem', () => {
  describe('props', () => {
    it('title[string] & content[string]', async () => {
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
      $stepItems.forEach((item, index) => {
        expect(item.find(`.t-step-item__title`).text()).toEqual(stepItems.value[index].title);
        expect(item.find(`.t-step-item__description`).text()).toEqual(stepItems.value[index].content);
      });
    });
  });
});
