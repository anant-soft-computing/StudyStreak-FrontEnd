import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import Courses from "./components/Courses/Courses";
import CourseDetails from "./components/Courses/CourseDetails";
import CreateCourse from "./components/Courses/CreateCourse";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-course" element={<CreateCourse/>}/>
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details" element={<CourseDetails />} />        
      </Routes>
    </Router>
  );
}

export default App;
