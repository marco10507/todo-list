import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import React from "react"

export default function AddTask(props) {
    const {handleTaskOnChange, handleCreateTask} = props;

    return (
        <Form>
            <Form.Group controlId="form-subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    value={props.task.subject}
                    onChange={(event) => handleTaskOnChange(event)}
                    type="text"
                    placeholder="enter subject"
                />
            </Form.Group>
            <Form.Group controlId="form-due-date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    value={moment(props.task.dueDate).format("YYYY-MM-DD")}
                    onChange={(event) => handleTaskOnChange(event)}
                    type="date"
                />
            </Form.Group>
            <Button onClick={() => handleCreateTask()}>Submit</Button>
        </Form>
    );
}
