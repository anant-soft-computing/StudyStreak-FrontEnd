import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { NotebookText } from "lucide-react";
import Quiz from "./Quiz";
import Tab from "../../../UI/Tab";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import FloatingNote from "./FloatingNote";
import ajaxCall from "../../../../helpers/ajaxCall";

const tabs = [{ name: "Assignment" }, { name: "Attachment" }, { name: "Quiz" }];

const LessonContent = ({ activeLesson, setLessonStatus, onLessonComplete }) => {
  const videoRef = useRef(null);
  const { courseId } = useParams();
  const completionAttempted = useRef(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [activeTab, setActiveTab] = useState("Assignment");
  const [isFloatingNotes, setIsFloatingNotes] = useState(false);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  // Reset completion state when lesson changes
  useEffect(() => {
    setIsLessonComplete(false);
    completionAttempted.current = false;
  }, [activeLesson?.id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const startTime = activeLesson?.timestamp
    ? parseFloat(activeLesson?.timestamp)
    : 0;

  const updateWatchedUpto = async (watchedTime) => {
    if (watchedTime < 1) return;
    try {
      const body = {
        timestamp: watchedTime,
        course: courseId,
        lesson: activeLesson?.id,
      };
      const response = await ajaxCall(
        "/save-video-data/",
        {
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
        },
        8000
      );

      if (response.status !== 200 && response.status !== 201) {
        console.log("error updating watchedTime:", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const completeLesson = async () => {
    if (isLessonComplete || completionAttempted.current) return;

    completionAttempted.current = true;

    try {
      const body = {
        student_id: studentId,
        lesson_ids: [activeLesson?.id],
      };

      const response = await ajaxCall(
        "/enroll-lesson/",
        {
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
        },
        8000
      );

      if (response.status === 201) {
        setIsLessonComplete(true);
        setLessonStatus("Complete");
        if (onLessonComplete) {
          onLessonComplete(activeLesson?.id);
        }
        await gamificationSubmit(activeLesson?.id);
        toast.success("Lesson Completed Successfully!");
      } else {
        console.log("Failed to complete lesson");
      }
    } catch (error) {
      console.log("error", error);
      completionAttempted.current = false;
    }
  };

  const gamificationSubmit = async (lessonID) => {
    try {
      const response = await ajaxCall(
        "/gamification/points/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            model: "Lesson",
            object_id: lessonID,
          }),
        },
        8000
      );

      if (response.status === 201) {
        toast.success("Points Updated Successfully");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const handleProgress = (state) => {
    if (!state.seeking) {
      // Update watched time every 10 seconds
      if (state.playedSeconds % 10 < 1) {
        updateWatchedUpto(state.playedSeconds);
      }

      // Check if video is near the end (within last 2 seconds)
      if (
        videoDuration > 0 &&
        state.playedSeconds >= videoDuration - 2 &&
        !isLessonComplete &&
        !completionAttempted.current
      ) {
        completeLesson();
      }
    }
  };

  const handleEnded = () => {
    if (!isLessonComplete && !completionAttempted.current) {
      completeLesson();
    }
  };

  return (
    <div
      className="lesson__content__main"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div>
        <div className="plyr__video-embed rbtplayer">
          <ReactPlayer
            ref={videoRef}
            url={activeLesson?.Lesson_Video}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            controls
            height="100%"
            width="100%"
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
              },
            }}
            progressInterval={1000}
            onStart={() => videoRef.current.seekTo(startTime, "seconds")}
          />
          <div className="floating-notes-container-icon">
            <NotebookText
              onClick={() => setIsFloatingNotes(!isFloatingNotes)}
            />
          </div>
        </div>
        {activeLesson?.Lesson_Video && (
          <div className="row mt-3">
            <Tab
              tabs={tabs}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            <div className="tab-content tab__content__wrapper aos-init aos-animate">
              <div
                className={`tab-pane fade ${
                  activeTab === "Attachment" ? "show active" : ""
                }`}
              >
                <div className="row">
                  <Attachment
                    activeLesson={
                      activeLesson?.attachment_lession_count?.attachments
                    }
                  />
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Assignment" ? "show active" : ""
                }`}
              >
                <div className="row">
                  <Assignment activeLesson={activeLesson?.lesson_assignment} />
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "Quiz" ? "show active" : ""
                }`}
              >
                <div className="row">
                  <Quiz activeLesson={activeLesson?.quiz_question_options} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isFloatingNotes && (
        <FloatingNote
          lessonId={activeLesson?.id}
          setIsFloatingNotes={setIsFloatingNotes}
          lessonName={activeLesson?.Lesson_Title}
        />
      )}
    </div>
  );
};

export default LessonContent;
