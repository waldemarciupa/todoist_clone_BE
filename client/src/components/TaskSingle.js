import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import api from '../services/api';

const TaskSingle = () => {
  const [task, setTask] = useState(null);

  let match = useRouteMatch();
  const task_id = match.params.id;

  const fetchTask = async (id) => {
    try {
      const { data } = await api.get(`/task/${id}`);
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask(task_id);
    console.log(task);
  }, []);

  return (
    task && (
      <>
        <div>{task._id}</div>
        <div>{task.title}</div>
        <div>{task.completed}</div>
        <div>{task.createdAt}</div>
        <div>{task.description}</div>
        <div>{task.project}</div>
        <div>{task.priority}</div>
      </>
    )
  );
};

export default TaskSingle;
