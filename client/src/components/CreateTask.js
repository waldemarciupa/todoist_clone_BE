import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from './Button';
import { AiOutlineFundProjectionScreen, AiOutlineFlag } from 'react-icons/ai';

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const TaskWrapper = styled.div`
  width: 550px;
  box-shadow: 0 15px 50px 0 rgb(0 0 0 / 35%);
  border-radius: 10px;
  background: #fff;
`;

const TaskContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  color: #808080;
  font-size: ${(props) => (props.primary ? '14px' : '13px')};
  font-weight: ${(props) => (props.primary ? '500' : '300')};
  height: ${(props) => (props.primary ? '25px' : '75px')};

  &::placeholder {
    color: #aaa;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  ul {
    position: absolute;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    list-style: none;
    top: 35px;
    width: 275px;
    border-radius: 5px;
  }
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 4px 8px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const ProjectList = styled.ul`
  left: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const PriorityList = styled.ul`
  right: 0;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ListItem = styled.li`
  display: flex;
  grid-gap: 8px;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

const FlagIcon = styled(AiOutlineFlag)`
  width: 20px;
  height: auto;
  color: ${(props) => props.color};
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 16px;
  border-top: 1px solid #ddd;
`;

const CreateTask = ({ isModalVisible, hideModal }) => {
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isPriorityVisible, setIsPriorityVisible] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('Inbox');
  const [priority, setPriority] = useState('Priority 4');
  const [completed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setUser(user_id);
    }
  }, []);

  const handleProject = (event) => {
    setProject(event.target.innerText);
    setIsProjectVisible(false);
  };

  const handlePriority = (event) => {
    setPriority(event.target.innerText);
    setIsPriorityVisible(false);
  };

  const createTask = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log(title, description, project, completed, priority, user);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}`,
        {
          title,
          description,
          project,
          priority,
          completed,
        },
        {
          headers: {
            user_id: user,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalOuter onClick={hideModal}>
      <TaskWrapper
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <form onSubmit={createTask}>
          <TaskContent>
            <Input
              required
              primary
              placeholder='e.g., Family lunch on Sunday at 11am'
              onChange={(event) => setTitle(event.target.value)}
            />
            <Input
              required
              placeholder='Description'
              onChange={(event) => setDescription(event.target.value)}
            />
            <Actions>
              <ActionButton
                onClick={() => {
                  setIsPriorityVisible(false);
                  setIsProjectVisible(!isProjectVisible);
                }}
                title='Select a project'
                type='button'
              >
                <AiOutlineFundProjectionScreen />
                {project}
              </ActionButton>
              <ProjectList visible={isProjectVisible}>
                <ListItem onClick={handleProject}>Inbox</ListItem>
                <ListItem onClick={handleProject}>Work</ListItem>
                <ListItem onClick={handleProject}>Study</ListItem>
                <ListItem onClick={handleProject}>Free time</ListItem>
              </ProjectList>
              <ActionButton
                onClick={() => {
                  setIsProjectVisible(false);
                  setIsPriorityVisible(!isPriorityVisible);
                }}
                title='Set the priority p1, p2, p3, p4'
                type='button'
              >
                <AiOutlineFlag />
                {priority}
              </ActionButton>
              <PriorityList visible={isPriorityVisible}>
                <ListItem onClick={handlePriority}>
                  <FlagIcon color={'red'} />
                  Priority 1
                </ListItem>
                <ListItem onClick={handlePriority}>
                  <FlagIcon color={'orange'} />
                  Priority 2
                </ListItem>
                <ListItem onClick={handlePriority}>
                  <FlagIcon color={'blue'} />
                  Priority 3
                </ListItem>
                <ListItem onClick={handlePriority}>
                  <FlagIcon />
                  Priority 4
                </ListItem>
              </PriorityList>
            </Actions>
          </TaskContent>
          <ButtonsWrapper>
            <Button type='submit' primary>
              Add task
            </Button>
            <Button hideModal={hideModal} type='button'>
              Cancel
            </Button>
          </ButtonsWrapper>
        </form>
      </TaskWrapper>
    </ModalOuter>
  );
};

export default CreateTask;
