import { useState, useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { selectTasks } from '../features/Tasks/tasksSlice';
import GlobalStyles from '../components/styles/Global';
import Header from '../components/Header';
import { useNavigate, Outlet } from 'react-router-dom';
import TaskCreate from '../features/Tasks/TaskCreate';
import Today from '../components/Today';
import { BsChevronDown } from 'react-icons/bs';
import {
  Wrapper,
  Message,
  StyledAside,
  Overlay,
  AsideTitle,
  ProjectsList,
  ListItem,
  Project,
  ProjectColor,
} from '../components/styles/Home.styled';

export const Context = createContext();

const MainTemplate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
          <ProjectsList>
            <ListItem>
              <Today />
              <Project>Today</Project>
            </ListItem>
            <li>
              <ListItem>
                <span>
                  <BsChevronDown />
                </span>
                <AsideTitle>Projects</AsideTitle>
              </ListItem>
              <ul>
                <ListItem
                  onClick={() => {
                    filterHandler('Inbox');
                  }}
                >
                  <ProjectColor color={'rgb(219, 64, 53)'} />
                  <Project>Inbox</Project>
                </ListItem>
                <ListItem
                  onClick={() => {
                    filterHandler('Work');
                  }}
                >
                  <ProjectColor color={'violet'} />
                  <Project>Work</Project>
                </ListItem>
                <ListItem
                  onClick={() => {
                    filterHandler('Study');
                  }}
                >
                  <ProjectColor color={'rgb(235, 150, 235)'} />
                  <Project>Study</Project>
                </ListItem>
                <ListItem
                  onClick={() => {
                    filterHandler('Free time');
                  }}
                >
                  <ProjectColor color={'gold'} />
                  <Project>Free time</Project>
                </ListItem>
              </ul>
            </li>
          </ProjectsList>
        </StyledAside>
        <Overlay isAsideVisible={isAsideVisible} onClick={toggleAside} />
        <Context.Provider
          value={{ project, createMessage, setCreateMessage, setDeleteMessage }}
        >
          <Outlet />
        </Context.Provider>
      </Wrapper>
      {isModalVisible ? (
        <TaskCreate
          hideModal={toggleModal}
          setCreateMessage={setCreateMessage}
        />
      ) : null}
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
