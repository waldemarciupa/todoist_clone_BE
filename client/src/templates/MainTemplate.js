import { useState, useEffect, createContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectTasks } from '../features/Tasks/tasksSlice';
import TaskCreate from '../features/Tasks/TaskCreate';
import ProjectCreate from '../features/Projects/ProjectCreate';
import Header from '../components/Header';
import ProjectsList from '../features/Projects/ProjectsList';
import Today from '../components/Today';
import GlobalStyles from '../components/styles/Global';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  Wrapper,
  Message,
  StyledAside,
  Overlay,
  ProjectToggle,
  ProjectToggleContent,
  AddProjectBtn,
  Navigation,
  ListItem,
  Project,
} from '../components/styles/Home.styled';

export const Context = createContext();

const MainTemplate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('Today');
  const [size, setSize] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const user = localStorage.getItem('user');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/users/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleSize = () => {
      setSize(window.innerWidth);
      size <= 768 ? setIsAsideVisible(false) : setIsAsideVisible(true);
    };

    window.addEventListener('resize', handleSize);
    size > 768 && setIsAsideVisible(true);
  }, [size]);

  const filterHandler = (query) => {
    if (query) {
      dispatch(selectTasks(query));
      setProject(query);
      if (size < 767) {
        toggleAside();
      }
    } else {
      dispatch(selectTasks());
      setProject('All tasks');
    }
    navigate('/task');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleProjectModal = () => {
    setIsProjectModalVisible(!isProjectModalVisible);
  };

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <>
      <GlobalStyles />
      <Header
        showModal={toggleModal}
        isAsideVisible={isAsideVisible}
        toggleAside={toggleAside}
        filterHandler={filterHandler}
      />
      <Wrapper>
        <StyledAside isAsideVisible={isAsideVisible}>
          <Navigation>
            <ListItem>
              <Today />
              <Project>Today</Project>
            </ListItem>
            <li>
              <ProjectToggle>
                <span>
                  <BsChevronDown />
                </span>
                <ProjectToggleContent>
                  <span>Projects</span>
                  <AddProjectBtn
                    onClick={toggleProjectModal}
                    title='Add project'
                  >
                    <AiOutlinePlus />
                  </AddProjectBtn>
                </ProjectToggleContent>
              </ProjectToggle>
              <ProjectsList filterHandler={filterHandler} />
            </li>
          </Navigation>
        </StyledAside>
        <Overlay isAsideVisible={isAsideVisible} onClick={toggleAside} />
        <Context.Provider
          value={{ project, createMessage, setCreateMessage, setDeleteMessage }}
        >
          <Outlet />
        </Context.Provider>
      </Wrapper>
      {isModalVisible && (
        <TaskCreate
          hideModal={toggleModal}
          setCreateMessage={setCreateMessage}
        />
      )}
      {isProjectModalVisible && (
        <ProjectCreate hideProjectModal={toggleProjectModal} />
      )}
      {createMessage ? (
        <Message>
          Task successfully created for {new Date().toLocaleDateString()}{' '}
        </Message>
      ) : null}
      {deleteMessage ? <Message>Task successfully deleted</Message> : null}
    </>
  );
};

export default MainTemplate;
