import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";
import Card from "react-bootstrap/Card";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import taskAPI from "../api/TaskApi";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

export default function ToDoList() {
  const { getAccessTokenSilently } = useAuth0();

  const [task, setTask] = useState({
    subject: "",
    completed: false,
    dueDate: moment()
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await taskAPI().getAll(accessToken);
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    init();
  }, [getAccessTokenSilently]);

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

  async function handleCreateTask() {
    if (isNotBlank(task.subject)) {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await taskAPI().save(task, accessToken);
        const createdTask = response.data;

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
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  async function handleCompleteTask(task) {
    try {
      task.completed = true;

      const accessToken = await getAccessTokenSilently();
      await taskAPI().update(task, task._id, accessToken);

      setTasks((previousTasks) => {
        return previousTasks.map((currentTask) => {
          if (currentTask._id === task._id) {
            currentTask.completed = true;
          }
          return currentTask;
        });
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function handleRemoveTask(task) {
    try {
      const accessToken = await getAccessTokenSilently();
      await taskAPI().delete(task._id, accessToken);
      setTasks((previousTasks) => {
        return previousTasks.filter(
          (currentTask) => currentTask._id !== task._id
        );
      });
    } catch (error) {
      console.log("handleRemoveTask error: ", error);
    }
  }

  return (
    <>
      <Card>
        <Card.Header className="text-center">TO DO LIST</Card.Header>
        <TaskList
          tasks={tasks}
          handleCompleteTask={handleCompleteTask}
          handleRemoveTask={handleRemoveTask}
        />
        <Accordion>
          <Card>
            <Accordion.Toggle
              className="text-center"
              as={Card.Header}
              eventKey="0"
            >
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
            <Accordion.Toggle
              className="text-center"
              as={Card.Header}
              eventKey="1"
            >
              Completed Tasks
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <CompletedTaskList tasks={tasks} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Card.Footer className="text-center">
          <LogoutButton />
        </Card.Footer>
      </Card>
    </>
  );
}
