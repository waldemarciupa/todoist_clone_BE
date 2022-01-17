import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

const Button = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 14px;
  color: #808080;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #dd4b39;

    span {
      color: #fff;
      background: #dd4b39;
      border-radius: 50%;
    }
  }
`;

const StyledDiv = styled.div`
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: #dd4b39;
  width: 17px;
  height: 17px;
`;

const ButtonAddTask = ({ toggleModal }) => {
  return (
    <Button onClick={toggleModal}>
      <StyledDiv>
        <Span>
          <AiOutlinePlus style={{ width: '17px', height: '17px' }} />
        </Span>
      </StyledDiv>
      Add task
    </Button>
  );
};

export default ButtonAddTask;
