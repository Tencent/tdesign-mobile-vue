import { computed, ComputedRef } from 'vue';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import log from '../_common/js/log';
import { getCharacterLength, getUnicodeLength, limitUnicodeMaxLength } from '../_common/js/utils/helper';

export interface UseLengthLimitParams {
  value: string;
  maxlength: number;
  maxcharacter: number;
  allowInputOverMax: boolean;
}

export default function useLengthLimit(params: ComputedRef<UseLengthLimitParams>) {
  // 文本超出数量限制时，是否允许继续输入
  const getValueByLimitNumber = (inputValue: string) => {
    const { allowInputOverMax, maxlength, maxcharacter } = params.value;
    if (!(maxlength || maxcharacter) || allowInputOverMax || !inputValue) return inputValue;
    if (maxlength) {
      // input value could be unicode 😊
      return limitUnicodeMaxLength(inputValue, maxlength);
    }
    if (maxcharacter) {
      const r = getCharacterLength(inputValue, maxcharacter);
      if (isObject(r)) {
        return r.characters;
      }
    }
  };

  const limitNumber = computed(() => {
    const { maxlength, maxcharacter, value } = params.value;
    if (isNumber(value)) return String(value);
    if (maxlength && maxcharacter) {
      log.warn('Input', 'Pick one of maxlength and maxcharacter please.');
    }
    if (maxlength) {
      const length = value?.length ? getUnicodeLength(value) : 0;
      return `${length}/${maxlength}`;
    }
    if (maxcharacter) {
      return `${getCharacterLength(value || '')}/${maxcharacter}`;
    }
    return '';
  });

  return {
    limitNumber,
    getValueByLimitNumber,
  };
}