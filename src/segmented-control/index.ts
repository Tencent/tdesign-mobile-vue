import { withInstall, WithInstallType } from '../shared';
import SegmentedControl from './segmented-control.vue';

import './style';

const _SegmentedControl: WithInstallType<typeof SegmentedControl> = withInstall(SegmentedControl);
export default _SegmentedControl;
