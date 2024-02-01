import React from "react";

const ReadingTest = ({ readingData }) => {
  const handleClick = () => {
    Object.keys(readingData.IELTS).forEach((key) => {
      if (Array.isArray(readingData.IELTS[key])) {
        if (readingData.IELTS[key].length > 0) {
          window.open(`/practice-live-exam/IELTS/${key}/${readingData.id}`, "_blank");
        }
      }
    });
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-12">
          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
            <div className="gridarea__content ">
              <div className="gridarea__heading">
                <h3 className="text-center">
                  <div>{readingData?.IELTS?.Name}</div>
                </h3>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button className="default__button" onClick={handleClick}>
                  Take Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadingTest;
