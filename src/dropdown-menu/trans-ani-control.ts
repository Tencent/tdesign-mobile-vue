import { nextTick } from 'vue';
import { NOOP } from '../shared/functions';
import { DropdownMenuDo } from './context';

export default class TransAniControl {
  timeout: number | null;

  finallyDo: DropdownMenuDo;

  constructor() {
    this.timeout = null;
    this.finallyDo = NOOP;
  }

  setTo(duration: number, nowDo: DropdownMenuDo, nextTickDo: DropdownMenuDo, finallyDo: DropdownMenuDo): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.finallyDo();
    }
    nowDo();
    nextTick(() => window.setTimeout(nextTickDo, 0));
    this.finallyDo = finallyDo;

    this.timeout = window.setTimeout(() => {
      this.finallyDo();
      this.finallyDo = NOOP;
      this.timeout = 0;
    }, duration);
  }
}
