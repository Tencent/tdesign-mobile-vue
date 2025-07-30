import _Slider from './slider';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdSliderProps } from './type';

export * from './type';
export type SliderProps = TdSliderProps;

export const Slider: WithInstallType<typeof _Slider> = withInstall(_Slider);
export default Slider;
