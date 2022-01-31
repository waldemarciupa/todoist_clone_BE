import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  name: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // TODO: Reducer comes here
  },
  extraReducers: {
    // TODO: Extra reducer comes here
  },
});

export default userSlice.reducer;

export const userSelector = (state) => state.user;
