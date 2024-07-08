import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import SDashboard from "./components/Dashboard/Student/Dashboard/SDashboard";
import SProfile from "./components/Dashboard/Student/Profile";
import MyCourse from "./components/Dashboard/Student/MyCourse/MyCourse";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
import CourseContent from "./components/Dashboard/Student/MyCourse/Content/CourseContent";
import MockTest from "./components/Dashboard/Student/MockTest/MockTest";
import PracticeTest from "./components/Dashboard/Student/PracticeTest/PracticeTest";
import FullLengthTest from "./components/Dashboard/Student/FullLengthTest/FullLengthTest";
import SLiveClass from "./components/Dashboard/Student/LiveClass/LiveClass";
import SFlashCard from "./components/Dashboard/Student/FlashCard/FlashCard";
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
import Notice from "./components/Dashboard/Admin/Notice/Notice";
import AProfile from "./components/Dashboard/Admin/Profile";

//------------------------> Exam <------------------------------------------

import DragDrop from "./components/Exam-Create/DragDrop";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamWriting from "./components/Exam-Create/ExamWriting";
import ExamListening from "./components/Exam-Create/ExamListening";
import ExamSpeaking from "./components/Exam-Create/ExamSpeaking";
import LiveExam from "./components/LiveExam/LiveExam";
import LiveAssignment from "./components/LiveAssignment/LiveAssignment";
import PracticeLiveExam from "./components/LiveExam/PracticeLiveTest";
import PracticeWritingExam from "./components/LiveExam/PracticeWritingExam";
import FullLengthLiveExam from "./components/LiveExam/FullLengthLiveTest";
import GmatLiveMockTest from "./components/LiveExam/GmatLiveMockTest";

//------------------------> Exam Answer <------------------------------------
import Answer from "./components/Exam-Answer/Answer";
import PracticeTestAnswer from "./components/Exam-Answer/PracticeTestAnswer";
import FullLengthTestAnswer from "./components/Exam-Answer/FullLengthTestAnswer";
import LiveSpeakingExam from "./components/LiveExam/LiveSpeakingTest";
import LiveAssignmentAnswer from "./components/LiveAssignment/LiveAssignmentAnswer";
import PracticeSpeakingLiveExam from "./components/LiveExam/SpeakingPracticeTest";
import ViewMTAAssessment from "./components/Dashboard/Student/Assessment/MTAssessment/ViewMTAAssessment";
import StudentNavBarRoute from "./layout/StudentNavBarRoute";
import AdminNavBarRoute from "./layout/AdminNavBarRoute";
import ViewPTAssessment from "./components/Dashboard/Student/Assessment/PTAssessment/ViewPTAssessment";

const App = () => {
  return (
    <div>
      <ToastContainer
        limit={1}
        theme="colored"
        position="top-center"
        autoClose={3000}
        className="toast-container"
      />
      <Routes>
        <Route element={<AdminNavBarRoute isProtected={true} />}>
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
          <Route path="/admin-notice" element={<Notice />} />
          <Route path="/admin-profile" element={<AProfile />} />
          <Route path="/admin-exam/:examType" element={<Exam />} />
          <Route path="/admin-exam/:examType/:examForm" element={<Exam />} />
        </Route>

        <Route element={<StudentNavBarRoute isProtected={true} />}>
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
          <Route path="/flashcard" element={<SFlashCard />} />
          <Route path="/studentSettings" element={<SSettings />} />

          <Route path="/courseDetail/:courseId" element={<CourseDetail />} />

          <Route path="/exam-create" element={<DragDrop />} />
          <Route path="/Reading" element={<ExamReading />} />
          <Route path="/Listening" element={<ExamListening />} />
          <Route path="/Writing" element={<ExamWriting />} />
          <Route path="/Speaking" element={<ExamSpeaking />} />

          <Route
            path="/practice-live-writing-exam/:examType/:examForm/:examId"
            element={<PracticeWritingExam />}
          />
          <Route
            path="/gmat-live-mock-test/:examId"
            element={<GmatLiveMockTest />}
          />
          <Route
            path="/live-assignment-answer/:examId"
            element={<LiveAssignmentAnswer />}
          />
          <Route path="/exam-answer/:examId" element={<Answer />} />
          <Route
            path="/exam-practice-test-answer/:examId"
            element={<PracticeTestAnswer />}
          />
          <Route
            path="/assessment/:examId"
            element={<ViewMTAAssessment />}
          />
          <Route
            path="/practice-assessment/:examId"
            element={<ViewPTAssessment />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route element={<StudentNavBarRoute isProtected={false} />}>
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
          <Route
            path="/courses"
            element={<ProtectedRoute element={Courses} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route
          path="/assignment/:examType/:examId"
          element={<LiveAssignment />}
        ></Route>

        <Route
          path="/fulllength-live-exam/:examId"
          element={<FullLengthLiveExam />}
        />
        <Route
          path="/exam-fulllength-answer/:examId"
          element={<FullLengthTestAnswer />}
        />
        <Route path="/live-exam/:examType/:examId" element={<LiveExam />} />
        <Route
          path="/live-speaking-exam/:examType/:examId"
          element={<LiveSpeakingExam />}
        />
        <Route
          path="/practice-live-exam/:examType/:examForm/:examId"
          element={<PracticeLiveExam />}
        />
        <Route
          path="/practice-speaking-live-exam/:examType/:examForm/:examId"
          element={<PracticeSpeakingLiveExam />}
        />
      </Routes>
    </div>
  );
};

export default App;