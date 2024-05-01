import { configureStore } from '@reduxjs/toolkit';
import qnaPageReducer from './Components/organisms/qnaPage/reducer/qnaPage.reducer';
import questionsDisplayReducer from './Components/molecules/questions/slice/questionSlice';
import modalDisplayReducer from './Components/molecules/modalWrapper/slice/modalSlice';
import userSlice from './Components/slices/userSlice';

const store = configureStore({
  reducer: {
    qnaPageReducer,
    questionsDisplay: questionsDisplayReducer,
    modalReducer: modalDisplayReducer,
    userSlice,
  },
});

export default store;
