import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTasks,
  editTask,
  deleteTask,
  selectTasksByProject,
  selectTaskSingle,
} from './tasksSlice';
import { Context } from '../../templates/MainTemplate';
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
  Task,
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskLink,
  TaskActions,
  TaskTitle,
  TaskDescription,
  TaskProject,
  Wrapper,
} from '../../components/styles/Home.styled';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksByProject);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const { project, createMessage, setCreateMessage, setDeleteMessage } =
    useContext(Context);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!user) {
      return;
    }
    if (taskStatus === 'idle') {
      dispatch(fetchTasks({ user, user_id }));
    }
  }, [user, user_id, taskStatus, dispatch]);

  const deleteTaskHandler = (e) => {
    const task_id = e.currentTarget.parentNode.dataset.id;
    dispatch(deleteTask({ task_id, user, user_id }));
    createMessage && setCreateMessage(false);
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 3000);
  };

  return (
    <ListBox>
      <DateHeader>
        {project} <DateToday>{new Date().toDateString()}</DateToday>
      </DateHeader>
      <TasksList>
        {taskStatus === 'failed' && error + ' Please refresh the page'}
        {taskStatus === 'loading' && 'Loading...'}
        {tasks.length ? (
          tasks.map((task) => {
            return (
              <Task data-id={task._id} key={task._id}>
                <ButtonWrapper>
                  <TaskButton>
                    <TaskButtonOuter
                      completed={task.completed}
                      onClick={() => {
                        dispatch(
                          editTask({
                            user,
                            user_id,
                            id: task._id,
                            completed: !task.completed,
                          })
                        );
                      }}
                      color={task.priority}
                    >
                      <TaskButtonInner
                        completed={task.completed}
                        color={task.priority}
                      >
                        <AiOutlineCheck
                          style={{ width: '9px', height: '9px' }}
                        />
                      </TaskButtonInner>
                    </TaskButtonOuter>
                  </TaskButton>
                </ButtonWrapper>
                <TaskContent>
                  <TaskLink
                    onClick={() => {
                      dispatch(selectTaskSingle(task._id));
                    }}
                    to={`/task/${task._id}`}
                  >
                    <TaskTitle completed={task.completed}>
                      {task.title}
                    </TaskTitle>
                    <TaskDescription>{task.description}</TaskDescription>
                  </TaskLink>
                  <Wrapper>
                    <div></div>
                    <TaskProject>{task.project}</TaskProject>
                  </Wrapper>
                </TaskContent>
                <TaskActions title='Delete' onClick={deleteTaskHandler}>
                  <AiOutlineDelete />
                </TaskActions>
              </Task>
            );
          })
        ) : (
          <p>You're all done for the week! #TodoistZero</p>
        )}
      </TasksList>
    </ListBox>
  );
};

export default TaskList;
