import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import Quiz from "./Quiz";
import ReactPlayer from "react-player";
import ajaxCall from "../../../../helpers/ajaxCall";
import noteBook from "../../../../img/icon/notebook.svg";
import viewNote from "../../../../img/icon/tv.svg";
import FloatingNote from "./FloatingNote";
import SmallModal from "../../../UI/Modal";
import FlashCard from "../FlashCard/FlashCard";

const LessonContent = ({ activeLesson, activeContentType }) => {
  const { courseId } = useParams();
  const [isFloatingNotes, setIsFloatingNotes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const lessonId = activeLesson?.id;
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/notes/${lessonId}/${studentId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );

        if (response?.status === 200) {
          setNotes(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [lessonId, studentId, isFloatingNotes]);

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
              <img
                src={viewNote}
                alt="notes"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
              <ul
                className="nav  about__button__wrap dashboard__button__wrap"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    style={{
                      backgroundColor: "#e1f5fe",
                      color: "#01579b",
                    }}
                    className="single__tab__link active"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__one"
                    type="button"
                    aria-selected="true"
                    role="tab"
                  >
                    Attachment
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    style={{
                      backgroundColor: "#e1f5fe",
                      color: "#01579b",
                    }}
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__two"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex="-1"
                  >
                    Assignment
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    style={{
                      backgroundColor: "#e1f5fe",
                      color: "#01579b",
                    }}
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__three"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex="-1"
                  >
                    Quiz
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    style={{
                      backgroundColor: "#e1f5fe",
                      color: "#01579b",
                    }}
                    className="single__tab__link"
                    data-bs-toggle="tab"
                    data-bs-target="#projects__four"
                    type="button"
                    aria-selected="false"
                    role="tab"
                    tabIndex="-1"
                  >
                    Flash Card
                  </button>
                </li>
              </ul>
            </div>
            <div
              className="tab-content tab__content__wrapper aos-init aos-animate"
              id="myTabContent"
              data-aos="fade-up"
            >
              <div
                className="tab-pane fade active show"
                id="projects__one"
                role="tabpanel"
                aria-labelledby="projects__one"
              >
                <div>
                  <Attachment
                    activeLesson={
                      activeLesson?.attachment_lession_count?.attachments
                    }
                    lessonName={activeLesson?.Lesson_Title}
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="projects__two"
                role="tabpanel"
                aria-labelledby="projects__two"
              >
                <Assignment
                  activeLesson={activeLesson?.lesson_assignment}
                  lessonName={activeLesson?.Lesson_Title}
                />
              </div>
              <div
                className="tab-pane fade"
                id="projects__three"
                role="tabpanel"
                aria-labelledby="projects__three"
              >
                <Quiz activeLesson={activeLesson?.quiz_question_options} />
              </div>
              <div
                className="tab-pane fade"
                id="projects__four"
                role="tabpanel"
                aria-labelledby="projects__four"
              >
                <FlashCard courseId={courseId} />
              </div>
            </div>
          </div>
        </div>
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
      <div>
        {isFloatingNotes && (
          <FloatingNote
            setIsFloatingNotes={setIsFloatingNotes}
            lessonId={activeLesson?.id}
          />
        )}
      </div>
      <SmallModal
        size="md"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Notes"}
      >
        <div className="aboutarea__list__2">
          {notes?.map((note) => (
            <ul key={note.id}>
              <li>
                <i className="icofont-check"></i>
                <span>{note.note}</span>
              </li>
            </ul>
          ))}
        </div>
      </SmallModal>
    </div>
  );
};

export default LessonContent;
