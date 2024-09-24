import React from "react";

function ListeningInstruction({ testType, startTest }) {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        {testType} Listening Test - Instructions
      </div>
      <div className="instruction-content">
        You will be given 4 sections/audio tracks and you will have to answer a
        total of 40 questions based on those tracks. Once you click on the
        ‘Start the test’ button, the audio will start automatically. Enter your
        responses/answers in the spaces given with the questions. On the top
        right corner of this screen, you will find a Play button and a volume
        slider. Kindly click on Play and adjust the volume as per your comfort
        before starting the test.
      </div>
      <div className="instruction-note">
        Since this is a {testType} Test, it will be timed. You cannot replay the
        track. You will hear the conversations only once.
      </div>
      <p className="instruction-wishes">Good Luck!</p>
      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("listening")}>
        Start test
      </button>
    </div>
  );
}

export default ListeningInstruction;
