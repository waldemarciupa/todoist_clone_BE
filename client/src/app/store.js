import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/Tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
