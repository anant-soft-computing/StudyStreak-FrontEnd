import React, { useState } from "react";
import SmallModal from "../../../UI/Modal";
import cpuJack from "../../../../img/service/img.png";
import { instructionsData } from "../MockTest/Speaking";

const SpeakingTest = ({ speakingData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleTakeTestClick = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedData({});
    setIsModalOpen(false);
  };

  const handleClickStartExam = () => {
    Object?.keys(selectedData?.IELTS)?.forEach((key) => {
      if (Array.isArray(selectedData?.IELTS[key])) {
        if (selectedData?.IELTS[key]?.length > 0) {
          window.open(
            `/practice-live-exam/IELTS/${key}/${selectedData.id}`,
            "_blank"
          );
        }
      }
    });
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
        {speakingData.map((data, index) => (
          <div className="col-lg-4 col-md-6 col-12" key={index}>
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling d-flex flex-column justify-content-between">
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
                    onClick={() => handleTakeTestClick(data)}
                  >
                    Take Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default SpeakingTest;
