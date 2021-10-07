import { useState } from 'react';
import Header from '../components/Header';
import {
  ListBox,
  DateHeader,
  DateToday,
} from '../components/styles/Home.styled';

const Home = () => {
  const user_id = localStorage.getItem('user_id');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState(false);

  const date = new Date();

  return (
    <>
      <Header />
      <ListBox>
        <DateHeader>
          Today <DateToday>{date.toDateString()}</DateToday>
        </DateHeader>
      </ListBox>
    </>
  );
};

export default Home;
