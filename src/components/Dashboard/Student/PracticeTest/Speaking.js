import React from "react";

const SpeakingTest = ({ speakingData, givenTest }) => {
  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(`/PracticeLiveExam/IELTS/${key}/${data.id}`, "_blank");
        }
      }
    });
  };

  return (
    <div className="row">
      {speakingData.map((data, index) => (
        <div className="col-lg-4 col-md-6 col-12" key={index}>
          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling tagMain d-flex flex-column justify-content-between">
            {givenTest.some((test) => test.id === data.id) && (
              <span className="tag">Given</span>
            )}
            <div className="gridarea__content">
              <div className="gridarea__heading mt-3">
                <h3 className="text-center">
                  <div>{data?.IELTS?.Name}</div>
                </h3>
              </div>
              <div className="d-flex justify-content-between">
                <div className="zoom__meeting__id">
                  <div>
                    Sections :<span>3</span>
                  </div>
                </div>
                <div className="zoom__meeting__id">
                  <div>
                    Time :<span>15 Mintues</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-center mt-2 mb-3">
                <button
                  className="default__button"
                  onClick={() => handleClick(data)}
                >
                  Take Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpeakingTest;
