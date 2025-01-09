import React from "react";
import ti1 from "../../../../../../img/service/ti1.png";
import ti2 from "../../../../../../img/service/ti2.png";
import ti3 from "../../../../../../img/service/ti3.png";

const Six = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Test Introduction</h3>
      <div className="instruction-content">
        This test measures the Reading, Writing, Listening and Speaking skills
        in English that you will need in an academic setting.
      </div>
      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> The test is devided into 3 parts.
            Each part may contain a number of sections. The sections are
            individually timed. The timer will be shown in the top right corner
            of your screen. The number of items in the section will also
            bedisplayed.
          </li>
        </ul>
        <div>
          <img src={ti1} alt="ti1" className="instruction-test-image" />
        </div>
        <ul className="mt-3">
          <li>
            <i className="icofont-check"></i> The timer will become red when
            there is less than 5 minutes remaining for thasection. The timer can
            be hidden by clicking on the clock icon with the mouse. Click on the
            icon again to bring the timer back.
          </li>
        </ul>
        <div className="d-flex flex-column flex-md-row gap-3">
          <div>
            <img src={ti2} alt="ti2" className="instruction-test-image" />
          </div>
          <div>
            <img src={ti3} alt="ti3" className="instruction-test-image" />
          </div>
        </div>
        <ul className="mt-3">
          <li>
            <i className="icofont-check"></i> At the beginning of each part you
            will receive instructions. These will provide details on what to
            expect in the part of the test.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> By clicking on the Next(N) button
            at the bottom of each screen you confirm your answer and move to the
            next question. If you click on Next(N) you will not be able to
            return the previouse question. You will not be able to revisit any
            question at the end of the test.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> You will be offered a break of up
            to 10 minutes after part 2. The break is optional.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> This test makes use of different
            varieties of English, for example, British, American, Australian.
            You can answer in the standard English variety of your choice.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Six;
