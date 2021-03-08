import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import Card from "react-bootstrap/Card";
import CompletedTaskList from "./CompletedTaskList";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import taskAPI from "../../api/TaskApi";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";
import Spinner from "../Spinner";
import TasksTable from "./TasksTable";
import TaskActionsToolBar from "./TaskActionsToolBar";

export default function ToDoList() {
  const { getAccessTokenSilently } = useAuth0();

  const [task, setTask] = useState({
    subject: "",
    completed: false,
    dueDate: moment()
  });
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await taskAPI().getAll(accessToken);
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);
        setIsLoading((loading) => !loading);
        console.log("mounting");
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
        setIsLoading((loading) => !loading);

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

        setIsLoading((loading) => !loading);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  async function handleRemoveTask(task) {
    try {
      setIsLoading((loading) => !loading);

      const accessToken = await getAccessTokenSilently();
      await taskAPI().delete(task._id, accessToken);
      setTasks((previousTasks) => {
        return previousTasks.filter(
          (currentTask) => currentTask._id !== task._id
        );
      });

      setIsLoading((loading) => !loading);
    } catch (error) {
      console.log("handleRemoveTask error: ", error);
    }
  }

  function createPendingTasksTable(tasks) {
    const filteredTasks = tasks.filter((task) => !task.completed);
    const sortedTasks = filteredTasks.sort(
      (task1, task2) => task1.dueDate - task2.dueDate
    );

    const data = sortedTasks.map((task) => {
      return {
        _id: task._id,
        subject: task.subject,
        dueDate: task.dueDate,
        actions: (
          <TaskActionsToolBar
            task={task}
            handleCompleteTask={handleCompleteTask}
            handleRemoveTask={handleRemoveTask}
          />
        )
      };
    });

    return (
      <>
        {data.length > 0 && (
          <TasksTable data={data} handleUpdateTask={handleUpdateTask} />
        )}
      </>
    );
  }

  async function updateTask(task, taskId) {
    const accessToken = await getAccessTokenSilently();
    await taskAPI().update(task, taskId, accessToken);

    setTasks((previousTasks) => {
      return previousTasks.map((currentTask) => {
        if (currentTask._id === taskId) {
          return { ...currentTask, ...task };
        }
        return currentTask;
      });
    });
  }

  async function handleUpdateTask(task) {
    try {
      setIsLoading((loading) => !loading);

      updateTask(task, task._id);

      setIsLoading((loading) => !loading);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function handleCompleteTask(task) {
    try {
      setIsLoading((loading) => !loading);

      task.completed = true;

      updateTask(task, task._id);

      setIsLoading((loading) => !loading);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <Spinner active={isLoading}>
      <Card>
        <Card.Header className="text-center">TO DO LIST</Card.Header>
        {createPendingTasksTable(tasks)}
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
    </Spinner>
  );
}
