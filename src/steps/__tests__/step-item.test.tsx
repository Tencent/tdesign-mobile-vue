import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { Steps, StepItem } from '../index';
import type { StepStatus } from '../type';

describe('StepItem', () => {
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="标题" content="文字描述" />
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__description').text()).toEqual('文字描述');
    });

    it('content[function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="标题" content={() => <span class="custom-content">函数描述</span>} />
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__description .custom-content').exists()).toBeTruthy();
      expect(wrapper.find('.t-step-item__description').text()).toEqual('函数描述');
    });

    it('content[slot]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="标题">{{ content: () => <span class="slot-content">插槽描述</span> }}</StepItem>
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__description .slot-content').exists()).toBeTruthy();
    });

    it('icon[function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="标题" content="内容" icon={() => <span class="custom-step-icon">图标</span>} />
        </Steps>
      ));
      // 自定义图标渲染在图标容器内，且不再渲染圆形序号图标
      expect(wrapper.find('.t-step-item__icon .custom-step-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-step-item__circle').exists()).toBeFalsy();
    });

    // 文档声明 icon 支持 boolean（值为 false 时不显示图标），源码中 false 会回退渲染内置图标，待源码实现后补充
    it.todo('icon[boolean]');
    it('icon[slot]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="标题">{{ icon: () => <span class="slot-icon">插槽图标</span> }}</StepItem>
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__icon .slot-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-step-item__circle').exists()).toBeFalsy();
    });

    it('status[default/process/finish/error]', () => {
      const statusList: StepStatus[] = ['process', 'finish', 'error', 'default'];
      const wrapper = mount(() => (
        <Steps current={0}>
          {statusList.map((status) => (
            <StepItem key={status} title="标题" content="内容" status={status} />
          ))}
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      // 显式 status 优先于按 current 推导的状态
      statusList.forEach((status, index) => {
        expect($items[index].classes()).toContain(`t-step-item--${status}`);
      });
      // 各状态圆形图标内容：完成态为对勾、错误态为叉号、其余为序号
      expect($items[0].find('.t-step-item__circle').text()).toEqual('1');
      expect($items[1].find('.t-icon-check').exists()).toBeTruthy();
      expect($items[2].find('.t-icon-close').exists()).toBeTruthy();
      expect($items[3].find('.t-step-item__circle').text()).toEqual('4');
    });

    it('title[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="文字标题" content="内容" />
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__title').text()).toEqual('文字标题');
    });

    it('title[function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title={() => <span class="custom-title">函数标题</span>} content="内容" />
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__title .custom-title').exists()).toBeTruthy();
      expect(wrapper.find('.t-step-item__title').text()).toEqual('函数标题');
    });

    it('title[slot]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem content="内容">{{ title: () => <span class="slot-title">插槽标题</span> }}</StepItem>
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__title .slot-title').exists()).toBeTruthy();
    });

    it('titleRight[string]', () => {
      const wrapper = mount(() => (
        <Steps layout="vertical">
          <StepItem title="标题" titleRight="右侧信息" content="内容" />
        </Steps>
      ));
      // titleRight 渲染在标题区域内、标题文字之后
      expect(wrapper.find('.t-step-item__title').text()).toEqual('标题右侧信息');
    });

    it('titleRight[function]', () => {
      const wrapper = mount(() => (
        <Steps layout="vertical">
          <StepItem title="标题" titleRight={() => <span class="title-right">右侧文字</span>} />
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__title .title-right').exists()).toBeTruthy();
    });

    it('titleRight[slot]', () => {
      const wrapper = mount(() => (
        <Steps layout="vertical">
          <StepItem title="标题">{{ titleRight: () => <span class="slot-title-right">插槽右侧</span> }}</StepItem>
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__title .slot-title-right').exists()).toBeTruthy();
    });

    it('extra[slot]', () => {
      const wrapper = mount(() => (
        <Steps layout="vertical">
          <StepItem title="标题" content="内容">
            {{ extra: () => <span class="slot-extra">插槽额外内容</span> }}
          </StepItem>
        </Steps>
      ));
      expect(wrapper.find('.t-step-item__extra .slot-extra').exists()).toBeTruthy();
    });
  });

  describe('scenarios', () => {
    it('icon prop has priority over status icon', () => {
      const wrapper = mount(() => (
        <Steps current={0}>
          <StepItem title="自定义图标" status="error" icon={() => <span class="custom-icon">自</span>} />
          <StepItem title="内置图标" status="error" />
        </Steps>
      ));
      const $items = wrapper.findAllComponents(StepItem);
      // 错误状态下：自定义图标优先渲染，内置叉号图标不渲染
      expect($items[0].find('.custom-icon').exists()).toBeTruthy();
      expect($items[0].find('.t-icon-close').exists()).toBeFalsy();
      // 未自定义图标的项仍渲染内置叉号图标
      expect($items[1].find('.t-icon-close').exists()).toBeTruthy();
    });

    it('separator line visibility', async () => {
      const wrapper = mount(() => (
        <Steps layout="vertical">
          <StepItem title="步骤一" content="描述" />
          <StepItem title="步骤二" content="描述" />
        </Steps>
      ));
      await nextTick();
      const $items = wrapper.findAllComponents(StepItem);
      // 非末尾项渲染连接线，末尾项不渲染
      expect($items[0].find('.t-step-item__line').exists()).toBeTruthy();
      expect($items[1].find('.t-step-item__line').exists()).toBeFalsy();
    });
  });
});
