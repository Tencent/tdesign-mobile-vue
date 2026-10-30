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
    it('title[string]', async () => {
      const wrapper = mount(() => <Result title="标题"></Result>);
      const title = wrapper.find('.t-result__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('标题');
    });

    it('title[function]', async () => {
      const wrapper = mount(() => <Result title={() => '函数标题'}></Result>);
      const title = wrapper.find('.t-result__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('函数标题');
    });

    it('description[string]', async () => {
      const wrapper = mount(() => <Result description="描述"></Result>);
      const description = wrapper.find('.t-result__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('描述');
    });

    it('description[function]', async () => {
      const wrapper = mount(() => <Result description={() => '函数描述'}></Result>);
      const description = wrapper.find('.t-result__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('函数描述');
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <Result icon={appIcon}></Result>);
      const icon = wrapper.find('.t-result__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('theme[default/success/warning/error]', async () => {
      const wrapper1 = mount(() => <Result theme="success"></Result>);
      const wrapper2 = mount(() => <Result theme="warning"></Result>);
      const wrapper3 = mount(() => <Result theme="error"></Result>);
      const wrapper4 = mount(() => <Result theme={''}></Result>);

      expect(wrapper1.classes()).toContain('t-result--theme-success');
      expect(wrapper1.findComponent(CheckCircleIcon).exists()).toBeTruthy();
      expect(wrapper2.classes()).toContain('t-result--theme-warning');
      expect(wrapper2.findComponent(InfoCircleIcon).exists()).toBeTruthy();
      expect(wrapper3.classes()).toContain('t-result--theme-error');
      expect(wrapper3.findComponent(CloseCircleIcon).exists()).toBeTruthy();

      expect(wrapper4.classes()).toContain('t-result--theme-default');
    });
  });

  describe('slots', () => {
    it('image', async () => {
      const slots = {
        image: () => <Image src={imageUrl} />,
      };
      const wrapper = mount(() => <Result v-slots={slots}></Result>);
      const img = wrapper.find('.t-image img');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(imageUrl);
    });
  });

  describe('scenarios', () => {
    it('renders default root class', async () => {
      const wrapper = mount(() => <Result></Result>);
      expect(wrapper.classes()).toContain('t-result');
    });
  });
});
