import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout/Checkout";

//-------------------------> pages <--------------------------------------------

// import Main from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ContactUs from "./pages/ContactUs/ContactUs";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import TermsAndService from "./pages/TermsAndService/TermsAndService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
// import Courses from "./pages/Courses/Courses";
// import CourseDetail from "./components/CourseDetail/CourseDetail";

// Tailwind components
import HomePage from "./tailwind_components/HomePage";
import Layout from "./tailwind_components/Layout/Layout";
import CoursesPage from "./tailwind_components/Course/CoursesPage";
import AboutUsPage from "./tailwind_components/AboutUs/AboutUsPage";
import WhyChooseUsPage from "./tailwind_components/WhyChooseUs/WhyChooseUsPage";
import BlogsPage from "./tailwind_components/Blog/BlogsPage";
import TalkToUsPage from "./tailwind_components/ContactUs/TalkToUsPage";
import BecomeAPartnerPage from "./tailwind_components/BecomePartner/BecomeAPartnerPage";
import CourseDetailPage from "./tailwind_components/Course/CourseDetailPage";
import IELTSCoursePage from "./tailwind_components/Ielts/IELTSCoursePage";
import EnglishTest from "./tailwind_components/EnglishTest/EnglishTest";
import AuthPage from "./tailwind_components/Login/AuthPage";
import BlogDetails from "./tailwind_components/Blog/BlogDetail";
import IeltsCourseDetail from "./tailwind_components/Ielts/IeltsCourseDetails";

//-------------------------> Error Page <----------------------------------

import ErrorPage from "./pages/ErrorPage/ErrorPage";

//-------------------------> layout <--------------------------------------

import StudentNavBarRoute from "./layout/StudentNavBarRoute";
import AdminNavBarRoute from "./layout/AdminNavBarRoute";

//-----------------------> Student <----------------------------------------------

import Dashboard from "./components/Dashboard/Student/Dashboard/Dashboard";
import SProfile from "./components/Dashboard/Student/Profile";
import MyCourse from "./components/Dashboard/Student/MyCourse/MyCourse";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
// import CourseContent from "./components/Dashboard/Student/MyCourse/Content/CourseContent";
import SPaperTest from "./components/Dashboard/Student/PaperTest/PaperTest";
import FreeDiagnosticTest from "./components/Dashboard/Student/FreeDiagnosticTest/FreeDiagnosticTest";
import FreeMiniTest from "./components/Dashboard/Student/FreeMiniTest/FreeMiniTest";
import MockTest from "./components/Dashboard/Student/MockTest/MockTest";
import PracticeTest from "./components/Dashboard/Student/PracticeTest/PracticeTest";
import FullLengthTest from "./components/Dashboard/Student/FullLengthTest/FullLengthTest";
import SLiveClass from "./components/Dashboard/Student/LiveClass/LiveClass";
import RecordedClasses from "./components/Dashboard/Student/RecordedClasses/RecordedClasses";
import SFlashCard from "./components/Dashboard/Student/FlashCard/FlashCard";
import SSettings from "./components/Dashboard/Student/Setting/Settings";
import SResources from "./components/Dashboard/Student/Resources/Resources";
import Report from "./components/Dashboard/Student/Report/Report";

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
import PaperTest from "./components/Dashboard/Admin/PaperTest/PaperTest";
import Gamification from "./components/Dashboard/Admin/Gamification/Gamification";
import Notice from "./components/Dashboard/Admin/Notice/Notice";
import AProfile from "./components/Dashboard/Admin/Profile";
import Resources from "./components/Dashboard/Admin/Resources/Resources";
import Testimonial from "./components/Dashboard/Admin/Testimonial/Testimonial";
import Coupon from "./components/Dashboard/Admin/Coupon/Coupon";
import ALesson from "./components/Dashboard/Admin/Lesson/Lesson";

//------------------------> Exam <------------------------------------------

import DragDrop from "./components/Exam-Create/DragDrop";
import ExamReading from "./components/Exam-Create/ExamReading";
import ExamWriting from "./components/Exam-Create/ExamWriting";
import ExamListening from "./components/Exam-Create/ExamListening";
import ExamSpeaking from "./components/Exam-Create/ExamSpeaking";
import LiveExam from "./components/LiveExam/LiveExam";
import GeneralMTExam from "./components/General/GeneralMT/GeneralMTExam";
import GeneralPTExam from "./components/General/GeneralPT/GeneralPTExam";
import LiveAssignment from "./components/LiveAssignment/LiveAssignment";
import PracticeLiveExam from "./components/LiveExam/PracticeLiveTest";
import FullLengthLiveExam from "./components/LiveExam/FullLengthLiveTest";
import DiagnosticTest from "./components/Dashboard/Student/FreeDiagnosticTest/DiagnosticTest";
import EnglishLevelTest from "./components/Dashboard/Student/EnglishLevelTest/EnglishLevelTest";

