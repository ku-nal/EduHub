import { http } from '../../../../../services/http';
import { commentService } from '../../../../../services/urls';

export const getCommentByQid = payload => http.post(commentService.getCommentsByQid, payload);
export const replyToComment = payload => http.post(commentService.postReplyToComment, payload);
