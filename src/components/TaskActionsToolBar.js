import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsCheck, BsX } from "react-icons/bs";

export default function TaskActionsToolBar({
  task,
  handleCompleteTask,
  handleRemoveTask
}) {
  return (
    <ButtonToolbar
      className="justify-content-center"
      aria-label="Toolbar with button groups"
    >
      <ButtonGroup size="sm" aria-label="First group">
        <Button className="mr-1" onClick={() => handleCompleteTask(task)}>
          <BsCheck />
        </Button>
        <Button onClick={() => handleRemoveTask(task)}>
          <BsX />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}