import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/User/userSlice';
import { resetTasks, selectTaskBySearch } from '../features/Tasks/tasksSlice';
import { resetProjects } from '../features/Projects/projectsSlice';
import Button from './Button';
import {
  StyledHeader,
  Control,
  StyledButton,
  SearchBar,
  Search,
} from './styles/Header.styled';
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlinePlus,
  AiOutlineBell,
  AiOutlineSearch,
} from 'react-icons/ai';

const Header = ({ showModal, isAsideVisible, toggleAside, filterHandler }) => {
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetTasks());
    dispatch(resetProjects());
    navigate('/users/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(selectTaskBySearch(searchInput));
  };

  return (
    <StyledHeader>
      <Control>
        <StyledButton
          title={isAsideVisible ? 'Close menu' : 'Open menu'}
          onClick={toggleAside}
        >
          <AiOutlineMenu />
        </StyledButton>
        <StyledButton
          title='Home'
          onClick={() => {
            navigate('/task');
            filterHandler();
          }}
        >
          <AiOutlineHome />
        </StyledButton>
        <SearchBar onSubmit={handleSubmit}>
          <StyledButton search type='submit'>
            <AiOutlineSearch />
          </StyledButton>
          <Search
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.currentTarget.value);
              dispatch(selectTaskBySearch(e.currentTarget.value));
            }}
            placeholder='Search'
          ></Search>
        </SearchBar>
      </Control>
      <Control>
        <StyledButton onClick={showModal} title='Add task'>
          <AiOutlinePlus />
        </StyledButton>
        <StyledButton>
          <AiOutlineBell />
        </StyledButton>
        <Button title='Log out' primary clickHandler={logoutHandler}>
          Log out
        </Button>
      </Control>
    </StyledHeader>
  );
};

export default Header;
