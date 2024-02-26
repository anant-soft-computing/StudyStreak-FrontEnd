import { useParams } from "react-router-dom";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import Quiz from "./Quiz";
import ReactPlayer from "react-player";
import ajaxCall from "../../../../helpers/ajaxCall";

const LessonContent = ({ activeLesson, activeContentType }) => {
  const { courseId } = useParams();

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
        <>
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
            />
          </div>
        </>
      )}
      {activeContentType === "attachment" && (
        <Attachment
          activeLesson={activeLesson}
          lessonName={activeLesson?.Lesson_Title}
        />
      )}
      {activeContentType === "quiz" && <Quiz activeLesson={activeLesson} />}
      {activeContentType === "assignment" && (
        <Assignment
          activeLesson={activeLesson}
          lessonName={activeLesson?.Lesson_Title}
        />
      )}
    </div>
  );
};

export default LessonContent;
