
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";


// import MyTasks from "./pages/MyTasks";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";
import MyApplications from "./pages/MyApplications";
import MyTasks from "./pages/MyTasks";
import Applicants from "./pages/Applicants";

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}

      />

      <Route
        path="/task/:id"
        element={<TaskDetails />}
      />

      <Route
        path="/create-task"
        element={<CreateTask />}
      />
      <Route
        path="/my-applications"
        element={<MyApplications />}
      />

      <Route path="/my-tasks" 
      element={<MyTasks />} />

      <Route path="/applicants/:id"
      element={<Applicants />} />
    </Routes>
  );
}

export default App;