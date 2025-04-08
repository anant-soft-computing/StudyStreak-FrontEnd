import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";

//-------------------------> pages <--------------------------------------------

import Checkout from "./components/Checkout/Checkout";

//-------------------------> Tailwind components <--------------------------------------------
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
import ForgotPasswordPage from "./tailwind_components/Login/ForgotPassword";
import Podcast from "./tailwind_components/Podcast/Podcast";

//-------------------------> Error Page <----------------------------------

import ErrorPage from "./pages/ErrorPage/ErrorPage";

//-------------------------> layout <--------------------------------------

import StudentNavBarRoute from "./layout/StudentNavBarRoute";
import AdminNavBarRoute from "./layout/AdminNavBarRoute";
import TutorNavBarRoute from "./layout/TutorNavBarRoute";

//-----------------------> Student <----------------------------------------------

import Dashboard from "./components/Dashboard/Student/Dashboard/Dashboard";
import PTEDashboard from "./components/Dashboard/Student/PTE/Dashboard/PTEDashboard";
import SProfile from "./components/Dashboard/Student/Profile/Profile";
import MyCourse from "./components/Dashboard/Student/MyCourse/MyCourse";
import Lesson from "./components/Dashboard/Student/Lesson/Lesson";
import CourseContent from "./components/Dashboard/Student/MyCourse/Content/CourseContent";
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
import PTEReading from "./components/Dashboard/Student/PTE/Reading/Reading";
import PTEListening from "./components/Dashboard/Student/PTE/Listening/Listening";
import PTEWriting from "./components/Dashboard/Student/PTE/Writing/Writing";
import PTESpeaking from "./components/Dashboard/Student/PTE/Speaking/Speaking";
import FreeMockTest from "./components/Dashboard/Student/PTE/FreeMockTest/FreeMockTest";

//-----------------> Admin <-----------------------------------------------------

import ADashboard from "./components/Dashboard/Admin/Dashboard/Dashboard";
import Users from "./components/Dashboard/Admin/Users/Users";
import Student from "./components/Dashboard/Admin/Student/Student";
import LiveClassReport from "./components/Dashboard/Admin/LiveClassReport/LiveClassReport";
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
import AProfile from "./components/Dashboard/Admin/Profile/Profile";
import Resources from "./components/Dashboard/Admin/Resources/Resources";
import Testimonial from "./components/Dashboard/Admin/Testimonial/Testimonial";
import Coupon from "./components/Dashboard/Admin/Coupon/Coupon";
import ALesson from "./components/Dashboard/Admin/Lesson/Lesson";

//------------------------> Tutor <------------------------------------------

