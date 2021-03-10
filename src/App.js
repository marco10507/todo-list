import "bootstrap/dist/css/bootstrap.min.css";
import { Switch } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import ProtectedRoute from "./auth/protected-route";
import React from "react";

export default function App() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={ToDoList} />
    </Switch>
  );
}
