import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { taskSingle } from './tasksSlice';
import Button from '../../components/Button';
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
  Button as TabButton,
  AddedOn,
  FormButtonWrapper,
} from '../../components/styles/TaskSingle.styled';

import {
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
} from '../../components/styles/Home.styled';

const TaskSingle = () => {
  const task = useSelector(taskSingle);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, []);

  const startEdition = () => {
    setIsEditingMode(true);
  };

  const finishEdition = (e) => {
    setIsEditingMode(false);
    setTitle(task.title);
    setDescription(task.description);
  };

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
      <form>
        <Task isEditingMode={isEditingMode}>
          <FlexLine>
            <ButtonWrapper isEditingMode={isEditingMode}>
              <TaskButton
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <TaskButtonOuter
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
            <TaskTitle
              contentEditable={isEditingMode}
              suppressContentEditableWarning={true}
              onClick={(e) => {
                startEdition();
                setTitle(e.target.innerText + ' ');
              }}
            >
              {title}
            </TaskTitle>
          </FlexLine>
          <TaskDescription
            contentEditable={isEditingMode}
            isEditingMode={isEditingMode}
            suppressContentEditableWarning={true}
            onClick={(e) => {
              startEdition();
              setDescription(e.target.innerText + ' ');
            }}
          >
            {description}
          </TaskDescription>
        </Task>
        <FormButtonWrapper isEditingMode={isEditingMode}>
          <Button primary type='submit'>
            Save
          </Button>
          <Button type='button' clickHandler={finishEdition}>
            Cancel
          </Button>
        </FormButtonWrapper>
      </form>
      <TaskDetails>
        <ButtonsList>
          <TabButton tabSelected={false}>Sub-tasks</TabButton>
          <TabButton tabSelected={false}>Comments</TabButton>
          <TabButton tabSelected={true}>Activity</TabButton>
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
    <StyledTaskSingle>There is no task with specific ID</StyledTaskSingle>
  );
};

export default TaskSingle;
