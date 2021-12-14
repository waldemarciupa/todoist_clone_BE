import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ListBox = styled.div`
  height: 100vh;
  flex-grow: 1;
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
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const ButtonWrapper = styled.div`
  min-width: 26px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const TaskButton = styled.button`
  min-width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const TaskButtonOuter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  border: 1px solid rgb(${(props) => props.color});

  background: ${(props) =>
    props.completed ? `rgb(${props.color})` : 'transparent'};

  &:hover {
    background: ${(props) =>
      props.completed ? `rgb(${props.color})` : `rgba(${props.color}, 0.2)`};

    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const TaskButtonInner = styled.span`
  display: none;
  width: 100%;
  height: 100%;
`;

export const TaskContent = styled.div`
  flex-grow: 1;
`;

export const TaskLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

export const TaskTitle = styled.p`
  color: #202020;
  margin: 0;
  font-size: 14px;
  line-height: 16px;
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskProject = styled.a`
  font-size: 12px;
  color: grey;
`;

export const TaskActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 40px;
  cursor: pointer;
`;

export const Message = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const StyledAside = styled.div`
  height: 100vh;
  min-width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  background: #fafafa;
  padding: ${(props) =>
    props.isAsideVisible ? '30px 0 0 35px' : '30px 0 0 0 '};
  transform: ${(props) =>
    props.isAsideVisible ? 'translate(0)' : 'translate(-305px)'};
  transition: all 0.2s ease-in-out;
`;

export const AsideTitle = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333;
  font-weight: 700;
  padding: 10px 0;
  cursor: pointer;
`;

export const ProjectsList = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li``;

export const Project = styled.button`
  display: inline-block;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  line-height: normal;
  height: 35px;
  line-height: 35px;
  padding: 0;
  padding-left: 20px;
  cursor: pointer;
  background: transparent;
  text-align: left;

  &:hover {
    background: #eee;
  }
`;
