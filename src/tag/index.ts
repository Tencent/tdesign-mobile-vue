import LocalTag from './tag.vue';
import LocalCheckTag from './check-tag.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdCheckTagProps, TdTagProps } from './type';

import './style';

export * from './type';
export type CheckTagProps = TdCheckTagProps;
export type TagProps = TdTagProps;

export const Tag: WithInstallType<typeof LocalTag> = withInstall(LocalTag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
