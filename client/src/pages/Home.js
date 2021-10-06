import Header from '../components/Header';

const Home = () => {
  const user_id = localStorage.getItem('user_id');

  console.log(user_id);

  return (
    <div>
      <Header />
      <h1>Hello from Homepage</h1>
    </div>
  );
};

export default Home;
