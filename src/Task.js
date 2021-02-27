import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsCheck, BsX } from "react-icons/bs";

export default function Task(props) {
  return (
    <ListGroup.Item>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup size="sm" className="mr-2" aria-label="First group">
          <Button onClick={() => props.handleCompleteTask(props.task)}>
            <BsCheck />
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" className="mr-3" aria-label="First group">
          <Button onClick={() => props.handleRemoveTask(props.task)}>
            <BsX />
          </Button>
        </ButtonGroup>
        <div>{props.task.subject}</div>
      </ButtonToolbar>
    </ListGroup.Item>
  );
}
