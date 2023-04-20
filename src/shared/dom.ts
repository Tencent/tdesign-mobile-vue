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
