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

const Header = () => {
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
        <StyledButton>
          <AiOutlinePlus />
        </StyledButton>
        <StyledButton>
          <AiOutlineBell />
        </StyledButton>
      </Control>
    </StyledHeader>
  );
};

export default Header;
