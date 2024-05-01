import { questionsService } from '../../../services/urls';
import { http } from '../../../services/http';

export const getQuestionById = payload => http.post(questionsService.getQuestionById, payload);
