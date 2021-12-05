import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const TaskSingle = () => {
  const [task, setTask] = useState(null);
  const params = useParams();
  const task_id = params.id;

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
