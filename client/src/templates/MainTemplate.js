import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import GlobalStyles from '../components/styles/Global';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import CreateTask from '../components/CreateTask';
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

const MainTemplate = ({ children }) => {
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('Today');

  useEffect(() => {
    fetchTasks();
  }, []);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  let history = useHistory();

  if (!user) {
    history.push('/user/login');
  }

  const fetchTasks = async (filter) => {
    try {
      const url = filter
        ? `${process.env.REACT_APP_API_URL}/tasks/${filter}`
        : `${process.env.REACT_APP_API_URL}`;
      const { data } = await axios.get(url, { headers: { user, user_id } });

      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      history.push('/user/login');
    }
  };

  const filterHandler = (query) => {
    if (query) {
      fetchTasks(query);
      setProject(query);
    } else {
      fetchTasks();
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
    history.push('/user/login');
  };

  const deleteTask = async (e) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/task/${e.currentTarget.parentNode.dataset.id}`,
      { headers: { user, user_id } }
    );
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
        fetchTasks={fetchTasks}
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
        <Context.Provider
          value={{ data: data, project: project, deleteTask: deleteTask }}
        >
          {children}
        </Context.Provider>
      </Wrapper>
      {isModalVisible ? (
        <CreateTask
          fetchTasks={fetchTasks}
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
