import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import TaskList from "./views/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth view={<LoginForm />} />} />
        <Route path="/register" element={<Auth view={<RegisterForm />} />} />
        <Route path="/task-list" element={<Dashboard view={<TaskList />} />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
