import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import { AttachNode } from '../common';

export function getAttach(node: AttachNode) {
  const attachNode = isFunction(node) ? node() : node;

  if (isString(attachNode)) {
    return document.querySelector(attachNode);
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode;
  }
  return document.body;
}

export function stopPropagation(event: Event) {
  event.stopPropagation();
}

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    // The event can be canceled, so we do so.
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
