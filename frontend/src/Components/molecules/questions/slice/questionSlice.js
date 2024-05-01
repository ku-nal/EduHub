import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: null,
};

export const questionsDisplaySlice = createSlice({
  name: 'questionsDisplay',
  initialState,
  reducers: {
    setquestionData: (state, action) => ({
      ...state,
      questionData: action.payload,
    }),
  },
});

export const {
  setquestionData,
} = questionsDisplaySlice.actions;
export default questionsDisplaySlice.reducer;
