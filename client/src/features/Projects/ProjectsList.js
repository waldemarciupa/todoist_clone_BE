import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, selectProjects, deleteProject } from './projectsSlice';
import {
  ListItem,
  ProjectContent,
  Project,
  ProjectColor,
  ProjectDots,
  ListMenu,
  MenuItem,
  MenuItemDelete,
} from '../../components/styles/Home.styled';
import { AiOutlineEllipsis, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';

const Message = styled.li`
  list-style: none;
  font-size: 13px;
  color: #808080;
  padding: 4px 0 4px 16px;
`;

const ProjectsList = ({
  filterHandler,
  toggleProjectDeleteModal,
  setStateToDelete,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const projectsStatus = useSelector((state) => state.projects.status);

  const user = localStorage.getItem('user');
  const user_id = localStorage.getItem('user_id');

  const ref = useRef(null);
  const [open, setOpen] = useState('');

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen('');
    }
  };

  useEffect(() => {
    if (projectsStatus === 'idle') {
      dispatch(fetchProjects({ user, user_id }));
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [dispatch, projects, user, user_id, projectsStatus]);

  return (
    <ul>
      {projects.length ? (
        projects.map((project) => {
          return (
            <ListItem
              onClick={() => {
                filterHandler(project.name);
              }}
              key={project._id}
            >
              <ProjectColor color={project.color} />
              <ProjectContent>
                <Project>{project.name}</Project>
                <ProjectDots
                  data-id={project._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(e.currentTarget.dataset.id);
                  }}
                >
                  <AiOutlineEllipsis
                    style={{ width: '100%', height: '100%' }}
                  />
                </ProjectDots>
                {open === project._id && (
                  <ListMenu ref={ref} open={open}>
                    <MenuItem
                      data-id={project._id}
                      onClick={(e) => {
                        setOpen('');
                        toggleProjectDeleteModal();
                        setStateToDelete(project._id, project.name);
                      }}
                    >
                      <MenuItemDelete>
                        <AiOutlineDelete
                          style={{ width: '16px', height: '16px' }}
                        />
                      </MenuItemDelete>
                      <span>Delete project</span>
                    </MenuItem>
                  </ListMenu>
                )}
              </ProjectContent>
            </ListItem>
          );
        })
      ) : (
        <Message>Your list of projects will show up here.</Message>
      )}
    </ul>
  );
};

export default ProjectsList;
