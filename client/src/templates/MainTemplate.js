import api from '../services/api';
import { useState, useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { selectTasks } from '../features/Tasks/tasksSlice';
import GlobalStyles from '../components/styles/Global';
import Header from '../components/Header';
import { useNavigate, Outlet } from 'react-router-dom';
import TaskCreate from '../features/Tasks/TaskCreate';
import {
  Wrapper,
  Message,
  StyledAside,
  AsideTitle,
  ProjectsList,
  ListItem,
  Project,
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
  const user_id = localStorage.getItem('user_id');

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
    } else {
      dispatch(selectTasks());
      setProject('All tasks');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    navigate('/users/login');
  };

  const deleteTask = async (e) => {
    await api.delete(`/task/${e.currentTarget.parentNode.dataset.id}`, {
      headers: { user, user_id },
    });
    createMessage && setCreateMessage(false);
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 3000);
    filterHandler();
  };

  return (
    <>
      <GlobalStyles />
      <Header
        showModal={toggleModal}
        logoutHandler={logoutHandler}
        isAsideVisible={isAsideVisible}
        toggleAside={toggleAside}
      />
      <Wrapper>
        <StyledAside isAsideVisible={isAsideVisible}>
          <AsideTitle
            title='Select all tasks'
            onClick={() => {
              filterHandler();
            }}
          >
            Projects
          </AsideTitle>
          <ProjectsList>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Inbox');
                }}
              >
                Inbox
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Work');
                }}
              >
                Work
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Study');
                }}
              >
                Study
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  filterHandler('Free time');
                }}
              >
                Free time
              </Project>
            </ListItem>
          </ProjectsList>
        </StyledAside>
        <Context.Provider value={{ project: project, deleteTask: deleteTask }}>
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
