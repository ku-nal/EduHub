import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  qTitle: '',
  qDesc: '',
  isModalVisible: false,
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setTitle: (state, action) => ({
      ...state,
      qTitle: action.payload,
    }),
    setDescription: (state, action) => ({
      ...state,
      qDesc: action.payload,
    }),
    setModalVisible: (state, action) => ({
      ...state,
      isModalVisible: action.payload,
    }),
  },
});

export const { setTitle, setDescription, setModalVisible } = modalSlice.actions;
export default modalSlice.reducer;
