import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
import uuid from "react-uuid";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";
import Tasks from "./Tasks";
import moment from "moment";

export default function ToDoList() {
  const [task, setTask] = useState({
    subject: "",
    id: uuid(),
    completed: false,
    dueDate: moment()
  });
  const [tasks, setTasks] = useState(Tasks());

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  function isNotBlank(str) {
    return !isBlank(str);
  }

  function handleTaskOnChange(event) {
    const id = event.target.id;

    switch (id) {
      case "form-subject":
        setTask((previousTask) => {
          return { ...previousTask, subject: event.target.value };
        });
        break;
      case "form-due-date":
        setTask((previousTask) => {
          return { ...previousTask, dueDate: event.target.valueAsDate };
        });
        break;
      default:
    }
  }

  function handleCreateTask() {
    if (isNotBlank(task.subject)) {
      setTasks((previousTasks) => {
        return [...previousTasks, task];
      });

      setTask((previousTask) => {
        return {
          ...previousTask,
          subject: "",
          id: uuid(),
          dueDate: moment()
        };
      });
    }
  }

  function handleCompleteTask(task) {
    setTasks((previousTasks) => {
      return previousTasks.map((currentTask) => {
        if (currentTask.id === task.id) {
          currentTask.completed = true;
        }

        return currentTask;
      });
    });
  }

  function handleRemoveTask(task) {
    setTasks((previousTasks) => {
      return previousTasks.filter((currentTask) => currentTask.id !== task.id);
    });
  }

  return (
    <>
      <Card>
        <Card.Header>TO DO LIST</Card.Header>
        <TaskList
          tasks={tasks}
          handleCompleteTask={handleCompleteTask}
          handleRemoveTask={handleRemoveTask}
        />
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Add Task
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <AddTask
                  task={task}
                  handleTaskOnChange={handleTaskOnChange}
                  handleCreateTask={handleCreateTask}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Completed Tasks
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <CompletedTaskList tasks={tasks} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Card>
    </>
  );
}
