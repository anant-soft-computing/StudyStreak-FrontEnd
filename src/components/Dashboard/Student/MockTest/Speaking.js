import React, { useState } from "react";
import { Link } from "react-router-dom";
import cpuJack from "../../../../img/service/img.png";
import SmallModal from "../../../UI/Modal";

export const instructionsData = [
  {
    instruction: "This test will last for about 11 to 14 minutes.",
  },
  {
    instruction:
      "Once you start the test, you will find an examiner on the left half of the screen and a microphone icon on the right. Play the video. The examiner will ask you a series of questions. At the end of each question, press the microphone icon and record your answer/response.",
  },
  {
    instruction:
      "You will not need a headphone if you are using a laptop that has a functional microphone. But in case you are attempting this speaking session on your desktop computer, please ensure that you put on a headphone with a microphone to speak into and record your responses to the questions asked by the examiner.",
  },
  {
    instruction:
      "In case of a desktop PC, plug in both the microphone cord and the headphone cord at the back of your CPU.",
  },
  {
    instruction:
      "All the instructions will be given to you by the examiner. So listen carefully and respond in a clear voice.",
  },
  {
    instruction:
      "Once you have submitted the test, you will get a report in which you can listen to your own answers as you’ve spoken.",
  },
  {
    instruction:
      "Please ensure that you have a good internet connectivity for a smooth speaking session.",
  },
];

const Speaking = ({ speakingData, givenTest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const handleTakeTestClick = (id) => {
    setSelectedTestId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTestId(null);
    setIsModalOpen(false);
  };

  const handleClickStartExam = () => {
    window.open(`/live-exam/${selectedTestId}`, "_blank");
    handleCloseModal();
  };

  const Instructions = () => {
    return (
      <div>
        {instructionsData?.map(({ instruction }, index) => (
          <div className="d-flex justify-content-start mb-2">
            <div>{index + 1}.</div>
            <div className="instruction">{instruction}</div>
          </div>
        ))}
        <img
          src={cpuJack}
          alt="Mic & Headphone Jack"
          height={200}
          width={250}
        />
      </div>
    );
  };

  return (
    <>
      <div className="row">
        {speakingData?.map(
          ({ id, exam_name, no_of_questions, difficulty_level }) => (
            <div className="col-lg-4 col-md-6 col-12" key={id}>
              <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid tagMain global-neomorphism-card-styling d-flex flex-column justify-content-between">
                {givenTest.some((test) => test.id === id) && (
                  <span className="tag">Given</span>
                )}
                <div className="gridarea__content ">
                  <div className="gridarea__heading mt-3">
                    <h3 className="text-center">
                      <Link to={`/live-exam/${id}`} target="_blank">
                        {exam_name}
                      </Link>
                    </h3>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Questions : <span>{no_of_questions}</span>
                    </p>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Difficulty Level : <span>{difficulty_level}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      className="default__button"
                      onClick={() => handleTakeTestClick(id)}
                    >
                      Take Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Instructions For The Test"
        footer={
          <button className="default__button" onClick={handleClickStartExam}>
            Start Test
          </button>
        }
      >
        <Instructions />
      </SmallModal>
    </>
  );
};

export default Speaking;
