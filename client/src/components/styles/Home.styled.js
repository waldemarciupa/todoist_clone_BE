import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const listItemStyles = css`
  height: 34px;
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  border-radius: 5px;
  padding: 5px 16px 5px 5px;
  cursor: pointer;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: #eee;
  }
`;

const colors = {
  'Priority 1': '209, 69, 59',
  'Priority 2': '235, 137, 9',
  'Priority 3': '36, 111, 224',
  'Priority 4': '128,128,128',
};

export const ListBox = styled.div`
  flex-grow: 1;
  padding: 16px 45px 0;
`;

export const DateHeader = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
  padding-left: 14px;
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
  padding: 10px 10px;
  border-bottom: 1px solid #f0f0f0;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px rgb(31 96 194 / 40%);
  }
`;

export const ButtonWrapper = styled.div`
  min-width: 26px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  display: ${(props) => (props.isEditingMode ? `none` : 'flex')};
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
  border: 2px solid rgb(${(props) => colors[props.color]});
  background: ${(props) =>
    props.completed
      ? `rgb(${colors[props.color]})`
      : `rgba(${colors[props.color]}, 0.1)`};

  &:hover {
    background: ${(props) =>
      props.completed
        ? `rgb(${colors[props.color]})`
        : `rgba(${colors[props.color]}, 0.2)`};

    & > * {
      display: flex;
    }
  }
`;

export const TaskButtonInner = styled.span`
  display: ${(props) => (props.completed ? 'flex' : 'none')};
  color: ${(props) =>
    props.completed ? '#fff' : `rgb(${colors[props.color]})`};
  justify-content: center;
  align-items: center;
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
  color: ${(props) => (props.completed ? `#808080` : '#202020')};
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  word-break: break-word;
  text-decoration: ${(props) => (props.completed ? `line-through` : 'none')};
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

export const TaskProject = styled.span`
  font-size: 12px;
  color: grey;
`;

export const TaskActions = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
    border-radius: 5px;
  }
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
  height: calc(100vh - 44px);
  width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  min-width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  background: #fafafa;
  padding: ${(props) =>
    props.isAsideVisible ? '30px 5px 0 35px' : '30px 5px 0 0 '};
  transform: ${(props) =>
    props.isAsideVisible ? 'translate(0)' : 'translate(-305px)'};
  transition: all 0.3s ease-in-out;
  z-index: 2;

  @media (max-width: 767px) {
    position: absolute;
    box-shadow: ${(props) =>
      props.isAsideVisible ? ' 0 2px 10px rgb(0 0 0 / 30%)' : 'none'};
  }
`;

export const Overlay = styled.div`
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${(props) => (props.isAsideVisible ? '1' : '0')};
    visibility: ${(props) => (props.isAsideVisible ? 'visible' : 'hidden')};
  }
`;

export const Navigation = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  ${listItemStyles}
`;

export const ProjectToggle = styled.div`
  ${listItemStyles}

  &:hover {
    background: transparent;
  }
`;

export const ProjectToggleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  line-height: 20px;
`;

export const AddProjectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

export const Project = styled.div`
  display: inline-block;
  width: 100%;
  border: none;
  font-size: 14px;
  color: #333;
  line-height: normal;
  padding: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
`;

export const ProjectColor = styled.span`
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.color};
  }
`;
