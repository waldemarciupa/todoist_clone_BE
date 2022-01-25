import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTasks } from '../features/tasks/tasksSlice';
import { resetProjects } from '../features/projects/projectsSlice';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    dispatch(resetTasks());
    dispatch(resetProjects());
    navigate('/users/login');
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
        <SearchBar>
          <StyledButton style={{ position: 'absolute' }}>
            <AiOutlineSearch />
          </StyledButton>
          <Search placeholder='Search'></Search>
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
