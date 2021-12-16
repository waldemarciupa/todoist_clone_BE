import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, taskSingle } from './tasksSlice';
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
  const dispatch = useDispatch();
  const task = useSelector(taskSingle);

  const [id] = useState(task._id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const [isEditingMode, setIsEditingMode] = useState(false);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  const startEdition = () => {
    setIsEditingMode(true);
  };

  const finishEdition = (e) => {
    setIsEditingMode(false);
    setTitle(task.title);
    setDescription(task.description);
  };

  const saveTask = (e) => {
    e.preventDefault();
    dispatch(editTask({ user, user_id, title, description, id, completed }));
    setIsEditingMode(false);
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
      <form onSubmit={saveTask}>
        <Task isEditingMode={isEditingMode}>
          <FlexLine>
            <ButtonWrapper isEditingMode={isEditingMode}>
              <TaskButton
                type='button'
                onClick={() => {
                  setCompleted(!completed);
                  dispatch(
                    editTask({
                      user,
                      user_id,
                      title,
                      description,
                      id,
                      completed: !completed,
                    })
                  );
                }}
              >
                <TaskButtonOuter completed={completed} color={task.priority}>
                  <TaskButtonInner completed={completed} color={task.priority}>
                    <AiOutlineCheck
                      style={{
                        width: '9px',
                        height: '9px',
                      }}
                    />
                  </TaskButtonInner>
                </TaskButtonOuter>
              </TaskButton>
            </ButtonWrapper>
            <TaskTitle
              contentEditable={isEditingMode}
              suppressContentEditableWarning={true}
              onClick={(e) => {
                startEdition();
              }}
              onBlur={(e) => {
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
            onClick={() => {
              startEdition();
            }}
            onBlur={(e) => {
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
