import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Popup from '../index';

describe('Popup maxWidth', () => {
  let wrapper;

  const render = (props = {}, attrs = {}) => {
    wrapper = mount(Popup, {
      props: { visible: true, ...props },
      attrs,
      global: { stubs: { teleport: false, transition: true } },
    });
    return wrapper.get('.t-popup');
  };

  afterEach(() => wrapper?.unmount());

  it('preserves the existing layout when omitted', () => {
    const popup = render({ placement: 'bottom' }, { style: { width: '320px' } });
    expect(popup.classes()).not.toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('');
    expect(popup.element.style.width).toBe('320px');
  });

  it.each(['top', 'bottom'])('supports updating and removing maxWidth for %s', async (placement) => {
    const popup = render({ placement, maxWidth: 600 });
    expect(popup.classes()).toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('600px');
    expect(popup.attributes('maxwidth')).toBeUndefined();

    await wrapper.setProps({ maxWidth: '70vw' });
    expect(popup.element.style.maxWidth).toBe('70vw');

    await wrapper.setProps({ maxWidth: 'none' });
    expect(popup.element.style.maxWidth).toBe('none');

    await wrapper.setProps({ maxWidth: undefined });
    expect(popup.classes()).not.toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('');
  });

  it('accepts zero as a numeric width', () => {
    const popup = render({ placement: 'bottom', maxWidth: 0 });
    expect(popup.classes()).toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('0px');
  });

  it.each(['left', 'right', 'center'])('does not change %s popups', (placement) => {
    const popup = render({ placement, maxWidth: 100 });
    expect(popup.classes()).not.toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('');
  });

  it('removes the limit when placement changes and restores it when changed back', async () => {
    const popup = render({ placement: 'bottom', maxWidth: 600 });
    await wrapper.setProps({ placement: 'left' });
    expect(popup.classes()).not.toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('');
    await wrapper.setProps({ placement: 'top' });
    expect(popup.classes()).toContain('t-popup--with-max-width');
    expect(popup.element.style.maxWidth).toBe('600px');
  });
});
