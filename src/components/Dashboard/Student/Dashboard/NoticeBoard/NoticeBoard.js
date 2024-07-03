import React from "react";

const notices = [
  { text: "USA webinar tomorrow at 7 pm Register." },
  {
    text: "Free Speaking Competition for all Canada aspirants in Pune View more details.",
  },
  { text: "Classes cancelled as Holiday on May 1st - Labour Day." },
  { text: "Submit your interest for becoming a tutor with us." },
];

const NoticeBoard = () => {
  return (
    <div className="dashboard__inner card-background">
      <div className="dashboard__nav__title">
        <h6>Notice Board</h6>
      </div>
      <hr />
      <div className="course__list__wraper">
        <div className="aboutarea__list__2 blog__details__list__2">
          {notices.map((notice, index) => (
            <ul key={index} className="list-unstyled">
              <li
                style={{ padding: "8px" }}
                className={index % 2 === 0 ? "dashboard__table__row" : ""}
              >
                <span>{index + 1}.</span>&nbsp;
                <span>{notice.text}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
