import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsCheck, BsX } from "react-icons/bs";
import moment from "moment";

export default function TaskList(props) {
  const filteredTasks = props.tasks.filter((task) => !task.completed);
  const tasks = filteredTasks.sort(
    (task1, task2) => task1.dueDate - task2.dueDate
  );

  function createActionsGroup(task) {
    return (
      <ButtonToolbar
        className="justify-content-center"
        aria-label="Toolbar with button groups"
      >
        <ButtonGroup size="sm" aria-label="First group">
          <Button
            className="mr-1"
            onClick={() => props.handleCompleteTask(task)}
          >
            <BsCheck />
          </Button>
          <Button onClick={() => props.handleRemoveTask(task)}>
            <BsX />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  function createDate(date) {
    return moment(date).calendar({
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "DD/MM/YYYY",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY"
    });
  }

  function createRow(task) {
    return (
      <tr key={task._id}>
        <td>{task.subject}</td>
        <td>{createDate(task.dueDate)}</td>
        <td>{createActionsGroup(task)}</td>
      </tr>
    );
  }

  function createRows(tasks) {
    return tasks.map((task) => {
      return createRow(task);
    });
  }

  function createTable(tasks) {
    return (
      <Table className="text-center">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{createRows(tasks)}</tbody>
      </Table>
    );
  }

  return <>{tasks.length > 0 && createTable(tasks)}</>;
}
