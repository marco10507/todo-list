import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function AddTask(props) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        value={props.task.subject}
        placeholder="Enter new task"
        aria-label="Enter new task"
        onChange={(event) => props.handleOnChange(event)}
        onKeyUp={({ key }) => {
          if (key === "Enter") {
            props.handleCreateTask();
          }
        }}
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button
          onClick={() => props.handleCreateTask()}
          variant="outline-secondary"
        >
          ADD
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
