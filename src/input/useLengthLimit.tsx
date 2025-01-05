import { computed, ComputedRef, onMounted, watch } from 'vue';
import _useLengthLimit from '../hooks/useLengthLimit';
import { TdInputProps } from './type';

export interface UseLengthLimitParams {
  value: string;
  maxlength: number;
  maxcharacter: number;
  allowInputOverMax: boolean;
  status: TdInputProps['status'];
  onValidate: TdInputProps['onValidate'];
}

export default function useLengthLimit(params: ComputedRef<UseLengthLimitParams>) {
  const { getValueByLimitNumber, limitNumber } = _useLengthLimit(params);

  const innerStatus = computed(() => {
    if (limitNumber.value) {
      const [current, total] = limitNumber.value.split('/');
      return Number(current) > Number(total) ? 'error' : '';
    }
    return '';
  });

  const onValidateChange = () => {
    params.value.onValidate?.({
      error: innerStatus.value ? 'exceed-maximum' : undefined,
    });
  };

  watch(innerStatus, onValidateChange);

  onMounted(() => {
    innerStatus.value && onValidateChange();
  });

  return {
    limitNumber,
    getValueByLimitNumber,
  };
}
