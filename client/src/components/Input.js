import styled from 'styled-components';

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  padding: 0.75em 1em;
  margin-bottom: ${(props) => (props.mb ? props.mb : '5px')};
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Input = ({ type, mb }) => {
  return <StyledInput type={type} mb={mb} />;
};

export default Input;
