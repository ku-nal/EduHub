import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: [],
  newCommentText: '',
};

const comments = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    setComment: (state, action) => ({
      ...state,
      comment: action.payload,
    }),
    setNewCommentText: (state, action) => ({
      ...state,
      newCommentText: action.payload,
    }),
    resetCommentData: state => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { setComment, setNewCommentText, resetCommentData } = comments.actions;
export default comments.reducer;
