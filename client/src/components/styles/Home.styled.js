import styled from 'styled-components';

export const ListBox = styled.div`
  padding: 16px 55px 0;
`;

export const DateHeader = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
`;

export const DateToday = styled.span`
  color: #808080;
  font-size: 12px;
  font-weight: 400;
`;

export const TasksList = styled.ul`
  list-style: none;
`;

export const Task = styled.li`
  display: flex;
`;

export const TaskButton = styled.button`
  min-width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-right: 6px;
`;

export const TaskButtonOuter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #808080;

  background: ${(props) => (props.completed ? '#808080' : 'transparent')};

  &:hover {
    background: hsla(0, 0%, 50.2%, 0.2);
  }
`;

export const TaskButtonInner = styled.span``;

export const TaskContent = styled.div`
  flex-grow: 1;
`;

export const TaskTitle = styled.p`
  color: #202020;
  margin: 0;
  font-size: 14px;
  line-height: 21px;
  word-wrap: break-word;
  word-break: break-word;
`;
export const TaskDescription = styled.p`
  margin: 0;
  font-size: 12px;
  word-wrap: break-word;
  word-break: break-all;
  color: #808080;
`;

export const TaskProject = styled.a``;

export const TaskActions = styled.div``;
