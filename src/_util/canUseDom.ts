import isUndefined from 'lodash/isUndefined';

export const canUseDom = !!(
  !isUndefined(window) &&
  !isUndefined(document) &&
  window.document &&
  window.document.createElement
);
