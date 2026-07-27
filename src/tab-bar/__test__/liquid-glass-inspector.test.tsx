import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LiquidGlassInspector from '../demos/liquid-glass-inspector.vue';

const mountInspector = () =>
  mount(LiquidGlassInspector, {
    global: {
      stubs: {
        't-icon': true,
        't-tab-bar': { template: '<div><slot /></div>' },
        't-tab-bar-item': { template: '<div><slot /><slot name="icon" /></div>' },
      },
    },
  });

describe('TabBar Liquid Glass layer inspector demo', () => {
  it('switches between every isolated inspection layer', async () => {
    const wrapper = mountInspector();

    expect(wrapper.find('.glass-inspector__specular-overlay').exists()).toBe(false);

    await wrapper.get('[data-testid="inspection-refraction"]').trigger('click');
    expect(wrapper.find('[data-testid="inspection-refraction-layer"]').exists()).toBe(true);

    await wrapper.get('[data-testid="inspection-fallback"]').trigger('click');
    expect(wrapper.find('[data-testid="inspection-fallback-bar"]').exists()).toBe(true);
    expect(wrapper.find('.glass-inspector__material').exists()).toBe(false);

    await wrapper.get('[data-testid="inspection-specular-map"]').trigger('click');
    expect(wrapper.find('[data-testid="inspection-specular-map"]').exists()).toBe(true);

    await wrapper.get('[data-testid="inspection-sheen"]').trigger('click');
    expect(wrapper.find('.glass-inspector__sheen').exists()).toBe(true);
    expect(wrapper.find('[data-testid="inspection-border"]').exists()).toBe(false);
  });

  it('keeps optical calibration controls private to the demo', () => {
    const wrapper = mountInspector();

    expect(wrapper.get('[data-testid="inspector-parameter-light-angle"]').attributes('max')).toBe('360');
    expect(wrapper.get('[data-testid="inspector-parameter-specular-opacity"]').attributes('max')).toBe('1');
    expect(wrapper.get('[data-testid="inspector-parameter-bezel"]').attributes('max')).toBe('1');
    expect(wrapper.get('[data-testid="inspector-parameter-background-scale"]').attributes('max')).toBe('2.5');
    expect(wrapper.get('[data-testid="inspector-parameter-fallback-blur"]').attributes()).toMatchObject({
      min: '0',
      max: '12',
      step: '0.1',
    });
    expect(wrapper.get('[data-testid="inspector-meta-light-angle"]').text()).toBe('default 270 · 0–360');
  });

  it('updates the real fallback variable and derived blur metrics', async () => {
    const wrapper = mountInspector();

    await wrapper.get('[data-testid="inspection-fallback"]').trigger('click');
    await wrapper.get('[data-testid="inspector-parameter-fallback-blur"]').setValue(11.7);

    expect(wrapper.get('.glass-inspector').attributes('style')).toContain('--td-tab-bar-glass-fallback-blur: 11.7px');
    expect(wrapper.get('[data-testid="fallback-center-blur"]').text()).toBe('2.3 px');
    expect(wrapper.get('[data-testid="fallback-mid-blur"]').text()).toBe('5.8 px');
    expect(wrapper.get('[data-testid="fallback-edge-blur"]').text()).toBe('10.5 px');
  });

  it('shares drag and zoom controls across every background scene', async () => {
    const wrapper = mountInspector();
    const stage = wrapper.get('[data-testid="inspector-stage-isolated"]');

    await stage.trigger('wheel', { deltaY: -100 });
    expect(
      (wrapper.get('[data-testid="inspector-parameter-background-scale"]').element as HTMLInputElement).value,
    ).toBe('1.15');

    const backgroundButton = (name: string) => wrapper.get(`[data-testid="background-${name}"]`);

    await backgroundButton('grid').trigger('click');
    expect(wrapper.find('.glass-inspector__backdrop--grid').exists()).toBe(true);
    await backgroundButton('text').trigger('click');
    expect(wrapper.find('.glass-inspector__backdrop--text').exists()).toBe(true);
    await backgroundButton('image').trigger('click');
    expect(wrapper.find('.glass-inspector__backdrop--image').exists()).toBe(true);
  });

  it('resets every adjustable parameter to its displayed default', async () => {
    const wrapper = mountInspector();
    const scale = wrapper.get('[data-testid="inspector-parameter-background-scale"]');
    const angle = wrapper.get('[data-testid="inspector-parameter-light-angle"]');
    const width = wrapper.get('[data-testid="inspector-parameter-preview-width"]');
    const fallbackBlur = wrapper.get('[data-testid="inspector-parameter-fallback-blur"]');

    await scale.setValue(2);
    await angle.setValue(45);
    await width.setValue(620);
    await fallbackBlur.setValue(4);
    await wrapper.get('[data-testid="inspector-reset-parameters"]').trigger('click');

    expect((scale.element as HTMLInputElement).value).toBe('1');
    expect((angle.element as HTMLInputElement).value).toBe('270');
    expect((width.element as HTMLInputElement).value).toBe('390');
    expect((fallbackBlur.element as HTMLInputElement).value).toBe('8');
  });
});
