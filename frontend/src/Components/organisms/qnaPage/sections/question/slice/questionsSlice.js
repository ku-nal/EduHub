import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  question: {},
};

const questions = createSlice({
  name: 'questionReducer',
  initialState,
  reducers: {
    setQuestion: (state, action) => ({
      ...state,
      question: action.payload,
    }),
  },
});

export const { setQuestion } = questions.actions;
export default questions.reducer;
