import { describe, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import Swiper from '../swiper.vue';
import SwiperItem from '../swiper-item.vue';

const sleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );

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

describe('swiper', () => {
  describe(': props', () => {
    it('duration && paginationPosition', async () => {
      const current = ref(1);
      const duration = 100;
      const interval = 100;
      const navigation = {
        type: 'dots',
        showSlideBtn: false,
      };
      const paginationPosition = 'top';
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper
              v-model={current.value}
              interval={interval}
              duration={duration}
              navigation={navigation}
              paginationPosition={paginationPosition}
              onChange={onChange}
            >
              {{
                default: list.map((item, index) => {
                  return (
                    <SwiperItem>
                      {{
                        default: () => {
                          return <img src={item.image} />;
                        },
                      }}
                    </SwiperItem>
                  );
                }),
              }}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      const $swiper = wrapper.find(`.${classPrefix}`);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);

      // 模拟触发 transitionend
      $swiperContainer.trigger(`transitionend`);

      // duration = 100
      expect($swiperContainer.attributes('style').includes(`transform ${duration}ms;`));

      // swiper 会复制首项和末项， 所有 swiper-item 个数是 list.length + 2
      const $swiperItems = wrapper.findAll(`.${classPrefix}-item`);
      expect($swiperItems).toHaveLength(list.length + 2);

      // 导航器
      const $pagination = wrapper.find(`.${classPrefix}__pagination`);
      expect(
        $pagination
          .attributes('class')
          .includes(`t-swiper__pagination-${navigation.type} t-swiper__pagination-${paginationPosition}`),
      );

      // 导航器 dot
      const $dots = wrapper.findAll(`.${classPrefix}-dot`);
      expect($dots).toHaveLength(list.length);
      // 初始化时，current 项为激活态
      expect($dots[current.value].attributes('class').includes(`t-swiper-dot--active`)).toBeTruthy();
    });

    it('height && direction', async () => {
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
              {{
                default: list.map((item, index) => {
                  return (
                    <SwiperItem>
                      {{
                        default: () => {
                          return <img src={item.image} />;
                        },
                      }}
                    </SwiperItem>
                  );
                }),
              }}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      expect(wrapper.element).toMatchSnapshot();
      const $swiper = wrapper.find(`.${classPrefix}`);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
      $swiperContainer.trigger(`transitionend`);
      expect(
        $swiperContainer
          .attributes('style')
          .includes(`flex-direction: column; transform: translateY(-${height * (1 + current.value)}px);`),
      );

      // height = 200
      expect($swiper.attributes('style').includes(`height: ${height}px;`));
      expect($swiperContainer.attributes('style').includes(`height: ${height}px;`));

      // 导航器 dots-bar
      const $pagination = wrapper.find(`.${classPrefix}__pagination`);
      expect($pagination.attributes('class').includes(`t-swiper__pagination-${navigation.type}`));
      const $dots = wrapper.findAll(`.${classPrefix}-dot`);
      expect($dots).toHaveLength(list.length);
    });

    it(': onChange', async () => {
      const current = ref(1);
      const duration = 100;
      const interval = 100;
      const navigation = {
        showSlideBtn: true,
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
              {{
                default: list.map((item, index) => {
                  return (
                    <SwiperItem>
                      {{
                        default: () => {
                          return <img src={item.image} />;
                        },
                      }}
                    </SwiperItem>
                  );
                }),
              }}
            </Swiper>
          );
        },
      });
      await sleep(interval + duration);
      const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
      $swiperContainer.trigger(`transitionend`);
      // showSlideBtn = true, 显示两侧的滑动控制按钮
      const $btn = wrapper.findAll(`.${classPrefix}__btn`);
      expect($btn).toHaveLength(2);
      const $btnNext = wrapper.find(`.btn-next`);
      // 模拟触发 click , 下一页
      $btnNext.trigger('click');
      await sleep(200);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });
});

// TODO: 目前 change 事件均是通过 showSlideBtn = true 时，两侧滑动按钮控制前后翻页触发, 后期需要补齐 touch。
describe('SwiperNavigation', () => {
  it(': minShowNum', async () => {
    const current = ref(1);
    const duration = 100;
    const interval = 100;
    const navigation = {
      type: 'dots',
      showSlideBtn: false,
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
            {{
              default: list.map((item, index) => {
                return (
                  <SwiperItem>
                    {{
                      default: () => {
                        return <img src={item.image} />;
                      },
                    }}
                  </SwiperItem>
                );
              }),
            }}
          </Swiper>
        );
      },
    });
    await sleep(interval + duration);
    // minShowNum = 4, 大于 list.length, 不会出现导航器
    const $pagination = wrapper.find(`.${classPrefix}__pagination`);
    expect($pagination.exists()).toBeFalsy();
  });

  it(': showSlideBtn', async () => {
    const current = ref(1); // 受控
    const duration = 100;
    const interval = 100;
    const navigation = {
      showSlideBtn: true,
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
            {{
              default: list.map((item, index) => {
                return (
                  <SwiperItem>
                    {{
                      default: () => {
                        return <img src={item.image} />;
                      },
                    }}
                  </SwiperItem>
                );
              }),
            }}
          </Swiper>
        );
      },
    });
    await sleep(interval + duration);
    const $swiperContainer = wrapper.find(`.${classPrefix}__container`);
    $swiperContainer.trigger(`transitionend`);
    // showSlideBtn = true, 显示两侧的滑动控制按钮
    const $btn = wrapper.findAll(`.${classPrefix}__btn`);
    expect($btn).toHaveLength(2);
    const $btnPrev = wrapper.find(`.btn-prev`);
    const $btnNext = wrapper.find(`.btn-next`);

    // 模拟触发 click 事件
    $btnPrev.trigger('click');
    await sleep(200);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
