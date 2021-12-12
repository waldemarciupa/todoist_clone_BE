import styled from 'styled-components';

export const StyledTaskSingle = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const ProjectColorWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProjectColor = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: crimson;
  border-radius: 50%;
`;

export const Project = styled.div``;

export const FlexLine = styled.div`
  display: flex;
  align-items: center;
`;

export const Task = styled.div`
  margin-top: 10px;
`;

export const TaskTitle = styled.div`
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
`;

export const TaskDescription = styled.div`
  padding-left: 26px;
  margin-bottom: 16px;
`;

export const TaskDetails = styled.div``;

export const ButtonsList = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  width: 33.3%;
  display: block;
  padding: 10px 0;
  line-height: ${(props) => (props.tabSelected ? `1em` : '1.7')};
  font-size: ${(props) => (props.tabSelected ? `13px` : '0.875rem')};
  color: ${(props) => (props.tabSelected ? `#202020` : '#b3b3b3')};
  color: ;
  font-weight: ${(props) => (props.tabSelected ? `700` : '400')};
  text-decoration: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  border-bottom: ${(props) =>
    props.tabSelected ? `1px solid #202020` : '1px solid #ddd'};
`;

export const AddedOn = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 12px 20px;
  font-weight: 700;
`;
