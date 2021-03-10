import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {BsCheck, BsX} from "react-icons/bs";
import React from "react"

export default function TaskActionsToolBar(props) {
    const {
        task,
        handleCompleteTask,
        handleRemoveTask
    } = props;

    return (
        <ButtonToolbar
            className="justify-content-center"
            aria-label="Toolbar with button groups"
        >
            <ButtonGroup size="sm" aria-label="First group">
                <Button className="mr-1" onClick={() => handleCompleteTask(task)}>
                    <BsCheck/>
                </Button>
                <Button onClick={() => handleRemoveTask(task)}>
                    <BsX/>
                </Button>
            </ButtonGroup>
        </ButtonToolbar>
    );
}
