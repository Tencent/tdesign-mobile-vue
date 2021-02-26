import config from '../config';

const { prefix } = config;

export const SIZE_CLASSNAMES = {
  small: `${prefix}-size-s`,
  medium: `${prefix}-size-m`,
  large: `${prefix}-size-l`,
  default: '',
  xs: `${prefix}-size-xs`,
  xl: `${prefix}-size-xl`,
  block: `${prefix}-size-full-width`,
};

const ClASSNAMES = {
  SIZE: SIZE_CLASSNAMES,
};

export default ClASSNAMES;
