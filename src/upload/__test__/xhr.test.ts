import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import xhr from '../../_common/js/upload/xhr';
import { UploadFile } from '../../_common/js/upload/types';

// jsdom 下的 XMLHttpRequest 无法真实触发 upload.onprogress，使用 Mock 替换，仅保留 xhr.ts 使用到的能力
/* eslint-disable class-methods-use-this */
class MockXHR {
  static instances: MockXHR[] = [];

  upload: { onprogress?: (event: any) => void } = {};

  onerror?: (...args: any[]) => void;

  ontimeout?: (...args: any[]) => void;

  onload?: (...args: any[]) => void;

  status = 200;

  responseText = '{}';

  headers: Record<string, string> = {};

  withCredentials = false;

  constructor() {
    MockXHR.instances.push(this);
  }

  open() {}

  setRequestHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  send() {}

  abort() {}
}

const mockFile = () => new File([new ArrayBuffer(8)], 'big.bin');

const createFile = (): UploadFile => ({
  name: 'big.bin',
  status: 'progress',
  percent: 0,
  raw: mockFile(),
});

const fireProgress = (loaded: number, total: number) => {
  const ins = MockXHR.instances[MockXHR.instances.length - 1];
  ins.upload.onprogress?.({ loaded, total });
};

describe('upload/xhr real progress', () => {
  beforeEach(() => {
    MockXHR.instances = [];
    vi.stubGlobal('XMLHttpRequest', MockXHR as unknown as typeof XMLHttpRequest);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('useMockProgress=false 时，真实上传进度应触发 onProgress(type=real)', () => {
    const onProgress = vi.fn();
    const toUploadFiles = [createFile()];
    xhr({
      action: 'https://example.com/api/upload',
      withCredentials: false,
      headers: {},
      data: {},
      name: 'file',
      files: toUploadFiles,
      useMockProgress: false,
      onError: vi.fn(),
      onSuccess: vi.fn(),
      onProgress,
    });

    fireProgress(43, 100);
    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress.mock.calls[0][0]).toMatchObject({ percent: 43, type: 'real' });

    // 进度未变化时不重复触发
    fireProgress(43, 100);
    expect(onProgress).toHaveBeenCalledTimes(1);

    // 进度递增时持续触发
    fireProgress(66, 100);
    fireProgress(100, 100);
    expect(onProgress).toHaveBeenCalledTimes(3);
    expect(onProgress.mock.calls[1][0]).toMatchObject({ percent: 66, type: 'real' });
    expect(onProgress.mock.calls[2][0]).toMatchObject({ percent: 100, type: 'real' });
    // 同步到文件对象，保证内部进度展示一致
    expect(toUploadFiles[0].percent).toBe(100);
    expect(onProgress.mock.calls[2][0].files[0].percent).toBe(100);
  });

  it('开启模拟进度时，真实进度落后于当前展示进度不触发，反超后以 real 触发', () => {
    vi.useFakeTimers();
    const onProgress = vi.fn();
    const toUploadFiles = [createFile()];
    xhr({
      action: 'https://example.com/api/upload',
      withCredentials: false,
      headers: {},
      data: {},
      name: 'file',
      files: toUploadFiles,
      useMockProgress: true,
      mockProgressDuration: 100,
      onError: vi.fn(),
      onSuccess: vi.fn(),
      onProgress,
    });

    // 模拟进度计时开始，并将展示进度推进到 50
    vi.advanceTimersByTime(100);
    vi.advanceTimersByTime(500);
    const mockCalls = onProgress.mock.calls.filter((call) => call[0].type === 'mock');
    expect(mockCalls.length).toBeGreaterThan(0);
    const mockPercent = mockCalls[mockCalls.length - 1][0].percent as number;
    expect(mockPercent).toBe(50);

    const realCountBefore = onProgress.mock.calls.filter((call) => call[0].type === 'real').length;
    // 真实进度落后于当前展示进度，不触发（展示进度不回退）
    fireProgress(mockPercent - 10, 100);
    expect(onProgress.mock.calls.filter((call) => call[0].type === 'real')).toHaveLength(realCountBefore);

    // 真实进度反超展示进度时，触发 real 回调
    fireProgress(mockPercent + 10, 100);
    const realCall = onProgress.mock.calls.filter((call) => call[0].type === 'real');
    expect(realCall).toHaveLength(realCountBefore + 1);
    expect(realCall[realCall.length - 1][0]).toMatchObject({ percent: mockPercent + 10, type: 'real' });
  });
});
