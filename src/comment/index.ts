import _Comment from './comment';
import { withInstall } from '../shared';

import './style';
import { TdCommentProps } from './type';

export * from './type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
