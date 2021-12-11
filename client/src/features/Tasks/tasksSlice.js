import api from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  task: {},
  tasks: [],
  tasksByProject: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (payload) => {
    const { data } = await api.get('', {
      headers: { user: payload.user, user_id: payload.user_id },
    });
    return data;
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (payload) => {
    const response = await api.post('', payload, {
      headers: { user: payload.user, user_id: payload.user_id },
    });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (payload) => {
    await api.delete(`/task/${payload.task_id}`, {
      headers: { user: payload.user, user_id: payload.user_id },
    });
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTaskSingle: {
      reducer(state, action) {
        state.task = state.tasks.filter((task) => {
          return task._id === action.payload;
        })[0];
      },
    },
    selectTasks: {
      reducer(state, action) {
        state.tasksByProject = state.tasks.filter((task) => {
          return action.payload ? task.project === action.payload : true;
        });
      },
    },
    resetTasks: {
      reducer(state, action) {
        return (state = initialState);
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
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });

        state.tasksByProject = state.tasksByProject.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });
      });
  },
});

export const { selectTaskSingle, selectTasks, resetTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByProject = (state) => state.tasks.tasksByProject;
export const taskSingle = (state) => state.tasks.task;
