import styled from 'styled-components';

const StyledAside = styled.div`
  height: 100vh;
  width: 305px;
  background: #fafafa;
  padding: 30px 0 0 35px;
`;

const AsideTitle = styled.div`
  flex: 1;
  display: flex;
  text-align: left;
  font-size: 14px;
  color: #333;
  font-weight: 700;
  padding: 10px 0;
`;

const ProjectsList = styled.ul`
  list-style: none;
`;

const Project = styled.li`
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  word-break: break-all;
  word-break: break-word;
  word-wrap: anywhere;
  line-height: normal;
  height: 35px;
  line-height: 35px;
  padding: 0;
  padding-left: 20px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const Aside = () => {
  return (
    <StyledAside>
      <AsideTitle>Projects</AsideTitle>
      <ProjectsList>
        <Project>Inbox</Project>
        <Project>Work</Project>
        <Project>Study</Project>
        <Project>Free time</Project>
      </ProjectsList>
    </StyledAside>
  );
};

export default Aside;
