import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

export default function AddTask(props) {
  return (
    <Form>
      <Form.Group controlId="form-subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          value={props.task.subject}
          onChange={(event) => props.handleTaskOnChange(event)}
          type="text"
          placeholder="enter subject"
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="form-due-date">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          value={moment(props.task.dueDate).format("YYYY-MM-DD")}
          onChange={(event) => props.handleTaskOnChange(event)}
          type="date"
        ></Form.Control>
      </Form.Group>
      <Button onClick={() => props.handleCreateTask()}>Submit</Button>
    </Form>
  );
}
