import Accordion from "react-bootstrap/Accordion";
import AddTask from "../AddTask";
import Card from "react-bootstrap/Card";
import React from "react"

export default function AddTaskAccordionItem(props) {
  const { task, handleTaskOnChange, handleCreateTask, eventKey } = props;
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
          <AddTask
            task={task}
            handleTaskOnChange={handleTaskOnChange}
            handleCreateTask={handleCreateTask}
          />
        </Card.Body>
      </Accordion.Collapse>
    </>
  );
}
