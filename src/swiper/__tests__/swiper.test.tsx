import { describe, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Swiper from '../swiper';
import SwiperItem from '../swiper-item';
import type { TdSwiperProps } from '../type';

const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
const classPrefix = 't-swiper';
const list = [
  {
    image: 'https://tdesign.gtimg.com/site/swiper/01.png',
  },
  {
    image: 'https://tdesign.gtimg.com/site/swiper/02.png',
  },
  {
    image: 'https://tdesign.gtimg.com/site/swiper/03.png',
  },
];

describe('Swiper', () => {
  // it('duration && paginationPosition', async () => {
  //   const current = ref(1);
  //   const duration = 100;
  //   const interval = 100;
  //   const navigation = {
  //     type: 'dots',
  //     showSlideBtn: false,
  //   };
  //   const paginationPosition = 'top';
  //   const onChange = vi.fn();
  //   const wrapper = mount({
  //     setup() {
  //       return () => (
  //         <Swiper
  //           v-model={current.value}
  //           interval={interval}
  //           duration={duration}
  //           navigation={navigation}
  //           paginationPosition={paginationPosition}
  //           onChange={onChange}
  //         >
  //           {{
  //             default: list.map((item, index) => {
  //               return (
  //                 <SwiperItem>
  //                   {{
  //                     default: () => {
  //                       return <img src={item.image} />;
  //                     },
  //                   }}
  //                 </SwiperItem>
  //               );
  //             }),
  //           }}
  //         </Swiper>
  //       );
  //     },
  //   });
  //   await sleep(interval + duration);
  //   const $swiper = wrapper.find(`.${classPrefix}`);
  //   const $swiperContainer = wrapper.find(`.${classPrefix}__container`);

  //   // 模拟触发 transitionend
  //   $swiperContainer.trigger(`transitionend`);

  //   // duration = 100
  //   expect($swiperContainer.attributes('style').includes(`transform ${duration}ms;`));

  //   // swiper 会复制首项和末项， 所有 swiper-item 个数是 list.length + 2
  //   const $swiperItems = wrapper.findAll(`.${classPrefix}-item`);
  //   expect($swiperItems).toHaveLength(list.length + 2);

  //   // 导航器
  //   const $pagination = wrapper.find(`.${classPrefix}__pagination`);
  //   expect(
  //     $pagination
  //       .attributes('class')
  //       .includes(`t-swiper__pagination-${navigation.type} t-swiper__pagination-${paginationPosition}`),
  //   );

  //   // 导航器 dot
  //   const $dots = wrapper.findAll(`.${classPrefix}-dot`);
  //   expect($dots).toHaveLength(list.length);
  //   // 初始化时，current 项为激活态
  //   expect($dots[current.value].attributes('class').includes(`t-swiper-dot--active`)).toBeTruthy();
  // });

  describe('props', () => {
    it('autoplay[boolean] & interval[number]', async () => {
      vi.useFakeTimers();
      try {
        const current = ref(0);
        const onChange = vi.fn();
        mount({
          setup() {
            return () => (
              <Swiper v-model={current.value} autoplay interval={200} onChange={onChange}>
                {list.map((item) => (
                  <SwiperItem>
                    <img src={item.image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });

        // 未到 interval 不切换
        await vi.advanceTimersByTimeAsync(199);
        expect(onChange).toHaveBeenCalledTimes(0);
        // 到达 interval 后自动切换到下一张
        await vi.advanceTimersByTimeAsync(1);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(1, { source: 'autoplay' });
        expect(current.value).toBe(1);

        // autoplay = false 时不自动播放
        const onChange2 = vi.fn();
        mount({
          setup() {
            return () => (
              <Swiper autoplay={false} interval={200} onChange={onChange2}>
                {list.map((item) => (
                  <SwiperItem>
                    <img src={item.image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        await vi.advanceTimersByTimeAsync(1000);
        expect(onChange2).toHaveBeenCalledTimes(0);
      } finally {
        vi.useRealTimers();
      }
    });

    it('current[number]', async () => {
      const current = ref(1);
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper current={current.value} autoplay={false}>
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      // 等待 SwiperItem 注册与导航器渲染
      await nextTick();
      await nextTick();
      const getDots = () => wrapper.findAll(`.${classPrefix}-nav__dots-item`);
      expect(getDots()).toHaveLength(list.length);
      expect(getDots()[1].classes()).toContain(`${classPrefix}-nav__dots-item--active`);

      // 受控跳页：外部修改 current 后激活项切换
      current.value = 2;
      await nextTick();
      await nextTick();
      expect(getDots()[2].classes()).toContain(`${classPrefix}-nav__dots-item--active`);
      expect(getDots()[1].classes()).not.toContain(`${classPrefix}-nav__dots-item--active`);
    });

    it('height[number] & direction[string]', async () => {
      const current = ref(1);
      const height = 200;
      const duration = 100;
      const interval = 100;
      const direction = 'vertical';
      const navigation = {
        type: 'dots-bar',
        showSlideBtn: false,
      };
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model={current.value}
              interval={interval}
              duration={duration}
              height={height}
              navigation={navigation}
              direction={direction}
              onChange={onChange}
            >
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      // expect(wrapper.element).toMatchSnapshot();
      // const $swiper = wrapper.find(`.${classPrefix}`);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
      $swiperContainer.trigger(`transitionend`);
      // expect(
      //   $swiperContainer
      //     .attributes('style')
      //     .includes(`flex-direction: column; transform: translateY(-${height * (1 + current.value)}px);`),
      // );

      // height = 200
      expect($swiperContainer.attributes('style').includes(`height: ${height}px;`));

      // 导航器 dots-bar
      // const $pagination = wrapper.find(`.${classPrefix}__pagination`);
      // expect($pagination.attributes('class').includes(`t-swiper__pagination-${navigation.type}`));
      // const $dots = wrapper.findAll(`.${classPrefix}-dot`);
      // expect($dots).toHaveLength(list.length);
    });

    it('loop[boolean]', async () => {
      vi.useFakeTimers();
      try {
        // 循环模式（默认）：最后一页后回到第一页
        const current = ref(0);
        const onChange = vi.fn();
        mount({
          setup() {
            return () => (
              <Swiper v-model={current.value} autoplay loop interval={100} onChange={onChange}>
                {list.map((item) => (
                  <SwiperItem>
                    <img src={item.image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        await vi.advanceTimersByTimeAsync(300);
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange).toHaveBeenLastCalledWith(0, { source: 'autoplay' });
        expect(current.value).toBe(0);

        // 非循环模式：到达最后一页后停止切换
        const current2 = ref(0);
        const onChange2 = vi.fn();
        mount({
          setup() {
            return () => (
              <Swiper v-model={current2.value} autoplay loop={false} interval={100} onChange={onChange2}>
                {list.map((item) => (
                  <SwiperItem>
                    <img src={item.image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        await vi.advanceTimersByTimeAsync(300);
        expect(onChange2).toHaveBeenCalledTimes(2);
        expect(onChange2).toHaveBeenLastCalledWith(2, { source: 'autoplay' });
        expect(current2.value).toBe(2);
      } finally {
        vi.useRealTimers();
      }
    });

    it('navigation[minShowNum]', async () => {
      const current = ref(1);
      const duration = 100;
      const interval = 100;
      const navigation = {
        type: 'dots',
        showControls: false,
        minShowNum: 4,
      };
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model={current.value}
              interval={interval}
              duration={duration}
              navigation={navigation}
              onChange={onChange}
            >
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      // minShowNum = 4, 大于 list.length, 不会出现导航器
      const $pagination = wrapper.find(`.${classPrefix}__pagination`);
      expect($pagination.exists()).toBeFalsy();
    });

    it('navigation[controls]', async () => {
      const current = ref(1); // 受控
      const duration = 100;
      const interval = 100;
      const navigation = {
        showControls: true,
      };
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model:current={current.value}
              autoplay={false}
              loop={false}
              interval={interval}
              duration={duration}
              navigation={navigation}
              onChange={onChange}
            >
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
      $swiperContainer.trigger(`transitionend`);
      const $btn = wrapper.findAll(`.${classPrefix}-nav__btn`);
      expect($btn).toHaveLength(1);
      const $btnPrev = wrapper.find(`.${classPrefix}-nav__btn--prev`);

      // 模拟触发 click 事件
      $btnPrev.trigger('click');
      await sleep(200);
      expect(onChange).toHaveBeenCalledTimes(1, { source: 'nav' });
      expect(onChange).toHaveBeenCalledWith(0, { source: 'nav' });
    });
  });

  describe('events', () => {
    it('change', async () => {
      const current = ref(1);
      const duration = 100;
      const interval = 100;
      const navigation = {
        showControls: true,
      };
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model={current.value}
              autoplay={false}
              loop={false}
              interval={interval}
              duration={duration}
              navigation={navigation}
              onChange={onChange}
            >
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
      $swiperContainer.trigger(`transitionend`);
      const $btnNext = wrapper.find(`.${classPrefix}-nav__btn--next`);
      $btnNext.trigger('click');
      await sleep(200);
      expect(onChange).toHaveBeenCalledTimes(1, { source: 'nav' });
      expect(onChange).toHaveBeenCalledWith(2, { source: 'nav' });
    });

    it('change (touch)', async () => {
      const current = ref(1);
      const duration = 100;
      const onChange = vi.fn();
      const direction = ref<TdSwiperProps['direction']>('horizontal');
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model={current.value}
              autoplay={false}
              loop={true}
              duration={duration}
              direction={direction.value}
              onChange={onChange}
            >
              {list.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      const $container = wrapper.find('.t-swiper__container');

      await $container.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] });
      await $container.trigger('touchmove', { touches: [{ clientX: 101, clientY: 0 }] });
      await $container.trigger('touchend', { touches: [{ clientX: 200, clientY: 0 }] });
      await sleep(200);
      expect(onChange).toBeCalledWith(0, { source: 'touch' });
      // direction.value = 'vertical';
      // await sleep(1000)
      // await $container.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
      // await $container.trigger('touchmove', { touches: [{ clientX: 0, clientY: 101 }] })
      // await $container.trigger('touchend', { touches: [{ clientX: 0, clientY: 200 }] })
      // await sleep(500)
      // expect(onChange).toBeCalledWith(2);
    });
  });

  describe('slots', () => {
    it('navigation', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper navigation={null}>
              {{
                default: () =>
                  list.map((item) => (
                    <SwiperItem>
                      <img src={item.image} />
                    </SwiperItem>
                  )),
                navigation: () => <div class="test-navigation">navigation</div>,
              }}
            </Swiper>
          );
        },
      });
      expect(wrapper.find('.test-navigation').text()).toBe('navigation');
    });

    it('navigation [navigation={false}]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper navigation={false}>
              {{
                default: () =>
                  list.map((item) => (
                    <SwiperItem>
                      <img src={item.image} />
                    </SwiperItem>
                  )),
                navigation: () => <div class="test-navigation">navigation</div>,
              }}
            </Swiper>
          );
        },
      });
      expect(wrapper.find('.test-navigation').exists()).toBe(false);
    });
  });

  describe('scenarios', () => {
    it('item removal', async () => {
      const items = ref(list);
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper>
              {items.value.map((item) => (
                <SwiperItem>
                  <img src={item.image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });

      items.value.splice(0, 1);
      expect(items.value.length).toBe(2);
    });

    // animation 组件仅实现 slide 且未消费该属性，无差异可断言
    it.todo('animation[string]');

    it('defaultCurrent[number]', async () => {
      // 独立数据源：scenarios 前序用例会 splice 模块级 list
      const images = ['01.png', '02.png', '03.png'];
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper defaultCurrent={1} autoplay={false}>
              {images.map((image) => (
                <SwiperItem>
                  <img src={image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      // 等待 SwiperItem 注册与导航器渲染
      await nextTick();
      await nextTick();
      const $dots = wrapper.findAll(`.${classPrefix}-nav__dots-item`);
      expect($dots).toHaveLength(images.length);
      // 初始渲染时第 defaultCurrent 项为激活态
      expect($dots[1].classes()).toContain(`${classPrefix}-nav__dots-item--active`);
      expect($dots[0].classes()).not.toContain(`${classPrefix}-nav__dots-item--active`);
      expect($dots[2].classes()).not.toContain(`${classPrefix}-nav__dots-item--active`);
    });

    // nextMargin/previousMargin 标注【开发中】，组件未消费该属性，无差异可断言
    it.todo('nextMargin[number]');
    it.todo('previousMargin[number]');
  });
});
