import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CompletedTaskList from "../CompletedTaskList";
import React from "react"

export default function CompletedTasksAccordionItem(props) {
  const { tasks, eventKey } = props;
  return (
    <>
      <Accordion.Toggle className="text-center" as={Card.Header} eventKey="1">
        Completed Tasks
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <CompletedTaskList tasks={tasks} />
        </Card.Body>
      </Accordion.Collapse>
    </>
  );
}
