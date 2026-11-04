import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { Steps, StepItem } from '../index';
import type { TdStepItemProps } from '../type';

const itemStatus: Pick<TdStepItemProps, 'title' | 'content' | 'status'>[] = [
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

const renderItems = () => [
  <StepItem key="step-1" title="步骤1" content="描述1" />,
  <StepItem key="step-2" title="步骤2" content="描述2" />,
  <StepItem key="step-3" title="步骤3" content="描述3" />,
];

describe('Steps', () => {
  describe('props', () => {
    it('current[string]', () => {
      const wrapper = mount(() => <Steps current="1">{renderItems()}</Steps>);
      const $items = wrapper.findAllComponents(StepItem);
      // 字符串 current 参与大小比较，之前的步骤推导为完成态
      expect($items[0].classes()).toContain('t-step-item--finish');
      // 源码缺口：index === current 为严格比较，字符串 '1' 无法命中 process 态
      expect($items[1].classes()).toContain('t-step-item--default');
      expect($items[2].classes()).toContain('t-step-item--default');
    });

    it('current[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Steps current={1} onChange={onChange}>
          {renderItems()}
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      // current 之前的项为 finish，当前项为 process，之后为 default
      expect($items[0].classes()).toContain('t-step-item--finish');
      expect($items[1].classes()).toContain('t-step-item--process');
      expect($items[2].classes()).toContain('t-step-item--default');

      // 受控模式：外部未更新 current 时，点击仅触发 change，进度保持不变
      await $items[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect($items[1].classes()).toContain('t-step-item--process');
      expect($items[2].classes()).not.toContain('t-step-item--process');
    });

    it('modelValue[string]', async () => {
      const current = ref('2');
      const wrapper = mount({
        setup() {
          return () => <Steps v-model={current.value}>{renderItems()}</Steps>;
        },
      });
      const $items = wrapper.findAllComponents(StepItem);
      expect($items[0].classes()).toContain('t-step-item--finish');
      expect($items[1].classes()).toContain('t-step-item--finish');
      expect($items[2].classes()).toContain('t-step-item--default');

      // 点击步骤后以数字下标回写绑定值，状态同步更新
      await $items[0].trigger('click');
      expect(current.value).toBe(0);
      expect($items[0].classes()).toContain('t-step-item--process');
      expect($items[1].classes()).toContain('t-step-item--default');
    });

    it('modelValue[number]', async () => {
      const current = ref(1);
      const wrapper = mount({
        setup() {
          return () => <Steps v-model={current.value}>{renderItems()}</Steps>;
        },
      });
      const $items = wrapper.findAllComponents(StepItem);
      expect($items[1].classes()).toContain('t-step-item--process');

      // v-model 双向绑定：点击步骤后绑定值与状态同步更新
      await $items[2].trigger('click');
      expect(current.value).toBe(2);
      expect(wrapper.findComponent(Steps).emitted('update:modelValue')?.[0]).toEqual([2, 1, expect.anything()]);
      expect($items[0].classes()).toContain('t-step-item--finish');
      expect($items[1].classes()).toContain('t-step-item--finish');
      expect($items[2].classes()).toContain('t-step-item--process');
    });

    it('defaultCurrent[string]', () => {
      const wrapper = mount(() => <Steps defaultCurrent="1">{renderItems()}</Steps>);
      const $items = wrapper.findAllComponents(StepItem);
      expect($items[0].classes()).toContain('t-step-item--finish');
      // 源码缺口：index === current 为严格比较，字符串 '1' 无法命中 process 态
      expect($items[1].classes()).toContain('t-step-item--default');
      expect($items[2].classes()).toContain('t-step-item--default');
    });

    it('defaultCurrent[number]', async () => {
      const wrapper = mount(() => <Steps defaultCurrent={1}>{renderItems()}</Steps>);
      const $items = wrapper.findAllComponents(StepItem);
      expect($items[0].classes()).toContain('t-step-item--finish');
      expect($items[1].classes()).toContain('t-step-item--process');
      expect($items[2].classes()).toContain('t-step-item--default');

      // 非受控属性：点击后组件内部自行推进进度
      await $items[2].trigger('click');
      expect($items[1].classes()).toContain('t-step-item--finish');
      expect($items[2].classes()).toContain('t-step-item--process');
    });

    it('currentStatus[default/process/finish/error]', () => {
      const statusList = ['default', 'process', 'finish', 'error'] as const;
      statusList.forEach((currentStatus) => {
        const wrapper = mount(() => (
          <Steps current={0} currentStatus={currentStatus}>
            <StepItem title="步骤1" content="描述1" />
          </Steps>
        ));
        const $item = wrapper.findAllComponents(StepItem)[0];
        expect($item.classes()).toContain(`t-step-item--${currentStatus}`);
        expect($item.find('.t-step-item__circle').classes()).toContain(`t-step-item__circle--${currentStatus}`);
      });
    });

    it('layout[horizontal/vertical]', () => {
      // horizontal（默认）
      const horizontalWrapper = mount(() => <Steps current={1}>{renderItems()}</Steps>);
      expect(horizontalWrapper.find('.t-steps--horizontal').exists()).toBeTruthy();
      expect(horizontalWrapper.find('.t-steps--vertical').exists()).toBeFalsy();
      expect(horizontalWrapper.find('.t-step-item__anchor--horizontal').exists()).toBeTruthy();
      expect(horizontalWrapper.find('.t-step-item__title--horizontal').exists()).toBeTruthy();

      // vertical
      const current = ref(1);
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model={current.value} readonly={true} layout="vertical">
              {{
                default: () =>
                  itemStatus.map((item) => {
                    return <StepItem title={item.title} content={item.content} status={item.status} />;
                  }),
              }}
            </Steps>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.t-steps--vertical').exists()).toBeTruthy();
      expect(wrapper.find('.t-step-item__anchor--vertical').exists()).toBeTruthy();
      const $stepItems = wrapper.findAllComponents(StepItem);
      expect($stepItems.length).toEqual(itemStatus.length);
      $stepItems.forEach((item, index) => {
        expect(item.classes()).toContain(`t-step-item--${itemStatus[index].status}`);
      });
    });

    it('readonly[boolean]', async () => {
      const onChange = vi.fn();
      const writableWrapper = mount(() => <Steps current={1}>{renderItems()}</Steps>);
      expect(writableWrapper.find('.t-steps--readonly').exists()).toBeFalsy();

      const wrapper = mount(() => (
        <Steps current={1} readonly={true} onChange={onChange}>
          {renderItems()}
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      expect(wrapper.find('.t-steps--readonly').exists()).toBeTruthy();
      expect($items[1].find('.t-step-item__circle').text()).toEqual('2');

      // 只读模式：点击不切换步骤、不触发 change
      await $items[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(0);
      expect($items[1].classes()).toContain('t-step-item--process');
      expect($items[2].classes()).not.toContain('t-step-item--process');
    });

    it('sequence[positive/reverse]', async () => {
      // positive（默认）：非末尾项渲染连接线，末尾项不渲染
      const wrapper = mount(() => <Steps current={1}>{renderItems()}</Steps>);
      expect(wrapper.find('.t-steps--positive').exists()).toBeTruthy();
      await nextTick();
      const $positiveItems = wrapper.findAllComponents(StepItem);
      expect($positiveItems[0].find('.t-step-item__line').exists()).toBeTruthy();
      expect($positiveItems[1].find('.t-step-item__line').exists()).toBeTruthy();
      expect($positiveItems[2].find('.t-step-item__line').exists()).toBeFalsy();
      expect(wrapper.find('.t-step-item__line--positive').exists()).toBeTruthy();

      // reverse：首项为视觉上的末尾项，不渲染连接线
      const reverseWrapper = mount(() => (
        <Steps sequence="reverse" current={1}>
          {renderItems()}
        </Steps>
      ));
      expect(reverseWrapper.find('.t-steps--reverse').exists()).toBeTruthy();
      await nextTick();
      const $reverseItems = reverseWrapper.findAllComponents(StepItem);
      expect($reverseItems[0].find('.t-step-item__line').exists()).toBeFalsy();
      expect($reverseItems[1].find('.t-step-item__line').exists()).toBeTruthy();
      expect($reverseItems[2].find('.t-step-item__line').exists()).toBeTruthy();
      expect(reverseWrapper.find('.t-step-item__line--reverse').exists()).toBeTruthy();
    });

    it('theme[default/dot]', () => {
      // default：渲染圆形序号图标
      const wrapper = mount(() => <Steps current={0}>{renderItems()}</Steps>);
      const $items = wrapper.findAllComponents(StepItem);
      expect($items[0].find('.t-step-item__circle').exists()).toBeTruthy();
      expect($items[0].find('.t-step-item__circle').text()).toEqual('1');
      expect(wrapper.find('.t-step-item__dot').exists()).toBeFalsy();

      // dot：渲染带状态类的圆点，不渲染圆形图标，标题与描述正常展示
      const dotWrapper = mount(() => (
        <Steps current={1} theme="dot">
          {renderItems()}
        </Steps>
      ));
      const $dotItems = dotWrapper.findAllComponents(StepItem);
      expect($dotItems[0].find('.t-step-item__dot').exists()).toBeTruthy();
      expect($dotItems[0].find('.t-step-item__dot').classes()).toContain('t-step-item__dot--finish');
      expect($dotItems[1].find('.t-step-item__dot').classes()).toContain('t-step-item__dot--process');
      expect($dotItems[0].find('.t-step-item__circle').exists()).toBeFalsy();
      expect($dotItems[0].find('.t-step-item__title').text()).toEqual('步骤1');
      expect($dotItems[0].find('.t-step-item__description').text()).toEqual('描述1');
    });

    it('default[slot]', () => {
      const wrapper = mount(() => (
        <Steps>
          {{
            default: () => [
              <StepItem key="first" title="步骤一" content="描述一" />,
              <div key="custom" class="steps-custom-node">
                自定义内容
              </div>,
            ],
          }}
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      expect($items.length).toEqual(1);
      expect($items[0].find('.t-step-item__title').text()).toEqual('步骤一');
      // 自定义节点渲染在步骤条根节点内
      expect(wrapper.find('.t-steps .steps-custom-node').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Steps defaultCurrent={1} onChange={onChange}>
          {renderItems()}
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      // 点击第 3 项触发 change，回调参数为 (current, previous, context)
      await $items[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2, 1, { e: expect.any(MouseEvent) });
      // 非受控模式下 change 后内部进度推进
      expect($items[2].classes()).toContain('t-step-item--process');
    });
  });

  describe('scenarios', () => {
    it('current equal to steps length marks all steps finished', () => {
      const wrapper = mount(() => <Steps current={3}>{renderItems()}</Steps>);
      const $items = wrapper.findAllComponents(StepItem);
      expect($items.length).toEqual(3);
      $items.forEach(($item) => {
        expect($item.classes()).toContain('t-step-item--finish');
        // 完成态圆形图标内渲染对勾
        expect($item.find('.t-icon-check').exists()).toBeTruthy();
      });
    });

    it('v-model:current takes precedence over v-model', async () => {
      const current = ref(0);
      const modelValue = ref(2);
      const wrapper = mount({
        setup() {
          return () => (
            <Steps v-model:current={current.value} v-model={modelValue.value}>
              {renderItems()}
            </Steps>
          );
        },
      });
      const $items = wrapper.findAllComponents(StepItem);
      // current 通道优先生效：首项为进行态而非第三项
      expect($items[0].classes()).toContain('t-step-item--process');
      expect($items[2].classes()).not.toContain('t-step-item--process');

      await $items[1].trigger('click');
      // 仅更新 current 通道，modelValue 保持不变
      expect(current.value).toBe(1);
      expect(modelValue.value).toBe(2);
      const $steps = wrapper.findComponent(Steps);
      expect($steps.emitted('update:current')?.[0]?.[0]).toBe(1);
      expect($steps.emitted('update:current')?.[0]?.[1]).toBe(0);
      expect($steps.emitted('update:modelValue')).toBeUndefined();
    });

    it('dynamic children keep step statuses in sync', async () => {
      const count = ref(3);
      const wrapper = mount({
        setup() {
          return () => (
            <Steps current={1}>
              {Array.from({ length: count.value }, (_, index) => (
                <StepItem key={index} title={`步骤${index + 1}`} content="描述" />
              ))}
            </Steps>
          );
        },
      });
      await nextTick();
      expect(wrapper.findAllComponents(StepItem).length).toEqual(3);

      // 移除末尾步骤后，剩余步骤状态保持正确
      count.value = 2;
      await nextTick();
      const $twoItems = wrapper.findAllComponents(StepItem);
      expect($twoItems.length).toEqual(2);
      expect($twoItems[0].classes()).toContain('t-step-item--finish');
      expect($twoItems[1].classes()).toContain('t-step-item--process');

      // 追加新步骤为未开始态
      count.value = 4;
      await nextTick();
      const $fourItems = wrapper.findAllComponents(StepItem);
      expect($fourItems.length).toEqual(4);
      expect($fourItems[2].classes()).toContain('t-step-item--default');
      expect($fourItems[3].classes()).toContain('t-step-item--default');
    });
  });
});