//------------------------> Exam Answer <------------------------------------
import Answer from "./components/Exam-Answer/Answer";
import GeneralMTAnswer from "./components/General/GeneralMT/GeneralMTAnswer";
import GeneralPTAnswer from "./components/General/GeneralPT/GeneralPTAnswer";
import PracticeTestAnswer from "./components/Exam-Answer/PTAnswer/PracticeTestAnswer";
import FullLengthTestAnswer from "./components/Exam-Answer/FLTAnswer/FullLengthTestAnswer";
import LiveSpeakingExam from "./components/LiveExam/LiveSpeakingTest";
import LiveAssignmentAnswer from "./components/LiveAssignment/LiveAssignmentAnswer";
import PracticeSpeakingLiveExam from "./components/LiveExam/SpeakingPracticeTest";
import ViewMTAAssessment from "./components/Dashboard/Student/Assessment/MTAssessment/ViewMTAAssessment";
import DiagnosticTestAnswer from "./components/Dashboard/Student/FreeDiagnosticTest/DiagnosticTestAnswer";
import ViewPTAssessment from "./components/Dashboard/Student/Assessment/PTAssessment/ViewPTAssessment";
import PracticeTestReport from "./components/Report/PracticeTestReport";
import FLTReport from "./components/Report/FLTReport";
import Progress from "./components/Dashboard/Student/Progress/Progress";
import withBootstrap from "./layout/BootstrapStyles";

