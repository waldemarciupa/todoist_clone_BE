import api from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  tasksByProject: [],
  status: 'idle',
  error: null,
};

const user = localStorage.getItem('user');
const user_id = localStorage.getItem('user_id');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const { data } = await api.get('', { headers: { user, user_id } });
  return data;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        console.log(action);
        state.tasks.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    selectTasks: {
      reducer(state, action) {
        state.tasksByProject = state.tasks.filter((task) => {
          return action.payload ? task.project === action.payload : true;
        });
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched tasks to the array
        state.tasks = action.payload;
        state.tasksByProject = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { taskAdded, selectTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByProject = (state) => state.tasks.tasksByProject;
