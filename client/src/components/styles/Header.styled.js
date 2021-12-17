import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: #db4c3f;
  padding: 0 42px;
  color: #fff;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 540px) {
    padding: 0 12px;
  }
`;

export const Control = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledButton = styled.button`
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: hsla(0, 0%, 100%, 0.2);
  }
`;

export const SearchBar = styled.div`
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 3px;
  color: #fff;
  position: relative;

  @media (max-width: 540px) {
    display: none;
  }
`;

export const Search = styled.input`
  background: transparent;
  border: 0;
  margin-left: 25px;
  padding-left: 4px;
  height: 100%;

  &:focus {
    background: #fff;
    color: #202020;
    width: 280px;
    outline: none;

    &::placeholder {
      color: #202020;
    }
  }

  &::placeholder {
    color: #fff;
  }
`;
