import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Image from '../image.vue';
import { LoadingIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import { vi } from 'vitest';

const IMAGE = 'https://tdesign.gtimg.com/site/upload1.png';
const FAIL_IMAGE = 'https://123.jpg';
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const shapeList = ['circle', 'round', 'square'];
const positionList = ['top', 'bottom', 'center', 'left', 'right'];

describe('Image.vue', () => {
  it('create', async () => {
    const wrapper = mount(() => <Image src={IMAGE} />);
    const img = wrapper.find('.t-image__img');
    expect(wrapper.classes()).toContain('t-image');
    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toBe(IMAGE);
  });

  it('alt render', async () => {
    const wrapper = mount(() => <Image src={IMAGE} alt="图片" />);
    const img = wrapper.find('.t-image__img');
    expect(wrapper.classes()).toContain('t-image');
    expect(img.attributes('alt')).toBe('图片');
  });

  it('fit render', async () => {
    fitList.forEach((fit) => {
      const wrapper = mount(() => <Image src={IMAGE} fit={fit} />);
      const img = wrapper.find('.t-image__img');
      expect(img.attributes('style')).toContain(`object-fit: ${fit}`);
    });
  });

  it('shape render', async () => {
    shapeList.forEach((shape) => {
      const wrapper = mount(() => <Image src={IMAGE} shape={shape} />);
      expect(wrapper.classes()).toContain(`t-image--${shape}`);
    });
  });

  it('position render', async () => {
    positionList.forEach((position) => {
      const wrapper = mount(() => <Image src={IMAGE} position={position} />);
      const img = wrapper.find('.t-image__img');
      expect(img.attributes('style')).toContain(`object-position: ${position}`);
    });
  });

  it('loading render', async () => {
    const slots = {
      loading: () => <LoadingIcon />,
    };
    const wrapper = mount(() => <Image src={IMAGE} v-slots={slots} />);
    const status = wrapper.find('.t-image__status');
    expect(status.exists()).toBeTruthy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
  });

  it('error render', async () => {
    const onError = vi.fn();
    const slots = {
      error: () => '加载失败',
    };
    const wrapper = mount(() => <Image src={FAIL_IMAGE} v-slots={slots} onError={onError} />);
    const img = wrapper.find('.t-image__img');
    const status = wrapper.find('.t-image__status');
    await nextTick();
    await img.trigger('error');
    expect(status.exists()).toBeTruthy();
    expect(status.text()).toBe('加载失败');
    expect(onError).toBeCalled();
  });

  it('load render', async () => {
    const onLoad = vi.fn();
    const wrapper = mount(() => <Image src={IMAGE} onLoad={onLoad} />);
    const img = wrapper.find('.t-image__img');
    await nextTick();
    img.trigger('load');
    expect(onLoad).toBeCalled();
  });
});
