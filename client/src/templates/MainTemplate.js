import { useState, useEffect, createContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectTasks } from '../features/Tasks/tasksSlice';
import { setProjectSingle } from '../features/Projects/projectsSlice';
import TaskModal from '../features/Tasks/TaskModal';
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
  ProjectContent,
  AddProjectBtn,
  Navigation,
  ListItem,
  Project,
} from '../components/styles/Home.styled';
import ProjectDelete from '../features/Projects/ProjectDelete';

export const Context = createContext();

const MainTemplate = () => {
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProjectDeleteModalVisible, setIsProjectDeleteModalVisible] =
    useState(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('All tasks');
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

  const setStateToDelete = (id, name) => {
    setId(id);
    setName(name);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleProjectDeleteModal = () => {
    setIsProjectDeleteModalVisible(!isProjectDeleteModalVisible);
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
              <Project
                onClick={() => {
                  filterHandler('Today');
                  dispatch(setProjectSingle('Today'));
                }}
              >
                Today
              </Project>
            </ListItem>
            <li>
              <ProjectToggle>
                <span>
                  <BsChevronDown />
                </span>
                <ProjectContent>
                  <span>Projects</span>
                  <AddProjectBtn
                    onClick={toggleProjectModal}
                    title='Add project'
                  >
                    <AiOutlinePlus />
                  </AddProjectBtn>
                </ProjectContent>
              </ProjectToggle>
              <ProjectsList
                filterHandler={filterHandler}
                toggleProjectDeleteModal={toggleProjectDeleteModal}
                setStateToDelete={setStateToDelete}
              />
            </li>
          </Navigation>
        </StyledAside>
        <Overlay isAsideVisible={isAsideVisible} onClick={toggleAside} />
        <Context.Provider
          value={{
            project,
            createMessage,
            setCreateMessage,
            setDeleteMessage,
            toggleModal,
          }}
        >
          <Outlet />
        </Context.Provider>
      </Wrapper>
      {isModalVisible && (
        <TaskModal hideModal={toggleModal}>
          <TaskCreate
            isModal
            hideModal={toggleModal}
            handleCancel={toggleModal}
            setCreateMessage={setCreateMessage}
          />
        </TaskModal>
      )}
      {isProjectDeleteModalVisible && (
        <ProjectDelete
          id={id}
          name={name}
          hideModal={toggleProjectDeleteModal}
          filterHandler={filterHandler}
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
