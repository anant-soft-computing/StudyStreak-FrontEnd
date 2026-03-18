import React from "react";

const Path = () => {
  return (
    <div className="container-fluid full__width__padding mt-4">
      <div className="row">
        <div className="section__title text-center">
          <div className="section__title__button">
            <div className="default__small__button">Select Your Path</div>
          </div>
          <div className="path__main">
            Choose your English proficiency exam to fulfill your dream of
            Overseas Education and <br></br> Immigration purpose with the Mock
            Test and Practice Test.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="single__blog__wraper">
            <div className="single__blog__content">
              <span className="path__ielts">IELTS</span>
              <div className="description">
                For real-time exam experience, practice on our platform to
                access your skill and proficiency in CD-IELTS.
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12">
          <div className="single__blog__wraper">
            <div className="single__blog__content">
              <span className="path__pte">PTE</span>
              <div className="description">
                Prepare with scored PTE mock test, section-wise test &
                question-wise practice test to achieve your desired score.
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 mt-4">
          <div className="single__blog__wraper">
            <div className="single__blog__content">
              <span className="path__tofel">TOFEL</span>
              <div className="description">
                Get updated, latest, and optimized practice tests and improve
                your chances of success in the TOFEL test.
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12 mt-4">
          <div className="single__blog__wraper">
            <div className="single__blog__content">
              <span className="path__duolingo">DUOLINGO</span>
              <div className="description">
                The Duolingo English Test is a modern English proficiency
                assessment for today’s international students.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Path;
