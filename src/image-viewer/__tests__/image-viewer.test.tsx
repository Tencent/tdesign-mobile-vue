import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { AddCircleIcon, DeleteIcon, CloseIcon } from 'tdesign-icons-vue-next';
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
    // it('maxZoom', async () => {
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

    it('closeBtn[boolean]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} closeBtn={false} />);

      expect(wrapper.findComponent(CloseIcon).exists()).toBeFalsy();
    });

    it('closeBtn[function]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} closeBtn={() => '自定义关闭'} />);

      expect(wrapper.text()).toContain('自定义关闭');
    });

    it('cover[function]', async () => {
      const wrapper = mount(
        <ImageViewer
          v-model:images={images.value}
          visible={true}
          cover={() => <div class="custom-cover">自定义封面</div>}
        />,
      );

      expect(wrapper.find('.t-image-viewer__cover .custom-cover').exists()).toBe(true);
    });

    it('deleteBtn[boolean]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} deleteBtn={true} />);

      expect(wrapper.find('.t-image-viewer__nav-delete').findComponent(DeleteIcon).exists()).toBe(true);

      const wrapper2 = mount(<ImageViewer v-model:images={images.value} visible={true} />);

      expect(wrapper2.find('.t-image-viewer__nav-delete').findComponent(DeleteIcon).exists()).toBe(false);
    });

    it('images[array]', async () => {
      const emptyImages = mount(<ImageViewer visible={true} />);
      expect(emptyImages.find('.t-swiper-item').exists()).toBe(false);

      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} />);

      await nextTick();
      expect(wrapper.findAll('.t-swiper-item').length).toBe(images.value.length);

      images.value.pop();
      await nextTick();
      expect(wrapper.findAll('.t-swiper-item').length).toBe(images.value.length);
    });

    it('index[number]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} index={1} showIndex />);
      await nextTick();

      expect(wrapper.find('.t-image-viewer__nav-index').text()).toBe(`2/${images.value.length}`);
    });

    it('defaultIndex[number]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} defaultIndex={1} showIndex />);

      expect(wrapper.find('.t-image-viewer__nav-index').text()).toBe(`2/${images.value.length}`);
    });

    // loop 透传 Swiper 循环滚动行为，需真实滑动交互验证
    it.todo('loop[boolean]');

    it('showIndex[boolean]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} showIndex />);

      expect(wrapper.find('.t-image-viewer__nav-index').exists()).toBe(true);
      expect(wrapper.find('.t-image-viewer__nav-index').text()).toBe(`1/${images.value.length}`);

      const wrapper2 = mount(<ImageViewer v-model:images={images.value} visible={true} showIndex={false} />);

      expect(wrapper2.find('.t-image-viewer__nav-index').exists()).toBe(false);
    });

    it('visible[boolean]', async () => {
      const visible = ref(false);
      const wrapper = mount(<ImageViewer v-model:images={images.value} v-model:visible={visible.value} />);

      expect(wrapper.findComponent(Swiper).exists()).toBe(false);
      visible.value = true;
    });

    it('defaultVisible[boolean]', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} defaultVisible />);

      expect(wrapper.findComponent(Swiper).exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('closeBtn', () => {
      const wrapper = mount(
        <ImageViewer v-model:images={images.value} visible={true} closeBtn={() => <AddCircleIcon />} />,
      );

      expect(wrapper.findComponent(AddCircleIcon).exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('close', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} />);

      await wrapper.find('.t-image-viewer__nav-close').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('close');
    });

    it('delete', async () => {
      const wrapper = mount(<ImageViewer v-model:images={images.value} visible={true} delete-btn={true} />);

      await wrapper.find('.t-image-viewer__nav-delete').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('delete');
    });
  });
});
