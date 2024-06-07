import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { AddCircleIcon } from 'tdesign-icons-vue-next';
import { describe, it, vi } from 'vitest';
import ImageViewer from '../image-viewer';
import { Swiper } from '../../swiper';
import { trigger, triggerZoom } from './touch';

const images = ref([
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
  'https://imgcache.qq.com/open_proj/proj_qcloud_v2/rocket_images/1606728019829_yw760ok1jmpbep14i.png',
]);

describe('ImageViewer', () => {
  describe('props', () => {
    it(':closeBtn', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} closeBtn={false} />);

      expect(wrapper.find('.t-image-viewer__nav-close').exists()).toBe(false);
    });

    it(':images', async () => {
      const emptyImages = mount(<ImageViewer visible={true} />);
      expect(emptyImages.find('.t-swiper-item').exists()).toBe(false);

      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} />);

      await nextTick();
      expect(wrapper.findAll('.t-swiper-item').length).toBe(images.value.length);

      images.value.pop();
      await nextTick();
      expect(wrapper.findAll('.t-swiper-item').length).toBe(images.value.length);
    });

    // it(':maxZoom', async () => {
    //   const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} maxZoom={2} />);

    //   const target = wrapper.find('.t-swiper-item');
    //   triggerZoom(target, 200, 200, 'in');
    //   expect(wrapper.vm.imageStyle).toMatchObject({ transform: `scale(${2}, ${2})` });

    //   triggerZoom(target, 200, 200, 'out');
    //   expect(wrapper.vm.imageStyle).not.toHaveProperty('transform');

    //   // 测试 toggleScale
    //   trigger(target, 'touchstart', 50, 50);
    //   trigger(target, 'touchend', 50, 50);

    //   await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve();
    //     }, 100); // 小于 TAP_TIME
    //   });
    //   trigger(target, 'touchstart', 50, 50);
    //   trigger(target, 'touchend', 50, 50);
    // });

    it(':visible', async () => {
      const visible = ref(false);
      const wrapper = mount(<ImageViewer v-model:images={images.value} v-model:visible={visible.value} />);

      expect(wrapper.findComponent(Swiper).exists()).toBe(false);
      visible.value = true;
    });
  });

  describe('slots', () => {
    it(':closeBtn', () => {
      const wrapper = mount(
        <ImageViewer v-model:images={images.value} visible={true} closeBtn={() => <AddCircleIcon />} />,
      );

      expect(wrapper.findComponent(AddCircleIcon).exists()).toBe(true);
    });
  });

  describe('event', () => {
    it(':close', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} />);

      await wrapper.find('.t-image-viewer__nav-close').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('close');
    });

    it(': delete', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} delete-btn={true} />);
      
      await wrapper.find('.t-image-viewer__nav-delete').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('delete');
    });
  });
});
