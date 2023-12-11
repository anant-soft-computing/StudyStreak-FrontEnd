import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import Courses from "./components/Courses/Courses";
import CourseDetails from "./components/Courses/CourseDetails";
import CreateCourse from "./components/Courses/CreateCourse";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import MyCourses from "./components/Dashboard/Student/MyCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-course" element={<CreateCourse/>}/>
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details" element={<CourseDetails />} />    
        <Route path="/blogs" element={<Blogs />} /> 
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/dashboard/student-my-courses" element={<MyCourses />} />       
      </Routes>
    </Router>
  );
}

export default App;
