import api from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  task: null,
  tasks: [],
  tasksByProject: [],
  message: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (payload) => {
    const { data } = await api.get('');
    return data;
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (payload) => {
    const response = await api.post('', payload);
    return response.data;
  }
);

export const editTask = createAsyncThunk('tasks/editTask', async (payload) => {
  const response = await api.put(`/task/${payload.id}`, {
    title: payload.title,
    description: payload.description,
    id: payload.id,
    completed: payload.completed,
  });
  return response.data;
});

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (payload) => {
    const response = await api.delete(`/task/${payload.task_id}`);
    return response.data;
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
    resetTaskMessage: {
      reducer(state, action) {
        state.message = [];
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
        state.message.push(action.payload.message);
        state.tasks.push(action.payload.task);
        state.tasksByProject.push(action.payload.task);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks = state.tasks.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                completed: action.payload.completed,
              }
            : task;
        });
        state.tasksByProject = state.tasksByProject.map((task) => {
          return task._id === action.meta.arg.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                completed: action.payload.completed,
              }
            : task;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.message.push(action.payload.message);

        state.tasks = state.tasks.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });

        state.tasksByProject = state.tasksByProject.filter((task) => {
          return task._id !== action.meta.arg.task_id;
        });
      });
  },
});

export const { selectTaskSingle, selectTasks, resetTasks, resetTaskMessage } =
  tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByProject = (state) => state.tasks.tasksByProject;
export const taskSingle = (state) => state.tasks.task;
