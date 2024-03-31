import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopBar from "./components/TopBar/TopBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout/Checkout";
import CourseDetail from "./components/CourseDetail/CourseDetail";

//-------------------------> pages <--------------------------------------------

import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ContactUs from "./pages/ContactUs/ContactUs";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import TermsAndService from "./pages/TermsAndService/TermsAndService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Courses from "./pages/Courses/Courses";

//-------------------------> Error Page <----------------------------------

import ErrorPage from "./pages/ErrorPage/ErrorPage";

//-----------------------> Student <----------------------------------------------

import SDashboard from "./components/Dashboard/Student/Dashboard/Dashboard";
import SProfile from "./components/Dashboard/Student/Profile";
import MyCourse from "./components/Dashboard/Student/MyCourse/MyCourse";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
import CourseContent from "./components/Dashboard/Student/MyCourse/Content/CourseContent";
import MockTest from "./components/Dashboard/Student/MockTest/MockTest";
import PracticeTest from "./components/Dashboard/Student/PracticeTest/PracticeTest";
import FullLengthTest from "./components/Dashboard/Student/FullLengthTest/FullLengthTest";
import SLiveClass from "./components/Dashboard/Student/LiveClass/LiveClass";
import RegularClass from "./components/Dashboard/Student/RegularClass/RegularClass";
import SpeakingPractice from "./components/Dashboard/Student/SpeakingPractice/SpeakingPractice";
import DoubtSolving from "./components/Dashboard/Student/1To1DoubtSolving/DoubtSolving";
import GroupDoubtSolving from "./components/Dashboard/Student/GroupDoubtSolving/GroupDoubtSolving";
import SSettings from "./components/Dashboard/Student/Setting/Settings";

//-----------------> Admin <-----------------------------------------------------

import ADashboard from "./components/Dashboard/Admin/Dashboard";
import Student from "./components/Dashboard/Admin/Student/Student";
import Package from "./components/Dashboard/Admin/Package/Package";
import Course from "./components/Dashboard/Admin/Course/Course";
import Exam from "./components/Dashboard/Admin/Exam/Exam";
import LiveClass from "./components/Dashboard/Admin/LiveClass/LiveClass";
import Batch from "./components/Dashboard/Admin/Batch/Batch";
import Badge from "./components/Dashboard/Admin/Badge/Badge";
import FlashCard from "./components/Dashboard/Admin/FlashCard/FlashCard";
import Gamification from "./components/Dashboard/Admin/Gamification/Gamification";
import AProfile from "./components/Dashboard/Admin/Profile";

//------------------------> Exam <------------------------------------------

import DragDrop from "./components/Exam-Create/DragDrop";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamWriting from "./components/Exam-Create/ExamWriting";
import ExamListening from "./components/Exam-Create/ExamListening";
import ExamSpeaking from "./components/Exam-Create/ExamSpeaking";
import LiveExam from "./components/LiveExam/LiveExam";
import PracticeLiveExam from "./components/LiveExam/PracticeLiveTest";
import PracticeWritingExam from "./components/LiveExam/PracticeWritingExam";
import FullLengthLiveExam from "./components/LiveExam/FullLengthLiveTest";
import GmatLiveMockTest from "./components/LiveExam/GmatLiveMockTest";

//------------------------> Exam Answer <------------------------------------
import Answer from "./components/Exam-Answer/Answer";
import PracticeTestAnswer from "./components/Exam-Answer/PracticeTestAnswer";
import MobileTopBar from "./components/TopBar/MobileTopBar";

const App = () => {
  return (
    <div>
      <div className="fixing-navbar-at-top-side">
        <TopBar />
        <NavBar />
        <MobileTopBar />
      </div>
      <ToastContainer
        limit={1}
        theme="colored"
        position="top-center"
        autoClose={3000}
        className="toast-container"
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contactUs"
          element={<ProtectedRoute element={ContactUs} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/privacy-policy"
          element={<ProtectedRoute element={PrivacyPolicy} />}
        />
        <Route
          path="/terms-of-service"
          element={<ProtectedRoute element={TermsAndService} />}
        />
        <Route path="/courses" element={<ProtectedRoute element={Courses} />} />

        <Route path="*" element={<ErrorPage />} />

        <Route
          path="/studentDashboard"
          element={<ProtectedRoute element={SDashboard} />}
        />
        <Route path="/studentProfile" element={<SProfile />} />
        <Route path="/studentMyCourse" element={<MyCourse />} />
        <Route path="/courseLessons/:courseId" element={<Lesson />} />
        <Route path="/course/:courseId" element={<CourseContent />} />
        <Route path="/mockTest" element={<MockTest />} />
        <Route path="/practiceTest" element={<PracticeTest />} />
        <Route path="/fullLengthTest" element={<FullLengthTest />} />
        <Route path="/studentLiveClasses" element={<SLiveClass />} />
        <Route path="/regularClasses" element={<RegularClass />} />
        <Route path="/speakingSolving" element={<SpeakingPractice />} />
        <Route path="/doubtSolving" element={<DoubtSolving />} />
        <Route path="/groupDoubtSolving" element={<GroupDoubtSolving />} />
        <Route path="/studentSettings" element={<SSettings />} />

        <Route path="/courseDetail/:courseId" element={<CourseDetail />} />

        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={ADashboard} />}
        />
        <Route path="/admin-student" element={<Student />} />
        <Route path="/admin-package" element={<Package />} />
        <Route path="/admin-course" element={<Course />} />
        <Route path="/admin-exam" element={<Exam />} />
        <Route path="/admin-liveClass" element={<LiveClass />} />
        <Route path="/admin-batch" element={<Batch />} />
        <Route path="/admin-badges" element={<Badge />} />
        <Route path="/admin-flashCard" element={<FlashCard />} />
        <Route path="/admin-gamification" element={<Gamification />} />
        <Route path="/admin-profile" element={<AProfile />} />

        <Route path="/exam-create" element={<DragDrop />} />
        <Route path="/Reading" element={<ExamReading />} />
        <Route path="/Listening" element={<ExamListening />} />
        <Route path="/Writing" element={<ExamWriting />} />
        <Route path="/Speaking" element={<ExamSpeaking />} />
        <Route path="/live-exam/:examId" element={<LiveExam />} />
        <Route
          path="/practice-live-exam/:examType/:examForm/:examId"
          element={<PracticeLiveExam />}
        />
        <Route
          path="/practice-live-writing-exam/:examType/:examForm/:examId"
          element={<PracticeWritingExam />}
        />
        <Route
          path="/fulllength-live-exam/:examId"
          element={<FullLengthLiveExam />}
        />
        <Route
          path="/gmat-live-mock-test/:examId"
          element={<GmatLiveMockTest />}
        />

        <Route path="/eaxm-answere/:examId" element={<Answer />} />
        <Route
          path="/eaxm-practice-test-answere/:examId"
          element={<PracticeTestAnswer />}
        />

        <Route path="/admin-exam/:examType" element={<Exam />} />
        <Route path="/admin-exam/:examType/:examForm" element={<Exam />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
