import React, { useEffect, useRef } from "react";

const Description = ({ courseDetail }) => {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const ulElements = descriptionRef.current.querySelectorAll("ul");
      ulElements.forEach((ul) => {
        ul.style.display = "grid";
        ul.style.listStyle = "disc";
      });
    }
  }, [courseDetail]);

  return (
    <div
      className="tab-pane fade"
      id="projects__two"
      role="tabpanel"
      aria-labelledby="projects__two"
    >
      <div className="experence__heading">
        <h5>Experience Description</h5>
      </div>
      <div className="experence__description" ref={descriptionRef}>
        <div
          dangerouslySetInnerHTML={{
            __html: courseDetail?.Description,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Description;