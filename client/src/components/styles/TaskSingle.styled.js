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
  gap: 4px;
`;

export const Task = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  cursor: text;
  padding: ${(props) => (props.isEditingMode ? `10px 10px 0` : '10px 0 0 0 ')};
  border: ${(props) =>
    props.isEditingMode ? `1px solid #ddd` : '1px solid transparent'};
`;

export const TaskTitle = styled.div`
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
  outline: none;
`;

export const TaskDescription = styled.div`
  padding-left: ${(props) => (props.isEditingMode ? `0` : '30px')};
  margin-bottom: 16px;
  outline: none;
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

export const FormButtonWrapper = styled.div`
  display: ${(props) => (props.isEditingMode ? `grid` : 'none')};
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 10px 0;
`;
