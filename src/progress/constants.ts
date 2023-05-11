export const PRO_THEME = {
  LINE: 'line',
  PLUMP: 'plump',
  CIRCLE: 'circle',
};
export const CIRCLE_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};
export const CIRCLE_SIZE_PX = 112;

export const STATUS_TEXT = ['success', 'error', 'warning', 'active', 'normal'];
export const STATUS_ICON = ['success', 'error', 'warning'];

export default {
  PRO_THEME,
  CIRCLE_SIZE,
  CIRCLE_SIZE_PX,
  STATUS_TEXT,
  STATUS_ICON,
};

// 进度大于 10 ，进度百分比显示在内部；进度百分比小于 10 进度显示在外部
export const PLUMP_SEPARATE = 10;
