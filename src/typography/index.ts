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
export const TypographyText = withInstall(_Text);
export const TypographyTitle = withInstall(_Title);
export const TypographyParagraph = withInstall(_Paragraph);

export { _Text as Text, _Title as Title, _Paragraph as Paragraph };

export default Typography;
