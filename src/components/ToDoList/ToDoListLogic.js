import React, {useState} from "react";
import moment from "moment";
import taskAPI from "../../api/TaskApi";
import TaskActionsToolBar from "./TaskActionsToolBar";

export const useTask = () => {
    const [task, setTask] = useState({
        subject: "",
        completed: false,
        dueDate: moment()
    });

    return {task, setTask};
};

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    function addTask(task) {
        setTasks((previousTasks) => {
            return [...previousTasks, task];
        });
    }

    function addTasks(tasks) {
        setTasks((previousTasks) => {
            return [...previousTasks, ...tasks];
        });
    }

    function removeTask(taskId) {
        setTasks((previousTasks) => {
            return previousTasks.filter(
                (currentTask) => currentTask._id !== taskId
            );
        });
    }

    function updateTask(task, taskId) {
        setTasks((previousTasks) => {
            return previousTasks.map((currentTask) => {
                if (currentTask._id === taskId) {
                    return {...currentTask, ...task};
                }
                return currentTask;
            });
        });
    }

    return {tasks, addTask, addTasks, removeTask, updateTask, setTasks};
};

export const useLoading = () => {
    const [loading, setLoading] = useState(true);

    function startLoading() {
        setLoading(true);
    }

    function endLoading() {
        setLoading(false);
    }

    return {loading, startLoading, endLoading};
};

export function tasksDataBase() {
    async function getAllTasksDB(getAccessTokenSilently) {
        const accessToken = await getAccessTokenSilently();
        const response = await taskAPI().getAll(accessToken);

        return response.data;
    }

    async function saveTaskDB(task, getAccessTokenSilently) {
        const accessToken = await getAccessTokenSilently();
        const response = await taskAPI().save(task, accessToken);

        return response.data;
    }

    async function removeTaskDB(taskId, getAccessTokenSilently) {
        const accessToken = await getAccessTokenSilently();
        await taskAPI().delete(taskId, accessToken);
    }

    async function updateTaskDB(task, taskId, getAccessTokenSilently) {
        const accessToken = await getAccessTokenSilently();
        await taskAPI().update(task, taskId, accessToken);
    }

    return {getAllTasksDB, saveTaskDB, removeTaskDB, updateTaskDB};
}

export function createPendingTasksRows(tasks, handleCompleteTask, handleRemoveTask) {
    return tasks.map((task) => {
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
}