const App = () => {
  return (
    <>
      <div>
        <ToastContainer
          limit={1}
          theme="colored"
          position="top-center"
          autoClose={3000}
          className="toast-container"
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/ielts" element={<IELTSCoursePage />} />
            <Route path="/ielts/:id" element={<IeltsCourseDetail />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/talk-to-us" element={<TalkToUsPage />} />
            <Route path="/become-a-partner" element={<BecomeAPartnerPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/english-test" element={<EnglishTest />} />
          </Route>

          <Route element={<AdminNavBarRoute isProtected={true} />}>
            <Route
              path="/admin-dashboard"
              Component={withBootstrap(ADashboard)}
            />
            <Route path="/admin-student" Component={withBootstrap(Student)} />
            <Route path="/admin-package" Component={withBootstrap(Package)} />
            <Route path="/admin-course" Component={withBootstrap(Course)} />
            <Route path="/admin-exam" Component={withBootstrap(Exam)} />
            <Route
              path="/admin-liveClass"
              Component={withBootstrap(LiveClass)}
            />
            <Route path="/admin-batch" Component={withBootstrap(Batch)} />
            <Route path="/admin-badges" Component={withBootstrap(Badge)} />
            <Route
              path="/admin-flashCard"
              Component={withBootstrap(FlashCard)}
            />
            <Route
              path="/admin-paperTest"
              Component={withBootstrap(PaperTest)}
            />
            <Route
              path="/admin-gamification"
              Component={withBootstrap(Gamification)}
            />
            <Route path="/admin-notice" Component={withBootstrap(Notice)} />
            <Route
              path="/admin-resources"
              Component={withBootstrap(Resources)}
            />
            <Route path="/admin-lesson" Component={withBootstrap(ALesson)} />
            <Route path="/admin-coupon" Component={withBootstrap(Coupon)} />
            <Route
              path="/admin-testimonial"
              Component={withBootstrap(Testimonial)}
            />
            <Route path="/admin-profile" Component={withBootstrap(AProfile)} />
            <Route
              path="/admin-exam/:examType"
              Component={withBootstrap(Exam)}
            />
            <Route
              path="/admin-exam/:examType/:examForm"
              Component={withBootstrap(Exam)}
            />
          </Route>
          <Route element={<StudentNavBarRoute isProtected={true} />}>
            <Route
              path="/freeDiagnosticTest"
              Component={withBootstrap(FreeDiagnosticTest)}
            />
            <Route
              path="/freeMiniTest"
              Component={withBootstrap(FreeMiniTest)}
            />
            <Route
              path="/studentDashboard"
              Component={withBootstrap(Dashboard)}
            />
            <Route path="/progress" Component={withBootstrap(Progress)} />
            <Route path="/studentProfile" Component={withBootstrap(SProfile)} />
            <Route
              path="/studentMyCourse"
              Component={withBootstrap(MyCourse)}
            />
            <Route
              path="/courseLessons/:courseId"
              Component={withBootstrap(Lesson)}
            />
            <Route path="/paperTest" Component={withBootstrap(SPaperTest)} />
            <Route path="/mockTest" Component={withBootstrap(MockTest)} />
            <Route
              path="/practiceTest"
              Component={withBootstrap(PracticeTest)}
            />
            <Route
              path="/fullLengthTest"
              Component={withBootstrap(FullLengthTest)}
            />
            <Route
              path="/diagnosticTest"
              Component={withBootstrap(EnglishLevelTest)}
            />
            <Route
              path="/studentLiveClasses"
              Component={withBootstrap(SLiveClass)}
            />
            <Route
              path="/recordedClasses"
              Component={withBootstrap(RecordedClasses)}
            />
            <Route path="/flashcard" Component={withBootstrap(SFlashCard)} />
            <Route path="/resources" Component={withBootstrap(SResources)} />
            <Route
              path="/studentSettings"
              Component={withBootstrap(SSettings)}
            />
            <Route path="/reports" Component={withBootstrap(Report)} />

            <Route path="/exam-create" Component={withBootstrap(DragDrop)} />
            <Route path="/Reading" Component={withBootstrap(ExamReading)} />
            <Route path="/Listening" Component={withBootstrap(ExamListening)} />
            <Route path="/Writing" Component={withBootstrap(ExamWriting)} />
            <Route path="/Speaking" Component={withBootstrap(ExamSpeaking)} />
            <Route
              path="/diagnostic-test-answer/:examId"
              Component={withBootstrap(DiagnosticTestAnswer)}
            />
            <Route
              path="/live-assignment-answer/:examId"
              Component={withBootstrap(LiveAssignmentAnswer)}
            />
            <Route
              path="/general-practice-test-answer/:examId"
              Component={withBootstrap(GeneralPTAnswer)}
            />
            <Route
              path="/general-exam-answer/:examId"
              Component={withBootstrap(GeneralMTAnswer)}
            />
            <Route
              path="/exam-answer/:examId"
              Component={withBootstrap(Answer)}
            />
            <Route
              path="/exam-practice-test-answer/:examId"
              Component={withBootstrap(PracticeTestAnswer)}
            />
            <Route
              path="/exam-fulllength-answer/:examId"
              Component={withBootstrap(FullLengthTestAnswer)}
            />
            <Route
              path="/assessment/:examId"
              Component={withBootstrap(ViewMTAAssessment)}
            />
            <Route
              path="/practice-assessment/:examId"
              Component={withBootstrap(ViewPTAssessment)}
            />
            <Route
              path="/praticeTestReport"
              Component={withBootstrap(PracticeTestReport)}
            />
            <Route
              path="/fullLengthTestReport"
              Component={withBootstrap(FLTReport)}
            />
            <Route path="/checkout" Component={withBootstrap(Checkout)} />
          </Route>

          <Route element={<StudentNavBarRoute isProtected={false} />}>
            {/* <Route path="/" element={<Main />} /> */}
            <Route path="/login" Component={withBootstrap(Login)} />
            <Route path="/talk-to-us" element={withBootstrap(ContactUs)} />
            <Route
              path="/forgot-password"
              element={withBootstrap(ForgotPassword)}
            />
            <Route
              path="/privacy-policy"
              element={
                <ProtectedRoute element={withBootstrap(PrivacyPolicy)} />
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <ProtectedRoute element={withBootstrap(TermsAndService)} />
              }
            />
            <Route path="*" element={withBootstrap(ErrorPage)} />
          </Route>

          <Route
            path="/diagnostic-test/:examId"
            Component={withBootstrap(DiagnosticTest)}
          />
          <Route
            path="/general-practice-live-exam/:examType/:examForm/:examId"
            Component={withBootstrap(GeneralPTExam)}
          />
          <Route
            path="/general-exam/:examType/:examId"
            Component={withBootstrap(GeneralMTExam)}
          />
          <Route
            path="/assignment/:examType/:examId"
            Component={withBootstrap(LiveAssignment)}
          />
          <Route
            path="/fulllength-live-exam/:examId"
            Component={withBootstrap(FullLengthLiveExam)}
          />
          <Route
            path="/live-exam/:examType/:examId"
            Component={withBootstrap(LiveExam)}
          />
          <Route
            path="/live-speaking-exam/:examType/:examId"
            Component={withBootstrap(LiveSpeakingExam)}
          />
          <Route
            path="/practice-live-exam/:examType/:examForm/:examId"
            Component={withBootstrap(PracticeLiveExam)}
          />
          <Route
            path="/practice-speaking-live-exam/:examType/:examForm/:examId"
            Component={withBootstrap(PracticeSpeakingLiveExam)}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