import TLiveClass from "./components/Dashboard/Tutor/LiveClass/LiveClass";

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
import LivePTERFIB from "./components/Dashboard/Student/PTE/LivePTEExam/Reading/RFIB/LivePTERFIB";
import LivePTEReadingExam from "./components/Dashboard/Student/PTE/LivePTEExam/Reading/LivePTEReadingExam";
import LivePTEWritingExam from "./components/Dashboard/Student/PTE/LivePTEExam/Writing/LivePTEWritingExam";
import LivePTEListeningExam from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/LivePTEListeningExam";
import LivePTESSTExam from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/SST/LivePTESSTExam";
import LivePTEWFDExam from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/WFD/LivePTEWFDExam";
import LivePTESpeakingRAExam from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/ReadAloud/LivePTESpeakingRAExam";
import LivePTESpeakingRSExam from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RepeatSentence/LivePTESpeakingRSExam";
import LivePTESpeakingDIExam from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/DI/LivePTESpeakingDIExam";
import LivePTESpeakingRLExam from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RetellLecture/LivePTESpeakingRLExam";
import LivePTESpeakingASQExam from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/AnswerShortQuestion/LivePTESpeakingASQExam";
import LivePTESpeakingRTS from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RTS/LivePTESpeakingRTS";
import LivePTESpeakingSGD from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/SGD/LivePTESpeakingSGD";
import PTEMockTestLive from "./components/Dashboard/Student/PTE/FreeMockTest/MockTestLive/MockTestLive";

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
import PTEReadingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Reading/PTEReadingAnswer";
import PTEWritingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Writing/PTEWritingAnswer";
import PTESSTAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/SST/PTESSTAnswer";
import PTEWFDAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/WFD/PTEWFDAnswer";
import PTEListeningAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Listening/PTEListeningAnswer";
import PTESpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/PTESpeakingAnswer";
import ASQSpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/AnswerShortQuestion/ASQSpeakingAnswer";
import RASpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/ReadAloud/RASpeakingAnswer";
import RSSpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RepeatSentence/RSSpeakingAnswer";
import DISpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/DI/DISpeakingAnswer";
import RLSpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RetellLecture/RLSpeakingAnswer";
import RTSSpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/RTS/RTSSpekingAnswer";
import SGDSpeakingAnswer from "./components/Dashboard/Student/PTE/LivePTEExam/Speaking/SGD/SGDSpeakingAnswer";
import Progress from "./components/Dashboard/Student/Progress/Progress";
import withBootstrap from "./layout/BootstrapStyles";

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
      <Helmet>
        <title>
          Best Study Abroad Online Exam Preparation Platform | StudyStreak
        </title>
        <meta
          name="description"
          content="Prepare for IELTS & other study abroad online exam with StudyStreak. Get expert guidance and study materials to achieve your global education dreams."
        />
        <meta
          name="keywords"
          content="Study Abroad Online Exam Preparation Platform"
        />
      </Helmet>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:courseId" element={<CourseDetailPage />} />
          <Route path="/ielts" element={<IELTSCoursePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/talk-to-us" element={<TalkToUsPage />} />
          <Route path="/become-a-partner" element={<BecomeAPartnerPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/english-test" element={<EnglishTest />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/podcast" element={<Podcast />} />
        </Route>

        <Route element={<AdminNavBarRoute isProtected={true} />}>
          <Route
            path="/admin-dashboard"
            Component={withBootstrap(ADashboard)}
          />
          <Route path="/admin-users" Component={withBootstrap(Users)} />
          <Route path="/admin-student" Component={withBootstrap(Student)} />
          <Route
            path="/admin-live-class-report"
            Component={withBootstrap(LiveClassReport)}
          />
          <Route path="/admin-package" Component={withBootstrap(Package)} />
          <Route path="/admin-course" Component={withBootstrap(Course)} />
          <Route path="/admin-exam" Component={withBootstrap(Exam)} />
          <Route path="/admin-liveClass" Component={withBootstrap(LiveClass)} />
          <Route path="/admin-batch" Component={withBootstrap(Batch)} />
          <Route path="/admin-badges" Component={withBootstrap(Badge)} />
          <Route path="/admin-flashCard" Component={withBootstrap(FlashCard)} />
          <Route path="/admin-paperTest" Component={withBootstrap(PaperTest)} />
          <Route
            path="/admin-gamification"
            Component={withBootstrap(Gamification)}
          />
          <Route path="/admin-notice" Component={withBootstrap(Notice)} />
          <Route path="/admin-resources" Component={withBootstrap(Resources)} />
          <Route path="/admin-lesson" Component={withBootstrap(ALesson)} />
          <Route path="/admin-coupon" Component={withBootstrap(Coupon)} />
          <Route
            path="/admin-testimonial"
            Component={withBootstrap(Testimonial)}
          />
          <Route path="/admin-profile" Component={withBootstrap(AProfile)} />
          <Route path="/admin-exam/:examType" Component={withBootstrap(Exam)} />
          <Route
            path="/admin-exam/:examType/:examForm"
            Component={withBootstrap(Exam)}
          />
          <Route path="/exam-create" Component={withBootstrap(DragDrop)} />
        </Route>

        <Route element={<TutorNavBarRoute isProtected={true} />}>
          <Route
            path="/tutor-liveClass"
            Component={withBootstrap(TLiveClass)}
          />
        </Route>

        <Route element={<StudentNavBarRoute isProtected={true} />}>
          <Route
            path="/freeDiagnosticTest"
            Component={withBootstrap(FreeDiagnosticTest)}
          />
          <Route path="/freeMiniTest" Component={withBootstrap(FreeMiniTest)} />
          <Route
            path="/studentDashboard"
            Component={withBootstrap(Dashboard)}
          />
          <Route path="/progress" Component={withBootstrap(Progress)} />
          <Route path="/studentProfile" Component={withBootstrap(SProfile)} />
          <Route path="/studentMyCourse" Component={withBootstrap(MyCourse)} />
          <Route
            path="/courseLessons/:courseId"
            Component={withBootstrap(Lesson)}
          />
          <Route
            path="/courseMaterials/:courseId"
            Component={withBootstrap(CourseContent)}
          />
          <Route path="/paperTest" Component={withBootstrap(SPaperTest)} />
          <Route path="/mockTest" Component={withBootstrap(MockTest)} />
          <Route path="/practiceTest" Component={withBootstrap(PracticeTest)} />
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
          <Route path="/studentSettings" Component={withBootstrap(SSettings)} />
          <Route path="/reports" Component={withBootstrap(Report)} />

          <Route path="/Reading" Component={withBootstrap(ExamReading)} />
          <Route path="/Listening" Component={withBootstrap(ExamListening)} />
          <Route path="/Writing" Component={withBootstrap(ExamWriting)} />
          <Route path="/Speaking" Component={withBootstrap(ExamSpeaking)} />
          <Route
            path="/PTE/Dashboard"
            Component={withBootstrap(PTEDashboard)}
          />
          <Route
            path="/PTE/FreeMockTest"
            Component={withBootstrap(FreeMockTest)}
          />
          <Route path="/PTE/Reading" Component={withBootstrap(PTEReading)} />
          <Route
            path="/PTE/Listening"
            Component={withBootstrap(PTEListening)}
          />
          <Route path="/PTE/Writing" Component={withBootstrap(PTEWriting)} />
          <Route path="/PTE/Speaking" Component={withBootstrap(PTESpeaking)} />

          {/*------------------------ Answers Component --------------------- */}

          <Route
            path="/DiagnosticTest/Answer/:examId"
            Component={withBootstrap(DiagnosticTestAnswer)}
          />
          <Route
            path="/Assignment/Answer/:examId"
            Component={withBootstrap(LiveAssignmentAnswer)}
          />
          <Route
            path="/MiniTest/Answer/:examId"
            Component={withBootstrap(Answer)}
          />
          <Route
            path="/MiniTest/Answer/GENERAL/:examId"
            Component={withBootstrap(GeneralMTAnswer)}
          />
          <Route
            path="/PracticeTest/Answer/:examType/:examId"
            Component={withBootstrap(PracticeTestAnswer)}
          />
          <Route
            path="/PracticeTest/Answer/GENERAL/:examId"
            Component={withBootstrap(GeneralPTAnswer)}
          />
          <Route
            path="/FullLengthTest/Answer/:examId"
            Component={withBootstrap(FullLengthTestAnswer)}
          />
          <Route
            path="/MiniTest/Assessment/:examType/:examId"
            Component={withBootstrap(ViewMTAAssessment)}
          />
          <Route
            path="/PracticeTest/Assessment/:examType/:examId"
            Component={withBootstrap(ViewPTAssessment)}
          />
          <Route
            path="/PTE/Reading/:examId"
            Component={withBootstrap(PTEReadingAnswer)}
          />
          <Route
            path="/PTE/Writing/:examId"
            Component={withBootstrap(PTEWritingAnswer)}
          />
          <Route
            path="/PTE/Listening/:examId"
            Component={withBootstrap(PTEListeningAnswer)}
          />
          <Route
            path="/PTE/Listening/SST/:examId"
            Component={withBootstrap(PTESSTAnswer)}
          />
          <Route
            path="/PTE/Listening/WFD/:examId"
            Component={withBootstrap(PTEWFDAnswer)}
          />
          <Route
            path="/PTE/Speaking/:examId"
            Component={withBootstrap(PTESpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/ASQ/:examId"
            Component={withBootstrap(ASQSpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/RA/:examId"
            Component={withBootstrap(RASpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/RS/:examId"
            Component={withBootstrap(RSSpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/DI/:examId"
            Component={withBootstrap(DISpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/RL/:examId"
            Component={withBootstrap(RLSpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/RTS/:examId"
            Component={withBootstrap(RTSSpeakingAnswer)}
          />
          <Route
            path="/PTE/Speaking/SGD/:examId"
            Component={withBootstrap(SGDSpeakingAnswer)}
          />
        </Route>

        <Route element={<StudentNavBarRoute isProtected={false} />}>
          <Route path="/checkout" Component={withBootstrap(Checkout)} />
          <Route path="*" element={withBootstrap(ErrorPage)} />
        </Route>

        {/*------------------------ Exams Component --------------------- */}

        <Route
          path="/DiagnosticTest/:examId"
          Component={withBootstrap(DiagnosticTest)}
        />
        <Route
          path="/Assignment/:examType/:examId"
          Component={withBootstrap(LiveAssignment)}
        />
        <Route
          path="/MiniLiveExam/:examType/:examId"
          Component={withBootstrap(LiveExam)}
        />
        <Route
          path="/Speaking-MiniLiveExam/:examType/:examId"
          Component={withBootstrap(LiveSpeakingExam)}
        />
        <Route
          path="/GENERAL-MiniLiveExam/:examType/:examId"
          Component={withBootstrap(GeneralMTExam)}
        />
        <Route
          path="/PracticeLiveExam/:examType/:examForm/:examId"
          Component={withBootstrap(PracticeLiveExam)}
        />
        <Route
          path="/Speaking-PracticeLiveExam/:examType/:examForm/:examId"
          Component={withBootstrap(PracticeSpeakingLiveExam)}
        />
        <Route
          path="/GENERAL-PracticeLiveExam/:examType/:examForm/:examId"
          Component={withBootstrap(GeneralPTExam)}
        />
        <Route
          path="/FullLengthLiveExam/:examId"
          Component={withBootstrap(FullLengthLiveExam)}
        />
        <Route
          path="/PTE/IELTS/Reading/RFIB/:examId"
          Component={withBootstrap(LivePTERFIB)}
        />
        <Route
          path="/PTE/IELTS/Reading/:examSubcategory/:examId"
          Component={withBootstrap(LivePTEReadingExam)}
        />
        <Route
          path="/PTE/IELTS/Writing/:examSubcategory/:examId"
          Component={withBootstrap(LivePTEWritingExam)}
        />
        <Route
          path="/PTE/IELTS/Listening/:examSubcategory/:examId"
          Component={withBootstrap(LivePTEListeningExam)}
        />
        <Route
          path="/PTE/IELTS/Listening/SST/:examId"
          Component={withBootstrap(LivePTESSTExam)}
        />
        <Route
          path="/PTE/IELTS/Listening/WFD/:examId"
          Component={withBootstrap(LivePTEWFDExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/RA/:examId"
          Component={withBootstrap(LivePTESpeakingRAExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/RS/:examId"
          Component={withBootstrap(LivePTESpeakingRSExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/DI/:examId"
          Component={withBootstrap(LivePTESpeakingDIExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/RL/:examId"
          Component={withBootstrap(LivePTESpeakingRLExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/ASQ/:examId"
          Component={withBootstrap(LivePTESpeakingASQExam)}
        />
        <Route
          path="/PTE/IELTS/Speaking/RTS/:examId"
          Component={withBootstrap(LivePTESpeakingRTS)}
        />
        <Route
          path="/PTE/IELTS/Speaking/SGD/:examId"
          Component={withBootstrap(LivePTESpeakingSGD)}
        />
        <Route
          path="/PTE-Academic/MockTest/:examId"
          Component={withBootstrap(PTEMockTestLive)}
        />
      </Routes>
    </div>
  );
};

export default App;
