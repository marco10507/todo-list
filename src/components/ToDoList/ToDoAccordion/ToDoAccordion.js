import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AddTaskAccordionItem from "./AddTaskAccordionItem";
import CompletedTasksAccordionItem from "./CompletedTasksAccordionItem";

export default function ToDoAccordion(props) {
  const { task, tasks, handleTaskOnChange, handleCreateTask } = props;

  return (
    <Accordion>
      <Card>
        <AddTaskAccordionItem
          task={task}
          handleTaskOnChange={handleTaskOnChange}
          handleCreateTask={handleCreateTask}
          eventKey={"0"}
        />
      </Card>
      <Card>
        <CompletedTasksAccordionItem tasks={tasks} eventKey={"1"} />
      </Card>
    </Accordion>
  );
}
