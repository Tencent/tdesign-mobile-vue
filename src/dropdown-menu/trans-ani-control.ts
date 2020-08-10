import { nextTick } from 'vue';

export default class TransAniControl {
  timeout: number | null;
  finallyDo: Function | null;
  constructor() {
    this.timeout = null;
    this.finallyDo = null;
  }
  setTo(duration: number, nowDo: Function, nextTickDo: Function, finallyDo: Function) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.finallyDo && this.finallyDo();
    }
    nowDo();
    nextTick(() => window.setTimeout(nextTickDo, 0));
    this.finallyDo = finallyDo;

    this.timeout = window.setTimeout(() => {
      this.finallyDo && this.finallyDo();
      this.finallyDo = null;
      this.timeout = 0;
    }, duration);
  }
}
