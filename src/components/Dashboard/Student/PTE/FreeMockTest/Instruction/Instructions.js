import React, { useEffect, useState } from "react";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import Six from "./Six";
import SmallModal from "../../../../../UI/Modal";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const Instructions = () => {
  const instructions = [
    <One />,
    <Two />,
    <Three />,
    <Four />,
    <Five />,
    <Six />,
  ];
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullLengthTestData, setFullLengthTestData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/get/flt/",
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
        if (response.status === 200) {
          const fullLengthTest = response.data.filter(({ name }) =>
            name.includes("PTE")
          )[0];
          setFullLengthTestData(fullLengthTest);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleNext = () => {
    if (currentIndex < instructions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setOpen(false);
    } else {
      window.open(`/PTE-Academic/MockTest/${fullLengthTestData?.id}`, "_blank");
    }
  };

  return (
    <div>
      <div>{instructions[currentIndex]}</div>
      <div className="d-flex justify-content-end m-5">
        <button
          className="default__button"
          onClick={() => {
            if (currentIndex < instructions.length - 1) {
              setOpen(true);
            } else {
              window.open(
                `/PTE-Academic/MockTest/${fullLengthTestData?.id}`,
                "_blank"
              );
            }
          }}
        >
          Next
        </button>
      </div>
      {currentIndex < instructions.length - 1 && (
        <SmallModal
          centered
          isOpen={open}
          onClose={() => setOpen(false)}
          footer={
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-success" onClick={handleNext}>
                Yes
              </button>
              <button className="btn btn-danger" onClick={() => setOpen(false)}>
                No
              </button>
            </div>
          }
          title="PTE-Academic Mock Test"
        >
          Do you want to go to the next?
        </SmallModal>
      )}
    </div>
  );
};

export default Instructions;
