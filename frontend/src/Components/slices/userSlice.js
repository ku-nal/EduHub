import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  enrolledCourses: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const { firstName = state.firstName, lastName = state.lastName, email = state.email, role = state.role, userId = state, enrolledCourses = [] } = payload;

      const userFullName = `${firstName} ${lastName}`;
      return {
        ...state,
        email,
        role,
        userId, 
        enrolledCourses: [...state.enrolledCourses, enrolledCourses], // Update enrolledCourses
        firstName,
        lastName,
        userFullName,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
