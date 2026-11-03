import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getElmCssPropValue,
  getRelativePosition,
  getScrollParent,
  getTargetElm,
  isFixed,
  scrollToElm,
  scrollToParentVisibleArea,
} from '../utils/dom';
import type { AttachNode } from '../../common';

let container: HTMLDivElement;
let target: HTMLDivElement;

const createRect = (x: number, y: number, width: number, height: number): DOMRect => ({
  x,
  y,
  width,
  height,
  left: x,
  top: y,
  right: x + width,
  bottom: y + height,
  toJSON: () => ({ x, y, width, height }),
});

beforeEach(() => {
  container = document.createElement('div');
  target = document.createElement('div');
  target.id = 'guide-utils-target';
  container.appendChild(target);
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('Guide utils', () => {
  describe('getElmCssPropValue', () => {
    it('reads computed CSS properties', () => {
      target.style.position = 'fixed';
      expect(getElmCssPropValue(target, 'position')).toBe('fixed');
      expect(getElmCssPropValue(target, '--missing-guide-property')).toBe('');
    });
  });

  describe('isFixed', () => {
    it('detects fixed elements and fixed ancestors', () => {
      expect(isFixed(target)).toBe(false);
      target.style.position = 'fixed';
      expect(isFixed(target)).toBe(true);
      target.style.position = 'static';
      container.style.position = 'fixed';
      expect(isFixed(target)).toBe(true);
      expect(isFixed(document.createElement('div'))).toBe(false);
    });
  });

  describe('getRelativePosition', () => {
    it('uses offsets relative to positioned containers', () => {
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createRect(50, 100, 40, 20));
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(createRect(10, 30, 200, 200));
      container.style.position = 'relative';
      expect(getRelativePosition(target, container)).toEqual({ top: 70, left: 40 });
      container.style.position = 'sticky';
      expect(getRelativePosition(target, container)).toEqual({ top: 70, left: 40 });
    });

    it('adds window scroll except for fixed targets', () => {
      vi.spyOn(window, 'pageYOffset', 'get').mockReturnValue(200);
      vi.spyOn(window, 'pageXOffset', 'get').mockReturnValue(20);
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createRect(50, 100, 40, 20));
      expect(getRelativePosition(target)).toEqual({ top: 300, left: 70 });
      target.style.position = 'fixed';
      expect(getRelativePosition(target)).toEqual({ top: 100, left: 50 });
    });
  });

  describe('getTargetElm', () => {
    it('resolves selector and function targets and falls back to body for empty input', () => {
      expect(getTargetElm('#guide-utils-target')).toBe(target);
      expect(getTargetElm(() => target)).toBe(target);
      expect(getTargetElm('')).toBe(document.body);
      expect(getTargetElm('#missing-guide-target')).toBeUndefined();
    });

    it('rejects invalid target types and missing production targets', () => {
      expect(() => getTargetElm(1 as unknown as AttachNode)).toThrow('elm should be string or function');
      vi.stubEnv('NODE_ENV', 'production');
      expect(() => getTargetElm('#missing-guide-target')).toThrow('There is no element with given.');
    });
  });

  describe('getScrollParent', () => {
    it('finds scrollable ancestors and falls back to body', () => {
      expect(getScrollParent(target)).toBe(document.body);
      container.style.overflowY = 'auto';
      expect(getScrollParent(target)).toBe(container);
      target.style.position = 'fixed';
      expect(getScrollParent(target)).toBe(document.body);
    });

    it('skips static ancestors for absolute elements', () => {
      target.style.position = 'absolute';
      container.style.position = 'static';
      container.style.overflow = 'scroll';
      expect(getScrollParent(target)).toBe(document.body);
      container.style.position = 'relative';
      expect(getScrollParent(target)).toBe(container);
    });
  });

  describe('scrollToParentVisibleArea', () => {
    it('scrolls an out-of-view target inside its scrollable parent', () => {
      container.style.overflow = 'auto';
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(createRect(0, 0, 100, 100));
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createRect(0, 150, 20, 20));
      vi.spyOn(target, 'offsetTop', 'get').mockReturnValue(150);
      vi.spyOn(container, 'offsetTop', 'get').mockReturnValue(10);
      scrollToParentVisibleArea(target);
      expect(container.scrollTop).toBe(140);
    });

    it('does not scroll a visible target or body', () => {
      container.style.overflow = 'auto';
      container.scrollTop = 10;
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(createRect(0, 0, 100, 100));
      vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createRect(10, 10, 20, 20));
      scrollToParentVisibleArea(target);
      expect(container.scrollTop).toBe(10);
      container.style.overflow = 'visible';
      scrollToParentVisibleArea(target);
      expect(container.scrollTop).toBe(10);
    });
  });

  describe('scrollToElm', () => {
    it('centers out-of-view targets but leaves visible targets alone', () => {
      vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(600);
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(400);
      const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const rect = vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createRect(0, 800, 20, 40));
      scrollToElm(target);
      expect(scrollTo).toHaveBeenCalledWith({ top: 520, behavior: 'smooth' });
      scrollTo.mockClear();
      rect.mockReturnValue(createRect(10, 10, 20, 40));
      scrollToElm(target);
      expect(scrollTo).not.toHaveBeenCalled();
    });
  });
});
