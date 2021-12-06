import Slider from './slider.vue';
import { withInstall, WithInstallType } from '../shared';

import './style';

const _Slider: WithInstallType<typeof Slider> = withInstall(Slider);
export default _Slider;
