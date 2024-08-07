import { useState } from "react";
import { useParams } from "react-router-dom";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import ReactPlayer from "react-player";
import ajaxCall from "../../../../helpers/ajaxCall";
import noteBook from "../../../../img/icon/notebook.svg";
import FloatingNote from "./FloatingNote";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Attachment" }, { name: "Assignment" }];

const LessonContent = ({ activeLesson, activeContentType }) => {
  const { courseId } = useParams();
  const [isFloatingNotes, setIsFloatingNotes] = useState(false);
  const [activeTab, setActiveTab] = useState("Attachment");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

  const handleProgress = (state) => {
    if (!state.seeking) {
      if (state.playedSeconds % 10 < 1) {
        updateWatchedUpto(state.playedSeconds);
      }
    }
  };

  return (
    <div className="lesson__content__main">
      {activeContentType === "video" && (
        <div>
          <div className="plyr__video-embed rbtplayer">
            <ReactPlayer
              url={
                activeLesson?.timestamp !== undefined &&
                `${activeLesson?.Lesson_Video?.replace(
                  "watch?v=",
                  "embed/"
                )}?start=${activeLesson?.timestamp}`
              }
              onProgress={handleProgress}
              controls
              height={"590px"}
              width={"100%"}
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
              </div>
            </div>
          )}
        </div>
      )}
      {isFloatingNotes && (
        <FloatingNote
          setIsFloatingNotes={setIsFloatingNotes}
          lessonId={activeLesson?.id}
          lessonName={activeLesson?.Lesson_Title}
        />
      )}
    </div>
  );
};

export default LessonContent;
