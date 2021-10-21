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

const Header = ({ showModal, logoutHandler }) => {
  return (
    <StyledHeader>
      <Control>
        <StyledButton>
          <AiOutlineMenu />
        </StyledButton>
        <StyledButton>
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
        <Button primary clickHandler={logoutHandler}>
          Log out
        </Button>
      </Control>
    </StyledHeader>
  );
};

export default Header;
