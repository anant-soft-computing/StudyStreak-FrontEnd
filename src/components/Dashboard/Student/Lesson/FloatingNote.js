import React, { useEffect, useState } from "react";
import "../../../../css/student panel/myCourse.css";

const FloatingNote = ({ setIsFloatingNotes }) => {
  const [noteText, setNoteText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleCancelClick = () => {
    setIsFloatingNotes(false);
    setNoteText("");
  };

  const handleMouseDown = (e) => {
    // Setting the dragging true when mouse is clicked.
    setIsDragging(true);
    // Setting the initial position of mouse.
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    // if isDragging is false, we'll do nothing.
    if (!isDragging) return;
    // if isFragging is true, we'll update the position accoring to the mouse moves.
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    // once cursor leave the floating note, setting the dragging false.
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="floating-note"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type your notes here..."
        />
      </div>
      <div className="button-container-for-floating-notes">
        <button className="default__button" onClick={handleCancelClick}>
          Cancel
        </button>
        <button className="default__button">Save</button>
      </div>
    </div>
  );
};

export default FloatingNote;
