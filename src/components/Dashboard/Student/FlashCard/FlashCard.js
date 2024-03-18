import React, { useEffect, useState } from "react";
import "../../../../css/student panel/fleshcards.css";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import FlashCardModal from "./FlashCardModal";

const FlashCard = () => {
  const { state: { enrolledCourse } = {} } = useLocation();
  const [flashCardList, setFlashCardList] = useState([]);
  const [isFlipped, setIsFlipped] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/get/flashcard/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setFlashCardList(
            response?.data.filter((item) =>
              enrolledCourse?.some((course) => course?.id === item.course?.id)
            )
          );

          const initialFlipState = response.data.reduce((acc, curr) => {
            acc[curr.id] = false;
            return acc;
          }, {});

          setIsFlipped(initialFlipState);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [enrolledCourse]);

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentCardIndex(0);
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Flash Cards</h4>
                    </div>
                    <div className="row">
                      {flashCardList &&
                        flashCardList.map(
                          ({
                            id,
                            description,
                            set_priority,
                            course,
                            flash_card_items,
                          }) => (
                            <div
                              key={id}
                              className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                              data-aos="fade-up"
                            >
                              <div
                                className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling"
                                onClick={() => setModalShow(true)}
                              >
                                <div className="gridarea__content">
                                  <div className="gridarea__heading">
                                    <h3>{course?.Course_Title}</h3>
                                  </div>
                                  <div className="zoom__meeting__id">
                                    <p>
                                      Description :{" "}
                                      <span
                                        style={{
                                          color: "#01579b",
                                          fontWeight: "700",
                                        }}
                                      >
                                        {description}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="zoom__meeting__id">
                                    <p>
                                      Priority :{" "}
                                      <span
                                        style={{
                                          color: "#01579b",
                                          fontWeight: "700",
                                        }}
                                      >
                                        {set_priority}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <FlashCardModal
                                show={modalShow}
                                onHide={handleCloseModal}
                                flash_card_items={flash_card_items}
                                isFlipped={isFlipped}
                                setIsFlipped={setIsFlipped}
                                currentCardIndex={currentCardIndex}
                                setCurrentCardIndex={setCurrentCardIndex}
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
