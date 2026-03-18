import React, { useEffect, useState, useCallback, useReducer } from "react";
import "../../../../css/custom.css";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialNoteData = {
  note: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerNote = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialNoteData;
  }
  return { ...state, [action.type]: action.value };
};

const FloatingNote = ({ setIsFloatingNotes, lessonId, lessonName }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState([]);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const [noteData, dispatchNote] = useReducer(reducerNote, initialNoteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

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
  }, [lessonId, studentId]);

  const createNote = async (e) => {
    e.preventDefault();
    const { note } = noteData;
    if (!note || !lessonId) {
      setFormStatus({
        isError: true,
        errMsg: !note
          ? "Note is Required"
          : "Please choose at least one lesson before adding note",
        isSubmitting: false,
      });
      return;
    }
    const data = { note, lesson: lessonId, student: studentId };
    try {
      const response = await ajaxCall(
        "/notes/createview/",
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
        dispatchNote({ type: "reset" });
        setIsFloatingNotes(false);
        toast.success("Note Created Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, handleMouseUp]);

  return (
    <div
      className="floating-note"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      {notes?.length > 0 && (
        <div>
          <h6>Pervious Notes :</h6>
          <div
            className="aboutarea__list__2"
            style={{ backgroundColor: "#ebeff2" }}
          >
            <div style={{ paddingLeft: "7px" }}>
              {notes?.map((note) => (
                <ul key={note.id} style={{ paddingLeft: "10px" }}>
                  <li>
                    <i className="icofont-check"></i>
                    <span>{note.note}</span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
      <textarea
        placeholder="Type your lesson notes here..."
        value={noteData.note}
        onChange={(e) => {
          dispatchNote({ type: "note", value: e.target.value });
        }}
        className="mt-2"
      />
      <div className="button-container-for-floating-notes">
        <div className={formStatus.isError && "text-danger mb-2"}>
          {formStatus.errMsg}
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="default__button"
            onClick={() => setIsFloatingNotes(false)}
          >
            Cancel
          </button>
          <button className="default__button" onClick={createNote}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingNote;
