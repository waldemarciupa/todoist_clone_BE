import { AiOutlineDelete } from 'react-icons/ai';
import {
  ListBox,
  DateHeader,
  DateToday,
  TasksList,
  Task,
  TaskButton,
  TaskButtonOuter,
  TaskButtonInner,
  TaskContent,
  TaskLink,
  TaskActions,
  TaskTitle,
  TaskDescription,
  TaskProject,
  Wrapper,
} from './styles/Home.styled';

const TaskList = ({ deleteTask, project, data }) => {
  return (
    <ListBox>
      <DateHeader>
        {project} <DateToday>{new Date().toDateString()}</DateToday>
      </DateHeader>
      <TasksList>
        {data && data.length
          ? data.map((task) => {
              return (
                <Task data-id={task._id} key={task._id}>
                  <TaskButton>
                    <TaskButtonOuter
                      onClick={() => {
                        console.log('clik');
                      }}
                      completed={task.completed}
                      color={
                        (task.priority === 'Priority 1' && '255,0,0') ||
                        (task.priority === 'Priority 2' && '255,165,0') ||
                        (task.priority === 'Priority 3' && '0,0,255') ||
                        (task.priority === 'Priority 4' && '128,128,128')
                      }
                    >
                      <TaskButtonInner />
                    </TaskButtonOuter>
                  </TaskButton>
                  <TaskContent>
                    <TaskLink to={`/task/${task._id}`}>
                      <TaskTitle>{task.title}</TaskTitle>
                      <TaskDescription>{task.description}</TaskDescription>
                    </TaskLink>
                    <Wrapper>
                      <div></div>
                      <TaskProject>{task.project}</TaskProject>
                    </Wrapper>
                  </TaskContent>
                  <TaskActions title='Delete' onClick={deleteTask}>
                    <AiOutlineDelete />
                  </TaskActions>
                </Task>
              );
            })
          : "You're all done for the week! #TodoistZero "}
      </TasksList>
    </ListBox>
  );
};

export default TaskList;
