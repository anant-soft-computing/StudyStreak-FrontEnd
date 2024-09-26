import React from "react";

const ListeningMTInstruction = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">Mini Listening Test - Instructions</div>
      <div className="instruction-content">
        You will be given 1 section/audio track and you will have to answer a
        total of 10 questions based on those tracks. Once you click on the
        ‘Start the test’ button, the audio will start automatically. Enter your
        responses/answers in the spaces given with the questions. On the top
        right corner of this screen, you will find a Play button and a volume
        slider. Kindly click on Play and adjust the volume as per your comfort
        before starting the test.
      </div>
      <div className="instruction-note">
        Since this is a practice test, it will not be timed. You can also replay
        the track in case you wish to listen to it again before answering.
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
};

export default ListeningMTInstruction;
