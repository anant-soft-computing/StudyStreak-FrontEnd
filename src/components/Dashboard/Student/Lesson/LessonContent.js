import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import Quiz from "./Quiz";
import ReactPlayer from "react-player";
import ajaxCall from "../../../../helpers/ajaxCall";
import noteBook from "../../../../img/icon/notebook.svg";
import FloatingNote from "./FloatingNote";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Attachment" }, { name: "Assignment" }, { name: "Quiz" }];

const LessonContent = ({ activeLesson, setLessonStatus }) => {
  const videoRef = useRef(null);
  const { courseId } = useParams();
  const [isFloatingNotes, setIsFloatingNotes] = useState(false);
  const [activeTab, setActiveTab] = useState("Attachment");
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const startTime = activeLesson?.timestamp
    ? parseFloat(activeLesson?.timestamp)
    : 0;

  const updateWatchedUpto = async (watchedTime) => {
    if (watchedTime < 1) return;
    const body = {
      timestamp: watchedTime,
      course: courseId,
      lesson: activeLesson?.id,
    };
    const response = await ajaxCall(
      `/save-video-data/`,
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

    if (response.status === 200) {
      console.log("watchedTime updated");
    } else {
      console.log("error");
    }
  };

  const gamificationSubmit = async (lessonID) => {
    const data = {
      model: "Lesson",
      object_id: lessonID,
    };
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
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Points Updated Successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const completeLesson = async () => {
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
      gamificationSubmit(activeLesson?.id);
      toast.success("Lesson Completed Successfully!");
    } else {
      console.log("error");
    }
  };

  const handleProgress = (state) => {
    if (!state.seeking) {
      if (state.playedSeconds % 10 < 1) {
        updateWatchedUpto(state.playedSeconds);
      }

      // Check if the lesson is complete
      const videoDuration = videoRef.current?.getDuration();
      if (
        videoDuration &&
        state.playedSeconds >= videoDuration - 1 &&
        !isLessonComplete
      ) {
        completeLesson();
      }
    }
  };

  return (
    <div
      className="lesson__content__main"
      onContextMenu={(e) => e.preventDefault()}
    >
      {
        <div>
          <div className="plyr__video-embed rbtplayer">
            <ReactPlayer
              ref={videoRef}
              url={activeLesson?.Lesson_Video}
              onProgress={handleProgress}
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
              <img
                src={noteBook}
                alt="notes"
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
                    <Assignment
                      activeLesson={activeLesson?.lesson_assignment}
                    />
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
      }
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
