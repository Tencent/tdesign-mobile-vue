import _Slider from './slider';
import { withInstall, WithInstallType } from '../shared';

import './style';

export const Slider: WithInstallType<typeof _Slider> = withInstall(_Slider);
export default Slider;
