import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsCheck, BsX } from "react-icons/bs";

export default function TaskList(props) {
  const tasks = props.tasks.filter((task) => !task.completed);

  function getToday() {
    const t = new Date();
    t.setHours(0, 0, 0, 0);

    return t;
  }

  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return tomorrow;
  }

  function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    return yesterday;
  }

  function getLocaleDateString(date) {
    const today = getToday().getTime();
    const tomorrow = getTomorrow().getTime();
    const yesterday = getYesterday().getTime();

    let dateString = "";
    switch (date.setHours(0, 0, 0, 0)) {
      case today:
        dateString = "Today";
        break;
      case tomorrow:
        dateString = "Tomorrow";
        break;
      case yesterday:
        dateString = "Yesterday";
        break;
      default:
        dateString = date.toLocaleDateString();
    }

    return dateString;
  }

  function createActionsGroup(task) {
    return (
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup size="sm" className="mr-2" aria-label="First group">
          <Button onClick={() => props.handleCompleteTask(task)}>
            <BsCheck />
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" className="mr-3" aria-label="First group">
          <Button onClick={() => props.handleRemoveTask(task)}>
            <BsX />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  function createRow(task) {
    return (
      <tr key={task.id}>
        <td>{task.subject}</td>
        <td>{getLocaleDateString(task.dueDate)}</td>
        <td>{createActionsGroup(task)}</td>
      </tr>
    );
  }

  function createRows(tasks) {
    return tasks.map((task) => {
      return createRow(task);
    });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Overdue Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{createRows(tasks)}</tbody>
    </Table>
  );
}
