import { ref, nextTick, h, markRaw } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ThumbUpIcon, ThumbDownIcon, StarFilledIcon } from 'tdesign-icons-vue-next';
import Rate from '../rate';
import { trigger } from '../../image-viewer/__tests__/touch';

const prefix = 't';
const name = `${prefix}-rate`;

const originalGetBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;

/**
 * mock 容器宽度，使点击/滑动坐标可换算为确定分值：
 * width=343、left=0、默认 gap=8、count=5 → starWidth = (343 - 4*8)/5 = 62.2，num = (pageX + 8)/70.2
 * pageX=10 → 0.26 → allowHalf 时 0.5，否则 1；pageX=120 → 1.82 → 2；pageX=150 → 2.25 → 3；pageX=300 → 4.39 → 5
 */
const mockRect = (left = 0, width = 343) => {
  window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right: left + width, width }) as DOMRect;
};

afterEach(() => {
  window.HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  vi.useRealTimers();
});

describe('Rate', () => {
  describe('props', () => {
    it('allowHalf[boolean]', async () => {
      mockRect();
      const value = ref(0);
      const onChange = vi.fn();
      const wrapper = mount(() => <Rate v-model={value.value} allowHalf onChange={onChange} />);
      // 开启半选：每颗星渲染半选图层
      expect(wrapper.findAll(`.${name}__icon-left`)).toHaveLength(5);

      // 点击落在第 1 颗星左半区 → 得到 0.5 分，tips 提供 半星/全星 两档
      await wrapper.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(onChange).toHaveBeenNthCalledWith(1, 0.5);
      const tipsItems = wrapper.findAll(`.${name}__tips-item`);
      expect(tipsItems).toHaveLength(2);
      expect(tipsItems[0].text()).toBe('0.5');
      expect(tipsItems[1].text()).toBe('1');

      // 在 tips 中选择半星
      await tipsItems[0].trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(2, 0.5);
      expect(value.value).toBe(0.5);
      // ceil(0.5)=1 → 第 1 颗星半选图层高亮，无整星高亮
      expect(wrapper.findAll(`.${name}__icon-left--selected`)).toHaveLength(1);
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(0);
      // 选择后 tips 关闭
      expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();

      // 关闭半选：无半选图层，同一位置点击得到整星
      const wrapper2 = mount(() => <Rate onChange={onChange} />);
      expect(wrapper2.findAll(`.${name}__icon-left`)).toHaveLength(0);
      await wrapper2.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(onChange).toHaveBeenNthCalledWith(3, 1);
    });

    it('color[string]', () => {
      const wrapper = mount(() => <Rate color="#FF0000" />);
      wrapper.findAll(`.${name}__icon`).forEach((item) => {
        expect(item.attributes('style')).toContain('--td-rate-selected-color: #FF0000');
      });

      // 默认值 #ED7B2F
      const wrapper2 = mount(() => <Rate />);
      expect(wrapper2.find(`.${name}__icon`).attributes('style')).toContain('--td-rate-selected-color: #ED7B2F');
    });

    it('color[array]', () => {
      const wrapper = mount(() => <Rate color={['#FF0000', '#00FF00']} />);
      const style = wrapper.find(`.${name}__icon`).attributes('style');
      expect(style).toContain('--td-rate-selected-color: #FF0000');
      expect(style).toContain('--td-rate-unselected-color: #00FF00');
    });

    it('count[number]', () => {
      expect(mount(() => <Rate />).findAll(`.${name}__icon`)).toHaveLength(5);
      expect(mount(() => <Rate count={10} />).findAll(`.${name}__icon`)).toHaveLength(10);
    });

    it('disabled[boolean]', async () => {
      mockRect();
      const onChange = vi.fn();
      const wrapper = mount(<Rate disabled onChange={onChange} />);
      expect(wrapper.classes()).toContain(`${name}--disabled`);

      // 禁用态：点击与触摸均不生效
      await wrapper.findAll(`.${name}__icon`)[3].trigger('click', { pageX: 300 });
      const $target = wrapper.find(`.${name}__wrapper`);
      await trigger($target, 'touchstart', 10, 10);
      await trigger($target, 'touchmove', 300, 10);
      await trigger($target, 'touchend', 300, 10);
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();

      // 解除禁用后可正常选择
      await wrapper.setProps({ disabled: false });
      expect(wrapper.classes()).not.toContain(`${name}--disabled`);
      await wrapper.findAll(`.${name}__icon`)[3].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledWith(5);
    });

    it('gap[number]', () => {
      const wrapper = mount(() => <Rate gap={10} />);
      const items = wrapper.findAll(`.${name}__icon`);
      for (let i = 0; i < items.length - 1; i++) {
        expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
      }
      // 最后一颗星不带间距
      expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
    });

    it('gap[string]', () => {
      const wrapper = mount(() => <Rate gap="12" />);
      const items = wrapper.findAll(`.${name}__icon`);
      expect(getComputedStyle(items[0].element, null).marginRight).toBe('12px');
      expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
    });

    it('icon[array]', () => {
      const wrapper = mount(Rate, {
        props: {
          value: 3,
          icon: [markRaw(ThumbUpIcon), markRaw(ThumbDownIcon)],
        },
      });
      expect(wrapper.findComponent(ThumbUpIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ThumbDownIcon).exists()).toBeTruthy();
    });

    it('icon[function]', () => {
      const wrapper = mount(Rate, {
        props: {
          value: 3,
          icon: [() => h(ThumbUpIcon), () => h(ThumbDownIcon)],
        },
      });
      expect(wrapper.findComponent(ThumbUpIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ThumbDownIcon).exists()).toBeTruthy();
    });

    it('placement[top]', async () => {
      mockRect();
      // 未设置时默认 top
      const wrapper = mount(() => <Rate />);
      await wrapper.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(wrapper.find(`.${name}__tips`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__tips--top`).exists()).toBeTruthy();

      const wrapper2 = mount(() => <Rate placement="top" />);
      await wrapper2.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(wrapper2.find(`.${name}__tips--top`).exists()).toBeTruthy();
    });

    it('placement[bottom]', async () => {
      mockRect();
      const wrapper = mount(() => <Rate placement="bottom" />);
      await wrapper.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(wrapper.find(`.${name}__tips`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__tips--bottom`).exists()).toBeTruthy();
    });

    it('placement[empty]', async () => {
      mockRect();
      const wrapper = mount(() => <Rate placement="" />);
      await wrapper.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
      expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();
    });

    it('showText[boolean]', () => {
      // 关闭时不渲染辅助文字
      const wrapper = mount(() => <Rate defaultValue={3} />);
      expect(wrapper.find(`.${name}__text`).exists()).toBeFalsy();

      // 开启且大于 0 分：展示全局配置文案 “{value} 分”，且带 active 态
      const wrapper2 = mount(() => <Rate defaultValue={3} showText />);
      const $text = wrapper2.find(`.${name}__text`);
      expect($text.exists()).toBeTruthy();
      expect($text.text()).toBe('3 分');
      expect($text.classes()).toContain(`${name}__text--active`);

      // 开启且为 0 分：展示 “未评分”，不带 active 态
      const wrapper3 = mount(() => <Rate showText />);
      const $text3 = wrapper3.find(`.${name}__text`);
      expect($text3.text()).toBe('未评分');
      expect($text3.classes()).not.toContain(`${name}__text--active`);
    });

    it('size[string]', () => {
      // 带单位
      const wrapper = mount(() => <Rate size="20px" />);
      wrapper.findAll(`.${name}__icon`).forEach((item) => {
        expect(getComputedStyle(item.element, null).fontSize).toBe('20px');
      });

      // 不带单位时自动补 px
      const wrapper2 = mount(() => <Rate size="30" />);
      expect(getComputedStyle(wrapper2.find(`.${name}__icon`).element, null).fontSize).toBe('30px');

      // 默认 24px
      const wrapper3 = mount(() => <Rate />);
      expect(getComputedStyle(wrapper3.find(`.${name}__icon`).element, null).fontSize).toBe('24px');
    });

    it('texts[array]', () => {
      const texts = ['很差', '差', '一般', '好评', '优秀'];
      const wrapper = mount(() => <Rate defaultValue={3} showText texts={texts} />);
      expect(wrapper.find(`.${name}__text`).text()).toBe(texts[2]);
    });

    it('value[number]', async () => {
      mockRect();
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          value: 3,
          onChange,
        },
      });
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(3);

      // 受控模式：外部未更新 value 时，点击仅抛出 onChange，选中态保持不变
      await wrapper.findAll(`.${name}__icon`)[4].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledWith(5);
      expect(wrapper.emitted('update:value')[0]).toEqual([5]);
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(3);

      // 外部更新 value 后选中态同步
      await wrapper.setProps({ value: 4 });
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(4);
    });

    it('modelValue[number]', async () => {
      mockRect();
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          modelValue: 2,
          onChange,
        },
      });
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(2);

      // v-model 通道：选择后抛出 onChange 与 update:modelValue
      await wrapper.findAll(`.${name}__icon`)[4].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledWith(5);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([5]);
      // 外部未同步前选中态保持不变
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(2);

      // 外部同步 modelValue 后选中态更新
      await wrapper.setProps({ modelValue: 5 });
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(5);
    });

    it('defaultValue[number]', async () => {
      mockRect();
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          defaultValue: 2,
          onChange,
        },
      });
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(2);

      // 非受控模式：点击后内部值自行更新
      await wrapper.findAll(`.${name}__icon`)[4].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledWith(5);
      expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(5);
      // 非受控模式不对外 emit update 事件
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('change', async () => {
      mockRect();
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          value: 1,
          onChange,
        },
      });
      const icons = wrapper.findAll(`.${name}__icon`);

      // 点击位置换算出的分值与当前受控值一致时不触发
      await icons[0].trigger('click', { pageX: 10 });
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.emitted('update:value')).toBeUndefined();

      // 点击其它分值时触发，参数为换算后的分值
      await icons[4].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(5);
      expect(wrapper.emitted('update:value')).toHaveLength(1);

      // 外部接收新值后，再次点击同一分值不重复触发
      await wrapper.setProps({ value: 5 });
      await icons[4].trigger('click', { pageX: 300 });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('slots', () => {
    // 文档将 icon 标注为 Array/Slot/Function，但组件源码未消费 slots 通道（rate.tsx 中无 context.slots 相关逻辑），插槽自定义图标暂无法实现
    it.todo('icon');
  });

  describe('scenarios', () => {
    it('renders with default props', () => {
      const wrapper = mount(() => <Rate />);
      expect(wrapper.classes()).toContain(name);
      expect(wrapper.findAll(`.${name}__icon`)).toHaveLength(5);
      // 默认渲染实心五角星图标
      expect(wrapper.findComponent(StarFilledIcon).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__text`).exists()).toBeFalsy();
      expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();
    });

    describe('touch interactions', () => {
      it('slide updates value only after press threshold', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const value = ref(0);
        const onChange = vi.fn();
        const wrapper = mount(() => <Rate v-model={value.value} onChange={onChange} />);
        const $target = wrapper.find(`.${name}__wrapper`);

        await trigger($target, 'touchstart', 10, 10);
        // 按住未超过 200ms，滑动不生效
        vi.advanceTimersByTime(100);
        await trigger($target, 'touchmove', 120, 10);
        expect(onChange).not.toHaveBeenCalled();

        // 超过 200ms 后滑动生效：pageX=120 → 2 分
        vi.advanceTimersByTime(150);
        await trigger($target, 'touchmove', 120, 10);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(2);
        expect(value.value).toBe(2);
        // move 分支的 tips 为单选项，展示滑动换算的分值
        const tips = wrapper.find(`.${name}__tips`);
        expect(tips.exists()).toBeTruthy();
        expect(tips.find(`.${name}__tips-item`).text()).toBe('2');
      });

      it('touchend hides tips immediately', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const wrapper = mount(() => <Rate />);
        const $target = wrapper.find(`.${name}__wrapper`);

        await trigger($target, 'touchstart', 10, 10);
        vi.advanceTimersByTime(250);
        await trigger($target, 'touchmove', 120, 10);
        expect(wrapper.find(`.${name}__tips`).exists()).toBeTruthy();

        await trigger($target, 'touchend', 120, 10);
        expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();
      });

      it('touchcancel behaves as touchend', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const wrapper = mount(() => <Rate />);
        const $target = wrapper.find(`.${name}__wrapper`);

        await trigger($target, 'touchstart', 10, 10);
        vi.advanceTimersByTime(250);
        await trigger($target, 'touchmove', 120, 10);
        expect(wrapper.find(`.${name}__tips`).exists()).toBeTruthy();

        await trigger($target, 'touchcancel', 120, 10);
        expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();
      });

      it('tips auto hides 3s after tap selection following touch', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const wrapper = mount(() => <Rate />);
        const $target = wrapper.find(`.${name}__wrapper`);

        // 先经历一次触摸结束（touchEnd=true），随后的 tap 选择会开启 3s 自动关闭
        await trigger($target, 'touchstart', 10, 10);
        await trigger($target, 'touchend', 120, 10);
        await wrapper.findAll(`.${name}__icon`)[0].trigger('click', { pageX: 10 });
        expect(wrapper.find(`.${name}__tips`).exists()).toBeTruthy();
        expect(wrapper.find(`.${name}__icon--current`).exists()).toBeTruthy();

        vi.advanceTimersByTime(3000);
        await nextTick();
        expect(wrapper.find(`.${name}__tips`).exists()).toBeFalsy();
        expect(wrapper.find(`.${name}__icon--current`).exists()).toBeFalsy();
      });
    });

    describe('value clamping', () => {
      it('clamps to count when sliding beyond right edge', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const value = ref(0);
        const onChange = vi.fn();
        const wrapper = mount(() => <Rate v-model={value.value} onChange={onChange} />);
        const $target = wrapper.find(`.${name}__wrapper`);

        await trigger($target, 'touchstart', 10, 10);
        vi.advanceTimersByTime(250);
        await trigger($target, 'touchmove', 400, 10);
        expect(onChange).toHaveBeenCalledWith(5);
        expect(value.value).toBe(5);
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(5);
      });

      it('clamps to 0 when sliding beyond left edge', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        mockRect();
        const value = ref(2);
        const onChange = vi.fn();
        const wrapper = mount(() => <Rate v-model={value.value} onChange={onChange} />);
        const $target = wrapper.find(`.${name}__wrapper`);

        await trigger($target, 'touchstart', 10, 10);
        vi.advanceTimersByTime(250);
        await trigger($target, 'touchmove', -200, 10);
        expect(onChange).toHaveBeenCalledWith(0);
        expect(value.value).toBe(0);
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(0);
      });
    });

    describe('form context', () => {
      it('inherits disabled from form', async () => {
        mockRect();
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: { onChange },
          global: {
            provide: {
              formDisabled: { disabled: ref(true) },
            },
          },
        });
        expect(wrapper.classes()).toContain(`${name}--disabled`);
        await wrapper.findAll(`.${name}__icon`)[2].trigger('click', { pageX: 150 });
        expect(onChange).not.toHaveBeenCalled();

        // 组件自身 disabled=false 优先于表单禁用
        await wrapper.setProps({ disabled: false });
        expect(wrapper.classes()).not.toContain(`${name}--disabled`);
        await wrapper.findAll(`.${name}__icon`)[2].trigger('click', { pageX: 150 });
        expect(onChange).toHaveBeenCalledWith(3);
      });

      it('inherits readonly from form', async () => {
        mockRect();
        const onChange = vi.fn();
        const wrapper = mount(Rate, {
          props: { onChange },
          global: {
            provide: {
              formReadonly: { readonly: ref(true) },
            },
          },
        });
        // readonly 不带禁用样式，但不可交互
        expect(wrapper.classes()).not.toContain(`${name}--disabled`);
        await wrapper.findAll(`.${name}__icon`)[2].trigger('click', { pageX: 150 });
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
