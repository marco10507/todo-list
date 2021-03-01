import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
// import uuid from "react-uuid";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";
// import Tasks from "../Tasks";
import moment from "moment";

export default function ToDoList() {
  const [task, setTask] = useState({
    subject: "",
    completed: false,
    dueDate: moment()
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://0rnfy.sse.codesandbox.io/api/tasks", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

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
    inserTask(task)
      .then((createdTask) => {
        if (isNotBlank(task.subject)) {
          setTasks((previousTasks) => {
            return [...previousTasks, createdTask];
          });

          setTask((previousTask) => {
            return {
              ...previousTask,
              subject: "",
              dueDate: moment()
            };
          });
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  async function inserTask(task) {
    let createdTask;
    try {
      const response = await fetch(
        "https://0rnfy.sse.codesandbox.io/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)
        }
      );

      createdTask = await response.json();
    } catch (error) {
      console.log("error: ", error);
    }

    return createdTask;
  }

  function handleCompleteTask(task) {
    task.completed = true;
    updateTask(task)
      .then(() => {
        setTasks((previousTasks) => {
          return previousTasks.map((currentTask) => {
            if (currentTask._id === task._id) {
              currentTask.completed = true;
            }
            return currentTask;
          });
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  async function updateTask(task) {
    try {
      await fetch(`https://0rnfy.sse.codesandbox.io/api/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.log("deleteTask error: ", error);
    }
  }

  function handleRemoveTask(task) {
    deleteTask(task._id)
      .then(() => {
        setTasks((previousTasks) => {
          return previousTasks.filter(
            (currentTask) => currentTask._id !== task._id
          );
        });
      })
      .catch((error) => {
        console.log("handleRemoveTask error: ", error);
      });
  }

  async function deleteTask(id) {
    try {
      await fetch(`https://0rnfy.sse.codesandbox.io/api/tasks/${id}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.log("deleteTask error: ", error);
    }
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
