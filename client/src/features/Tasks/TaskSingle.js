import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, taskSingle } from './tasksSlice';
import { selectProjects } from '../Projects/projectsSlice';
import Button from '../../components/Button';
import ButtonAddTask from '../../components/ButtonAddTask';
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
  TabsComponent,
  CommentsContainer,
  StyledParagraph,
} from '../../components/styles/TaskSingle.styled';

import {
  ButtonWrapper,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
} from '../../components/styles/Home.styled';
import Note from '../../components/svg/Note';

const TaskSingle = () => {
  const dispatch = useDispatch();
  const task = useSelector(taskSingle);
  const projects = useSelector(selectProjects);

  const [id] = useState(task._id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [projectColor, setProjectColor] = useState('rgb(5, 133, 39)');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const currentColor = projects.filter((pp) => {
      return pp.name === task.project;
    });

    if (currentColor.length) {
      setProjectColor(currentColor[0].color);
    } else {
      return;
    }
  }, [projects, task.project]);

  const startEdition = () => {
    if (completed) return;

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

  const handleClick = (e) => {
    setActiveTab(e.target.value);
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
          <ProjectColor color={projectColor} />
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
              completed={completed}
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
            completed={completed}
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
          <TabButton
            value='tab1'
            onClick={handleClick}
            tabSelected={activeTab === 'tab1' && true}
          >
            Sub-tasks
          </TabButton>
          <TabButton
            value='tab2'
            onClick={handleClick}
            tabSelected={activeTab === 'tab2' && true}
          >
            Comments
          </TabButton>
          <TabButton
            value='tab3'
            onClick={handleClick}
            tabSelected={activeTab === 'tab3' && true}
          >
            Activity
          </TabButton>
        </ButtonsList>
      </TaskDetails>
      <TabsComponent>
        {activeTab === 'tab1' && (
          <div>
            <ButtonAddTask
              onClick={() => {
                console.log('Handle add sub-task');
              }}
              title='Add sub-task'
            />
          </div>
        )}
        {activeTab === 'tab2' && (
          <CommentsContainer>
            <Note />
            <StyledParagraph>
              Add relevant notes, links, files, photos, or anything else here.
            </StyledParagraph>
          </CommentsContainer>
        )}
        {activeTab === 'tab3' && (
          <AddedOn>
            Added on {new Date(task.createdAt).getDate()}{' '}
            {months[new Date(task.createdAt).getMonth()]}{' '}
            {new Date(task.createdAt).getFullYear()}
            {', '}
            {new Date(task.createdAt).getHours()}:
            {new Date(task.createdAt).getMinutes()}
          </AddedOn>
        )}
      </TabsComponent>
    </StyledTaskSingle>
  ) : (
    <StyledTaskSingle>There is no task with specific ID</StyledTaskSingle>
  );
};

export default TaskSingle;
