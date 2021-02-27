import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
import uuid from "react-uuid";
import CompletedTaskList from "./CompletedTaskList";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default function ToDoList() {
  const [task, setTask] = useState({
    subject: "",
    id: uuid(),
    completed: false
  });
  const [tasks, setTasks] = useState([
    { subject: "Walk dog", id: uuid(), completed: false },
    { subject: "Call the rat", id: uuid(), completed: false },
    { subject: "Clean the kitchen", id: uuid(), completed: false }
  ]);
  const [open, setOpen] = useState(false);

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  function isNotBlank(str) {
    return !isBlank(str);
  }

  function handleOnChange(event) {
    setTask((previousTask) => {
      return { ...previousTask, subject: event.target.value };
    });
  }

  function handleCreateTask() {
    if (isNotBlank(task.subject)) {
      setTasks((previousTasks) => {
        return [...previousTasks, task];
      });

      setTask((previousTask) => {
        return { ...previousTask, subject: "", id: uuid() };
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
          <Card.Title>Pending Tasks</Card.Title>
          <TaskList
            tasks={tasks}
            handleCompleteTask={handleCompleteTask}
            handleRemoveTask={handleRemoveTask}
          />
          <AddTask
            task={task}
            handleOnChange={handleOnChange}
            handleCreateTask={handleCreateTask}
          />
          <Button
            style={{ color: "grey" }}
            variant="link"
            onClick={() => setOpen(!open)}
            aria-controls="collapse-completed-tasks"
            aria-expanded={open}
          >
            Completed Tasks
          </Button>
          <Collapse in={open}>
            <div id="collapse-completed-tasks">
              <CompletedTaskList tasks={tasks} />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </>
  );
}
