import axios from 'axios';
import { useState, useEffect } from 'react';
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
} from '../components/styles/Home.styled';

const Home = () => {
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}`);

        if (data) {
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Header showModal={toggleModal} />
      <ListBox>
        <DateHeader>
          Today <DateToday>{new Date().toDateString()}</DateToday>
        </DateHeader>
        <TasksList>
          {data
            ? data.map((task) => {
                return (
                  <Task key={task._id}>
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
                    <TaskActions>Akcje</TaskActions>
                  </Task>
                );
              })
            : "You're all done for the week! #TodoistZero "}
        </TasksList>
      </ListBox>
      {isModalVisible ? <CreateTask hideModal={toggleModal} /> : null}
    </>
  );
};

export default Home;