import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { ActionSheetPlugin } from '../plugin';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

describe('ActionSheetPlugin', () => {
  afterEach(async () => {
    ActionSheetPlugin.close();
    await nextTick();
    document.body.innerHTML = '';
  });

  it('show', async () => {
    ActionSheetPlugin.show({ items: ['插件选项'] });
    await nextTick();
    await nextTick();

    expect(document.body.textContent).toContain('插件选项');
    expect(document.querySelector(`.${name}`)).toBeTruthy();
  });
});
