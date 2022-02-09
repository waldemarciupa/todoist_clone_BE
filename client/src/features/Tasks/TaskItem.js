import { useDispatch } from 'react-redux';
import { editTask, selectTaskSingle } from './tasksSlice';
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import {
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
  BranchWrapper,
  TaskProject,
  TaskBottomWrapper,
} from '../../components/styles/Home.styled';

const TaskItem = ({ task, deleteTaskHandler }) => {
  const dispatch = useDispatch();

  return (
    <Task data-id={task._id}>
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
            <TaskButtonInner completed={task.completed} color={task.priority}>
              <AiOutlineCheck style={{ width: '9px', height: '9px' }} />
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
          <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
          <TaskBottomWrapper>
            {task.subtasks && task.subtasks.length ? (
              <BranchWrapper>
                <img
                  width='16px'
                  height='16px'
                  alt='branch'
                  src='/images/branch.svg'
                />
                {task.subtasks.filter((task) => task.completed).length}/
                {task.subtasks.length}
              </BranchWrapper>
            ) : (
              <div></div>
            )}
            <TaskProject>{task.project}</TaskProject>
          </TaskBottomWrapper>
        </TaskLink>
      </TaskContent>
      <TaskActions title='Delete' onClick={deleteTaskHandler}>
        <AiOutlineDelete style={{ color: '#202020' }} />
      </TaskActions>
    </Task>
  );
};

export default TaskItem;
