import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import CreateTask from '../components/CreateTask';
import Header from '../components/Header';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
  Task,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskActions,
  TaskTitle,
  TaskDescription,
  TaskProject,
  Wrapper,
  Message,
  StyledAside,
  AsideTitle,
  ProjectsList,
  ListItem,
  Project,
} from '../components/styles/Home.styled';

const Home = () => {
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [project, setProject] = useState('Today');

  useEffect(() => {
    fetchTasks();
  }, []);

  const user_id = localStorage.getItem('user_id');

  let history = useHistory();

  if (!user_id) {
    history.push('/user/login');
  }

  const fetchTasks = async (filter) => {
    const url = filter
      ? `${process.env.REACT_APP_API_URL}/tasks/${filter}`
      : `${process.env.REACT_APP_API_URL}`;
    try {
      const { data } = await axios.get(url, { headers: { user_id } });

      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const deleteTask = async (e) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/task/${e.currentTarget.parentNode.dataset.id}`
    );
    createMessage && setCreateMessage(false);
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 3000);
    fetchTasks();
  };

  return (
    <>
      <Header showModal={toggleModal} />
      <Wrapper>
        <StyledAside>
          <AsideTitle
            title='Select all tasks'
            onClick={() => {
              fetchTasks();
              setProject('All tasks');
            }}
          >
            Projects
          </AsideTitle>
          <ProjectsList>
            <ListItem>
              <Project
                onClick={() => {
                  fetchTasks('Inbox');
                  setProject('Inbox');
                }}
              >
                Inbox
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  fetchTasks('Work');
                  setProject('Work');
                }}
              >
                Work
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  fetchTasks('Study');
                  setProject('Study');
                }}
              >
                Study
              </Project>
            </ListItem>
            <ListItem>
              <Project
                onClick={() => {
                  fetchTasks('Free time');
                  setProject('Free time');
                }}
              >
                Free time
              </Project>
            </ListItem>
          </ProjectsList>
        </StyledAside>
        <ListBox>
          <DateHeader>
            {project} <DateToday>{new Date().toDateString()}</DateToday>
          </DateHeader>
          <TasksList>
            {data && data.length
              ? data.map((task) => {
                  return (
                    <Task data-id={task._id} key={task._id}>
                      <TaskButton>
                        <TaskButtonOuter
                          onClick={() => {
                            console.log('clik');
                          }}
                          completed={task.completed}
                        >
                          <TaskButtonInner />
                        </TaskButtonOuter>
                      </TaskButton>
                      <TaskContent>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDescription>{task.description}</TaskDescription>
                        <Wrapper>
                          <div></div>
                          <TaskProject>{task.project}</TaskProject>
                        </Wrapper>
                      </TaskContent>
                      <TaskActions onClick={deleteTask}>
                        <AiOutlineDelete />
                      </TaskActions>
                    </Task>
                  );
                })
              : "You're all done for the week! #TodoistZero "}
          </TasksList>
        </ListBox>
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

export default Home;
