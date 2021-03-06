import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AddTaskAccordionItem from "./AddTaskAccordionItem";
import CompletedTasksAccordionItem from "./CompletedTasksAccordionItem";
import React from "react";

export default function ToDoAccordion(props) {
    const {tasks, onSubmitTask} = props;

    return (
        <Accordion>
            <Card>
                <AddTaskAccordionItem
                    onSubmitTask={onSubmitTask}
                    eventKey={"0"}
                />
            </Card>
            <Card>
                <CompletedTasksAccordionItem tasks={tasks} eventKey={"1"}/>
            </Card>
        </Accordion>
    );
}
