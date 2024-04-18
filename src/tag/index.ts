import LocalTag from './tag';
import LocalCheckTag from './check-tag';
import { withInstall, WithInstallType } from '../shared';
import { TdCheckTagProps, TdTagProps } from './type';

import './style';

export * from './type';
export type CheckTagProps = TdCheckTagProps;
export type TagProps = TdTagProps;

export const Tag: WithInstallType<typeof LocalTag> = withInstall(LocalTag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
