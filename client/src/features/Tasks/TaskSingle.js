import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskSingle, taskSingle } from './tasksSlice';

const TaskSingle = () => {
  const task = useSelector(taskSingle);
  const params = useParams();
  const task_id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectTaskSingle(task_id));
  }, [dispatch, task_id]);

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
