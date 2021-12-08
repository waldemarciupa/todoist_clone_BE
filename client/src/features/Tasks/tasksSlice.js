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

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (initialTask) => {
    const response = await api.post('', initialTask, {
      headers: {
        user: user,
        user_id: user_id,
      },
    });
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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
        state.tasks = state.tasks.concat(action.payload);
        state.tasksByProject = state.tasksByProject.concat(action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.tasksByProject.push(action.payload);
      });
  },
});

export const { selectTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByProject = (state) => state.tasks.tasksByProject;
