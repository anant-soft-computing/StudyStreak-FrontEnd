import React from "react";

const Two = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Non-Disclosure Agreement Reminder</h3>
      <div className="instruction-content">
        This is a Reminder of the non-disclosure aggrement that you accepted
        when you scheduled and stated this test.
      </div>

      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> Make sure the microphone access is
            grantet for the studystreak.in
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> Make sure that Auto audio play is
            enable in your browser.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Two;
