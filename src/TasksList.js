import ListGroup from "react-bootstrap/ListGroup";
import Task from "./Task";

export default function TaskList(props) {
  const tasks = props.tasks;

  function createPendingTasks(tasks) {
    const filteredTasks = tasks.filter((task) => !task.completed);

    return filteredTasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        handleCompleteTask={props.handleCompleteTask}
        handleRemoveTask={props.handleRemoveTask}
      />
    ));
  }

  return <ListGroup variant="flush">{createPendingTasks(tasks)}</ListGroup>;
}
