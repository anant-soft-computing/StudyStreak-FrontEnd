import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Courses from "./pages/Courses/Courses";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import Tests from "./pages/Tests/Tests";
import MyCourses from "./components/Dashboard/Student/MyCourses";
import Dashboard from "./components/Dashboard/Student/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-detail" element={<CourseDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/dashboard/student-my-courses" element={<MyCourses />} />
        <Route path="/dashboard/student-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
