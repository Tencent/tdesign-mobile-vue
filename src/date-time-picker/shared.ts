import { isArray } from 'lodash-es';
import type { TimeModeValues } from './type';

export const getMeaningColumn = (mode: TimeModeValues | TimeModeValues[]): TimeModeValues[] => {
  const arr = ['year', 'month', 'date', 'hour', 'minute', 'second'] as const;

  if (isArray(mode)) {
    const ans: TimeModeValues[] = [];
    const [dateMode, timeMode] = mode;
    if (dateMode != null) {
      const cutIndex = arr.indexOf(dateMode);
      if (cutIndex <= 2 && cutIndex > -1) {
        ans.push(...arr.slice(0, cutIndex + 1));
      }
    }
    if (timeMode != null) {
      const cutIndex = arr.indexOf(timeMode);
      if (cutIndex > 2) {
        ans.push(...arr.slice(3, cutIndex + 1));
      }
    }
    return ans;
  }

  const cutIndex = arr.indexOf(mode);

  return arr.slice(0, cutIndex + 1);
};
