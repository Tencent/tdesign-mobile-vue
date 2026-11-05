import { enableAutoUnmount } from '@vue/test-utils';
import { afterEach, beforeEach } from 'vitest';

const resourceSelector = 'script.t-svg-js-stylesheet--unique-class, link.t-iconfont-stylesheet--unique-class';

export const setupIconCleanup = () => {
  let existingResources: Set<Element>;
  enableAutoUnmount(afterEach);
  beforeEach(() => {
    existingResources = new Set(document.querySelectorAll(resourceSelector));
  });
  afterEach(() => {
    document.querySelectorAll(resourceSelector).forEach((node) => {
      if (!existingResources.has(node)) node.remove();
    });
  });
};

export const getScriptSources = () =>
  Array.from(document.querySelectorAll('script.t-svg-js-stylesheet--unique-class')).map((node) =>
    node.getAttribute('src'),
  );

export const getStylesheetSources = () =>
  Array.from(document.querySelectorAll('link.t-iconfont-stylesheet--unique-class')).map((node) =>
    node.getAttribute('href'),
  );
