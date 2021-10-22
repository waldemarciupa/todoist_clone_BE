import { useHistory } from 'react-router-dom';
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

const Header = ({
  showModal,
  logoutHandler,
  isAsideVisible,
  toggleAside,
  fetchTasks,
}) => {
  let history = useHistory();

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
            history.push('/');
            fetchTasks();
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
