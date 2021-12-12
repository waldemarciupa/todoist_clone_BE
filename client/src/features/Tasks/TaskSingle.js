import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskSingle, taskSingle } from './tasksSlice';
import {
  StyledTaskSingle,
  ProjectColorWrapper,
  ProjectColor,
  Project,
  Task,
  FlexLine,
  TaskTitle,
  TaskDescription,
  TaskDetails,
  ButtonsList,
  Button,
  AddedOn,
} from '../../components/styles/TaskSingle.styled';

import {
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
} from '../../components/styles/Home.styled';

const TaskSingle = () => {
  const task = useSelector(taskSingle);
  const params = useParams();
  const task_id = params.id;
  const dispatch = useDispatch();

  const date = new Date(task.createdAt);

  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  useEffect(() => {
    dispatch(selectTaskSingle(task_id));
  }, [dispatch, task_id]);

  return task ? (
    <StyledTaskSingle>
      <FlexLine>
        <ProjectColorWrapper>
          <ProjectColor />
        </ProjectColorWrapper>
        <Project>{task.project}</Project>
      </FlexLine>
      <Task>
        <FlexLine>
          <ButtonWrapper>
            <TaskButton>
              <TaskButtonOuter
                onClick={() => {
                  console.log('clik');
                }}
                completed={task.completed}
                color={
                  (task.priority === 'Priority 1' && '255,0,0') ||
                  (task.priority === 'Priority 2' && '255,165,0') ||
                  (task.priority === 'Priority 3' && '0,0,255') ||
                  (task.priority === 'Priority 4' && '128,128,128')
                }
              >
                <TaskButtonInner />
              </TaskButtonOuter>
            </TaskButton>
          </ButtonWrapper>
          <TaskTitle>{task.title}</TaskTitle>
        </FlexLine>
        <TaskDescription>{task.description}</TaskDescription>
      </Task>
      <TaskDetails>
        <ButtonsList>
          <Button tabSelected={false}>Sub-tasks</Button>
          <Button tabSelected={false}>Comments</Button>
          <Button tabSelected={true}>Activity</Button>
        </ButtonsList>
      </TaskDetails>
      <AddedOn>
        Added on {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
        {', '}
        {date.getHours()}:{date.getMinutes()}
      </AddedOn>
    </StyledTaskSingle>
  ) : (
    <p>There is no task with specific ID</p>
  );
};

export default TaskSingle;
