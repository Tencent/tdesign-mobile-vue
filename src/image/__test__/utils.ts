interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

export class MockIntersectionObserver {
  _callback: Function;

  _element!: HTMLElement;

  constructor(callback: Function) {
    this._callback = callback;
  }

  observe(element: HTMLElement) {
    this._element = element;
    this._element.addEventListener('resize', this.trigger);
  }

  unobserve() {
    this._element.removeEventListener('resize', this.trigger);
  }

  disconnect() {
    this._element.removeEventListener('resize', this.trigger);
  }

  trigger = (event: UIEvent) => {
    this._callback([
      {
        isIntersecting: true,
      },
    ]);
  };
}
