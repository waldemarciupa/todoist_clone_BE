import { useRouteMatch } from 'react-router-dom';

const TaskSingle = () => {
  let match = useRouteMatch();
  console.log(match.params.id);
  return <div>{match.params.id}</div>;
};

export default TaskSingle;
