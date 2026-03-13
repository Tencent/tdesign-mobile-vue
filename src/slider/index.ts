import _Slider from './slider';
import { withInstall } from '../shared';

import './style';
import { TdSliderProps } from './type';

export * from './type';
export type SliderProps = TdSliderProps;

export const Slider = withInstall(_Slider);
export default Slider;
