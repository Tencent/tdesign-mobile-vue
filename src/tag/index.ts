import { withInstall } from '../shared/';
import LocalTag from './tag.vue';
import LocalCheckTag from './check-tag.vue';

export const Tag = withInstall(LocalTag);
export const CheckTag = withInstall(LocalCheckTag);
