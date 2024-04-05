import React from "react";
import "../../../../css/custom.css";
import cpuJack from "../../../../img/service/img.png";
import { useLocation, useNavigate } from "react-router-dom";

const SpeakingInstruction = () => {
  const navigate = useNavigate();
  const { id, data, test } = useLocation()?.state || {};

  const handleClickStartTest = () => {
    if (test === "Mini Test") {
      window.open(`/live-exam/${id}`, "_blank");
      navigate("/mockTest");
    } else
      Object?.keys(data?.IELTS)?.forEach((key) => {
        if (Array.isArray(data?.IELTS[key])) {
          if (data?.IELTS[key]?.length > 0) {
            window.open(
              `/practice-live-exam/IELTS/${key}/${data.id}`,
              "_blank"
            );
            navigate("/practiceTest");
          }
        }
      });
  };

  return (
    <div className="mainWrap">
      <h1>
        <strong>Instructions For Test</strong>
      </h1>

      <div className="mainContent11">
        This test will last for about 11 to 14 minutes.
      </div>

      <div className="mainContent11">
        Once you start the test, you will find an examiner on the left half of
        the screen and a microphone icon on the right. Play the video. The
        examiner will ask you a series of questions. At the end of each
        question, press the microphone icon and record your answer/response.
      </div>

      <div className="mainContent11">
        You will not need a headphone if you are using a laptop that has a
        functional microphone. But in case you are attempting this speaking
        session on your desktop computer, please ensure that you put on a
        headphone with a microphone to speak into and record your responses to
        the questions asked by the examiner.
      </div>

      <div className="mainContent11">
        In case of a desktop PC, plug in both the microphone cord and the
        headphone cord at the back of your CPU.
      </div>

      <div className="mainContent11">
        All the instructions will be given to you by the examiner. So listen
        carefully and respond in a clear voice.
      </div>

      <div className="mainContent11">
        Once you have submitted the test, you will get a report in which you can
        listen to your own answers as you’ve spoken.
      </div>

      <div className="mainContent11">
        Please ensure that you have a good internet connectivity for a smooth
        speaking session.
      </div>

      <img src={cpuJack} alt="Mic & Headphone Jack"></img>

      <div className="text-center">
        <button className="default__button" onClick={handleClickStartTest}>
          Start Test
        </button>
      </div>
    </div>
  );
};

export default SpeakingInstruction;
