import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/Home/Home';
import Login from './pages/Login/Login';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import CourseDetail from './components/CourseDetail/CourseDetail';
import Courses from './pages/Courses/Courses';
import Blogs from './pages/Blogs/Blogs';
import BlogDetail from './components/BlogDetail/BlogDetail';
import Tests from './pages/Tests/Tests';
import MyCourses from './components/Dashboard/Student/MyCourses';
import StudentDashboard from './components/Dashboard/Student/Dashboard';
import AdminDashboard from './components/Dashboard/Admin/Dashboard';
import ContactUs from './pages/ContactUs/ContactUs';
import DragDrop from './components/Exam-Create/DragDrop';
import ProtectedRoute from './components/ProtectedRoute';
import ExamCreator from './pages/Exam-Creator/ExamCreator';
import ExamReading from './components/Exam-Create/ExamReading';
import ExamListening from './components/Exam-Create/ExamListening';
import Course from './components/Dashboard/Admin/Course';
import Exam from './components/Dashboard/Admin/Exam';
import LiveClass from './components/Dashboard/Admin/LiveClass';
import Package from './components/Dashboard/Admin/Package';
import User from './components/Dashboard/Admin/User';
import Counselling from './components/Dashboard/Admin/Counselling';
import AdminProfile from './components/Dashboard/Admin/Profile';
import StudentProfile from './components/Dashboard/Student/Profile';
import StudentSettings from './components/Dashboard/Student/Setting/Settings';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  return (
    <>
      <ToastContainer
        limit={1}
        theme='colored'
        position='top-center'
        autoClose={3000}
        style={{
          fontSize: '14px',
          width: 'auto',
          fontWeight: '600',
        }}
      />
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
        <Route
          path="/course-detail/:courseId"
          element={<ProtectedRoute element={CourseDetail} />}
        /> */}
          <Route path='/courses' element={<Courses />} />
          <Route path='/course-detail/:courseId' element={<CourseDetail />} />
          <Route
            path='/course-lessons/:courseId'
            element={<ProtectedRoute element={MyCourses} />}
          />
          <Route
            path='/create-course'
            element={<ProtectedRoute element={CreateCourse} />}
          />
          <Route path='/tests' element={<ProtectedRoute element={Tests} />} />
          <Route path='/blogs' element={<ProtectedRoute element={Blogs} />} />
          <Route
            path='/blog-detail'
            element={<ProtectedRoute element={BlogDetail} />}
          />
          <Route
            path='/dashboard/admin-dashboard'
            element={<ProtectedRoute element={AdminDashboard} />}
          />
          <Route
            path='/dashboard/admin-course'
            element={<ProtectedRoute element={Course} />}
          />
          <Route
            path='/dashboard/admin-exam'
            element={<ProtectedRoute element={Exam} />}
          />
          <Route
            path='/dashboard/admin-liveClass'
            element={<ProtectedRoute element={LiveClass} />}
          />
          <Route
            path='/dashboard/admin-package'
            element={<ProtectedRoute element={Package} />}
          />
          <Route
            path='/dashboard/admin-user'
            element={<ProtectedRoute element={User} />}
          />
          <Route
            path='/dashboard/admin-counselling'
            element={<ProtectedRoute element={Counselling} />}
          />
          <Route
            path='/dashboard/admin-profile'
            element={<ProtectedRoute element={AdminProfile} />}
          />
          <Route
            path='/dashboard/student-dashboard'
            element={<ProtectedRoute element={StudentDashboard} />}
          />
          {/* <Route
            path='/dashboard/student-my-courses'
            element={<ProtectedRoute element={MyCourses} />}
          /> */}
          <Route
            path='/contactUs'
            element={<ProtectedRoute element={ContactUs} />}
          />
          <Route
            path='/exam-create'
            element={<ProtectedRoute element={DragDrop} />}
          />
          <Route
            path='/exam-creator'
            element={<ProtectedRoute element={ExamCreator} />}
          />
          <Route
            path='/exam-reading'
            element={<ProtectedRoute element={ExamReading} />}
          />
          <Route
            path='/exam-listening'
            element={<ProtectedRoute element={ExamListening} />}
          />
          <Route path="/dashboard/student-profile" element={<StudentProfile />} />
          <Route path="/dashboard/student-settings" element={<StudentSettings />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
