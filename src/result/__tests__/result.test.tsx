import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { InfoCircleIcon, CheckCircleIcon, CloseCircleIcon, AppIcon } from 'tdesign-icons-vue-next';
import Result from '../result';
import Image from '../../image/image';

const appIcon = () => h(AppIcon);
const imageUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

describe('Result', () => {
  describe('props', () => {
    it('description[string]', () => {
      const wrapper = mount(() => <Result description="描述"></Result>);
      const description = wrapper.find('.t-result__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('描述');
    });

    it('description[function]', () => {
      const wrapper = mount(() => <Result description={() => '函数描述'}></Result>);
      const description = wrapper.find('.t-result__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('函数描述');
    });

    it('icon[function]', () => {
      const wrapper = mount(() => <Result icon={appIcon}></Result>);
      const icon = wrapper.find('.t-result__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('image[string]', () => {
      const wrapper = mount(() => <Result image={imageUrl}></Result>);
      const image = wrapper.findComponent(Image);
      expect(image.exists()).toBeTruthy();
      expect(image.props('src')).toBe(imageUrl);
      expect(wrapper.find('.t-image__img').attributes('src')).toBe(imageUrl);
    });

    it('image[function]', () => {
      const wrapper = mount(() => <Result image={() => <img src={imageUrl} />}></Result>);
      const img = wrapper.find('.t-result__thumb img');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(imageUrl);
      // 函数返回节点时直接渲染该节点，不经过 TImage 组件
      expect(wrapper.findComponent(Image).exists()).toBeFalsy();
    });

    it('theme[default/success/warning/error]', () => {
      const wrapper1 = mount(() => <Result theme="success"></Result>);
      const wrapper2 = mount(() => <Result theme="warning"></Result>);
      const wrapper3 = mount(() => <Result theme="error"></Result>);
      const wrapper4 = mount(() => <Result theme="default"></Result>);
      const wrapper5 = mount(() => <Result></Result>);

      expect(wrapper1.classes()).toContain('t-result--theme-success');
      expect(wrapper1.findComponent(CheckCircleIcon).exists()).toBeTruthy();
      expect(wrapper2.classes()).toContain('t-result--theme-warning');
      expect(wrapper2.findComponent(InfoCircleIcon).exists()).toBeTruthy();
      expect(wrapper3.classes()).toContain('t-result--theme-error');
      expect(wrapper3.findComponent(CloseCircleIcon).exists()).toBeTruthy();

      expect(wrapper4.classes()).toContain('t-result--theme-default');
      expect(wrapper4.findComponent(InfoCircleIcon).exists()).toBeTruthy();
      // 未传 theme 时回退到 default
      expect(wrapper5.classes()).toContain('t-result--theme-default');
      expect(wrapper5.findComponent(InfoCircleIcon).exists()).toBeTruthy();
    });

    it('title[string]', () => {
      const wrapper = mount(() => <Result title="标题"></Result>);
      const title = wrapper.find('.t-result__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('标题');
    });

    it('title[function]', () => {
      const wrapper = mount(() => <Result title={() => '函数标题'}></Result>);
      const title = wrapper.find('.t-result__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('函数标题');
    });
  });

  describe('slots', () => {
    it('description', () => {
      const wrapper = mount(() => <Result v-slots={{ description: () => <span>插槽描述</span> }}></Result>);
      const description = wrapper.find('.t-result__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('插槽描述');
    });

    it('icon', () => {
      const wrapper = mount(() => <Result v-slots={{ icon: () => <AppIcon /> }}></Result>);
      const icon = wrapper.find('.t-result__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('image', () => {
      const wrapper = mount(() => <Result v-slots={{ image: () => <Image src={imageUrl} /> }}></Result>);
      const img = wrapper.find('.t-image__img');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(imageUrl);
    });

    it('title', () => {
      const wrapper = mount(() => <Result v-slots={{ title: () => <span>插槽标题</span> }}></Result>);
      const title = wrapper.find('.t-result__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('插槽标题');
    });
  });

  describe('scenarios', () => {
    it('renders default state', () => {
      const wrapper = mount(() => <Result></Result>);
      expect(wrapper.classes()).toContain('t-result');
      expect(wrapper.classes()).toContain('t-result--theme-default');
      expect(wrapper.find('.t-result__thumb').exists()).toBeTruthy();
      expect(wrapper.findComponent(InfoCircleIcon).exists()).toBeTruthy();
      expect(wrapper.find('.t-result__title').exists()).toBeFalsy();
      expect(wrapper.find('.t-result__description').exists()).toBeFalsy();
    });

    it('renders image with higher priority than icon', () => {
      const wrapper = mount(() => <Result image={imageUrl} icon={appIcon}></Result>);
      expect(wrapper.findComponent(Image).exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeFalsy();
    });

    it('renders prop value with higher priority than same-name slot', () => {
      const wrapper = mount(() => (
        <Result
          title="属性标题"
          description="属性描述"
          v-slots={{
            title: () => <span>插槽标题</span>,
            description: () => <span>插槽描述</span>,
          }}
        ></Result>
      ));
      expect(wrapper.find('.t-result__title').text()).toBe('属性标题');
      expect(wrapper.find('.t-result__description').text()).toBe('属性描述');
    });
  });
});
