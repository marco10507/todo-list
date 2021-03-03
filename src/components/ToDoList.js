import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import taskAPI from "../api/TaskApi";

export default function ToDoList() {
  const [task, setTask] = useState({
    subject: "",
    completed: false,
    dueDate: moment()
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskAPI
      .getAll()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
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
    taskAPI
      .save(task)
      .then((reponse) => {
        if (isNotBlank(task.subject)) {
          setTasks((previousTasks) => {
            return [...previousTasks, reponse.data];
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

  function handleCompleteTask(task) {
    task.completed = true;
    taskAPI
      .update(task, task._id)
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

  function handleRemoveTask(task) {
    taskAPI
      .delete(task._id)
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
