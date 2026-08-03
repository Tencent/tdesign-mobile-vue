import _Typography from './typography';
import _Text from './text';
import _Title from './title';
import _Paragraph from './paragraph';
import { withInstall } from '../shared';
import type { TdTextProps, TdTitleProps, TdParagraphProps } from './type';

import './style';

export * from './type';
export type TextProps = TdTextProps;
export type TitleProps = TdTitleProps;
export type ParagraphProps = TdParagraphProps;

export const Typography = withInstall(_Typography);
export const Text = withInstall(_Text);
export const Title = withInstall(_Title);
export const Paragraph = withInstall(_Paragraph);

export default Typography;
