import Assignment from "./Assignment";
import Attachment from "./Attachment";
import Quiz from "./Quiz";

const LessonContent = ({ activeLesson, activeContentType }) => {
  return (
    <div className="lesson__content__main">
      {activeContentType === "video" && (
        <>
          <div className="plyr__video-embed rbtplayer">
            <iframe
              src={activeLesson?.Lesson_Video?.replace("watch?v=", "embed/")}
              allow="autoplay"
              allowFullScreen
              title="YouTube video player"
              frameBorder="0"
              className="video"
            ></iframe>
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