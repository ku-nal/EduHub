export const baseURL = import.meta.env.VITE_BACKEND_URL;

const questionUrl = `${baseURL}/community`;
const commentUrl = `${baseURL}/comments`;

export const questionsService = {
  getAllQuestions: `${questionUrl}/getAllQuestions`,
  getQuestionById: `${questionUrl}/getQuestionById`,
  postQuestion: `${questionUrl}/postQuestion`,
};

export const commentService = {
  getCommentsByQid: commentUrl,
  postReplyToComment: `${commentUrl}/replyToComment`,
};

export const userService = {
  signup: `${baseURL}/user/signup`,
  login: `${baseURL}/user/login`,
  forgotpwd: `${baseURL}/user/forgotpwd`,
  resetpwd: `${baseURL}/user/reset-password`,
  logout: `${baseURL}/user/logout`,
};
