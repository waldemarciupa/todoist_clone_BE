import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTasks,
  editTask,
  deleteTask,
  selectTasksByProject,
  selectTaskSingle,
  resetTaskMessage,
} from './tasksSlice';
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
import ButtonAddTask from '../../components/ButtonAddTask';
import Bicycle from '../../components/svg/Bicycle';
import Peace from '../../components/svg/Peace';
import Paint from '../../components/svg/Paint';
import EmptyState from '../../components/EmptyState';
import TaskCreate from './TaskCreate';

const TaskList = () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const project = useSelector((state) => state.projects.single);
  const tasks = useSelector(selectTasksByProject);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, taskStatus]);

  const deleteTaskHandler = (e) => {
    const task_id = e.currentTarget.parentNode.dataset.id;
    dispatch(deleteTask({ task_id }));
    setTimeout(() => {
      dispatch(resetTaskMessage());
    }, 3000);
  };

  const toggleAddTaskVisible = () => {
    setAddTaskVisible(!addTaskVisible);
  };

  return (
    <ListBox>
      <DateHeader>
        {project}{' '}
        {project === 'Today' && (
          <DateToday>{new Date().toDateString()}</DateToday>
        )}
      </DateHeader>
      <TasksList>
        {taskStatus === 'failed' && error + ' Please refresh the page'}
        {tasks.length
          ? tasks.map((task) => {
              return (
                <Task data-id={task._id} key={task._id}>
                  <ButtonWrapper>
                    <TaskButton>
                      <TaskButtonOuter
                        title='Complete task'
                        completed={task.completed}
                        onClick={() => {
                          dispatch(
                            editTask({
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
                      <Wrapper>
                        <div></div>
                        <TaskProject>{task.project}</TaskProject>
                      </Wrapper>
                    </TaskLink>
                  </TaskContent>
                  <TaskActions title='Delete' onClick={deleteTaskHandler}>
                    <AiOutlineDelete />
                  </TaskActions>
                </Task>
              );
            })
          : null}
        <li>
          {addTaskVisible ? (
            <TaskCreate handleCancel={toggleAddTaskVisible} />
          ) : (
            <ButtonAddTask onClick={toggleAddTaskVisible} title='Add task' />
          )}
        </li>
      </TasksList>
      {!tasks.length ? (
        <>
          <EmptyState>
            {project === 'All tasks' && <Peace />}
            {project === 'Today' && <Bicycle />}
            {project !== 'All tasks' && project !== 'Today' && <Paint />}
          </EmptyState>
        </>
      ) : null}
    </ListBox>
  );
};

export default TaskList;
