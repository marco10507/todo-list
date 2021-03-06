import ListGroup from "react-bootstrap/esm/ListGroup";
import React from "react"

export default function CompletedTaskList(props) {
    const {tasks} = props;
    const taskStyle = {
        textDecoration: "line-through",
        color: "#A9A9A9"
    };

    function createCompletedTask(task) {
        return (
            <ListGroup.Item key={task._id}>
                <span style={taskStyle}>{task.subject}</span>
            </ListGroup.Item>
        );
    }

    function createCompletedTasks(tasks) {
        const filteredTasks = tasks.filter((task) => {
            return task.completed;
        });

        return filteredTasks.map((task) => createCompletedTask(task));
    }

    return <ListGroup variant="flush">{createCompletedTasks(tasks)}</ListGroup>;
}
