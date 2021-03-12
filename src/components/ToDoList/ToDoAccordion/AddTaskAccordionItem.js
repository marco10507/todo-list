import Accordion from "react-bootstrap/Accordion";
import AddTaskForm from "../AddTaskForm";
import Card from "react-bootstrap/Card";
import React from "react"

export default function AddTaskAccordionItem(props) {
    const {onSubmitTask, eventKey} = props;

    return (
        <>
            <Accordion.Toggle
                className="text-center"
                as={Card.Header}
                eventKey={eventKey}
            >
                Add Task
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <AddTaskForm
                        onSubmitTask={onSubmitTask}
                    />
                </Card.Body>
            </Accordion.Collapse>
        </>
    );
}
