import { useSelector } from 'react-redux';
import { taskSingle } from './tasksSlice';
import { AiOutlineCheck } from 'react-icons/ai';
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
                <TaskButtonInner>
                  <AiOutlineCheck style={{ width: '9px', height: '9px' }} />
                </TaskButtonInner>
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
        Added on {new Date(task.createdAt).getDate()}{' '}
        {months[new Date(task.createdAt).getMonth()]}{' '}
        {new Date(task.createdAt).getFullYear()}
        {', '}
        {new Date(task.createdAt).getHours()}:
        {new Date(task.createdAt).getMinutes()}
      </AddedOn>
    </StyledTaskSingle>
  ) : (
    <p>There is no task with specific ID</p>
  );
};

export default TaskSingle;
