import styled from 'styled-components';
import Button from './Button';
import { AiOutlineMail } from 'react-icons/ai';

const TaskWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  box-shadow: 0 15px 50px 0 rgb(0 0 0 / 35%);
  border-radius: 10px;
`;

const TaskContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  color: #808080;
  font-size: ${(props) => (props.primary ? '14px' : '13px')};
  font-weight: ${(props) => (props.primary ? '500' : '300')};
  height: ${(props) => (props.primary ? '25px' : '75px')};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border: 1px solid #808080;
  border-radius: 4px;
  padding: 4px 8px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const Priority = styled.button``;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 16px;
`;

const CreateTask = () => {
  return (
    <TaskWrapper>
      <form>
        <TaskContent>
          <Input primary placeholder='e.g., Family lunch on Sunday at 11am' />
          <Input placeholder='Description' />
          <Actions>
            <ActionButton>
              <AiOutlineMail />
              Inbox
            </ActionButton>
            <ActionButton>Priority</ActionButton>
          </Actions>
        </TaskContent>
        <ButtonsWrapper>
          <Button primary>Add task</Button>
          <Button>Cancel</Button>
        </ButtonsWrapper>
      </form>
    </TaskWrapper>
  );
};

export default CreateTask;
