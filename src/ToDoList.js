import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
import uuid from "react-uuid";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";

export default function ToDoList() {
  const [task, setTask] = useState({
    subject: "",
    id: uuid(),
    completed: false,
    dueDate: new Date()
  });
  const [tasks, setTasks] = useState([
    {
      subject: "Walk dog",
      id: uuid(),
      completed: false,
      dueDate: new Date(2021, 2, 10)
    },
    {
      subject: "Do laundry",
      id: uuid(),
      completed: false,
      dueDate: new Date(2021, 1, 26)
    },
    {
      subject: "Call the rat",
      id: uuid(),
      completed: false,
      dueDate: new Date(2021, 1, 27)
    },
    {
      subject: "Clean the kitchen",
      id: uuid(),
      completed: false,
      dueDate: new Date(2021, 1, 28)
    }
  ]);

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
          dueDate: new Date()
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
        <Card.Body>
          <TaskList
            tasks={tasks}
            handleCompleteTask={handleCompleteTask}
            handleRemoveTask={handleRemoveTask}
          />
        </Card.Body>
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
