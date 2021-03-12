import {useEffect} from "react";
import Card from "react-bootstrap/Card";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";
import Spinner from "../Spinner";
import TasksTable from "./TasksTable";
import ToDoAccordion from "./ToDoAccordion";
import React from "react"
import {useTasks, useLoading, createPendingTasksRows, tasksDataBase} from "./ToDoListLogic"

export default function ToDoList() {
    const {getAccessTokenSilently} = useAuth0();
    const {getAllTasksDB, saveTaskDB, removeTaskDB, updateTaskDB} = tasksDataBase();
    const {tasks, addTask, addTasks, removeTask, updateTask} = useTasks();
    const {loading, startLoading, endLoading} = useLoading();

    useEffect(() => {
        async function init() {
            try {
                startLoading();

                const fetchedTasks = await getAllTasksDB(getAccessTokenSilently);
                addTasks(fetchedTasks);

                endLoading();
            } catch (error) {
                console.log("error: ", error);
            }
        }

        init();
    }, [getAccessTokenSilently]);

    async function onSubmitTask(values, {setSubmitting, resetForm}) {
        try {
            setSubmitting(true);
            startLoading();

            const {subject, dueDate} = values;
            const task = {subject, dueDate, completed: false};

            console.log("task: ", task);
            const createdTask = await saveTaskDB(task, getAccessTokenSilently);
            addTask(createdTask);

            resetForm();

            endLoading();
            setSubmitting(true);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async function handleRemoveTask(task) {
        try {
            startLoading();

            await removeTaskDB(task._id, getAccessTokenSilently);
            removeTask(task._id);

            endLoading();
        } catch (error) {
            console.log("handleRemoveTask error: ", error);
        }
    }

    async function handleUpdateTask(task) {
        try {
            startLoading();

            await updateTaskDB(task, task._id, getAccessTokenSilently);
            updateTask(task, task._id);

            endLoading();
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async function handleCompleteTask(task) {
        try {
            startLoading();

            task.completed = true;

            await updateTaskDB(task, task._id, getAccessTokenSilently);
            updateTask(task, task._id);

            endLoading();
        } catch (error) {
            console.log("error: ", error);
        }
    }

    function createPendingTasksTable(tasks) {
        const filteredTasks = tasks.filter((task) => !task.completed);
        const sortedTasks = filteredTasks.sort(
            (task1, task2) => task1.dueDate - task2.dueDate
        );

        const data = createPendingTasksRows(sortedTasks, handleCompleteTask, handleRemoveTask);

        return (
            <>
                {data.length > 0 && (
                    <TasksTable data={data} handleUpdateTask={handleUpdateTask}/>
                )}
            </>
        );
    }

    return (
        <Spinner active={loading}>
            <Card>
                <Card.Header className="text-center">TO DO LIST</Card.Header>
                {createPendingTasksTable(tasks)}
                <ToDoAccordion
                    tasks={tasks}
                    onSubmitTask={onSubmitTask}
                />
                <Card.Footer className="text-center">
                    <LogoutButton/>
                </Card.Footer>
            </Card>
        </Spinner>
    );
}
