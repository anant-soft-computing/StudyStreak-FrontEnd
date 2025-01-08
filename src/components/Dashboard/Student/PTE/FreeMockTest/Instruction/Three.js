import React from "react";
import headset from "../../../../../../img/service/headset.png";

const Three = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Headset Check </h3>
      <div className="instruction-content">
        This is an opportunity to check that your headset is working correctly.
      </div>

      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> Put your headset on and adjust it.
            so that it fits comfortably over your ears.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> When you are ready, click on the{" "}
            <b className="text-danger">Play</b> button. You will hear a short
            recording.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> If you are not hearing anything in
            your headphones while the status reads{" "}
            <b className="text-danger">Playing</b>, raise your hand to get the
            attention of Test Administrator.
          </li>
        </ul>

        <div
          style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid #01579b",
            borderRadius: "10px",
          }}
        >
          <span>Status : Click Play To Begin</span>
          <audio className="mt-3" controls></audio>
        </div>

        <ul>
          <li>
            <i className="icofont-check"></i> During the test you will not have{" "}
            <b className="text-danger">Play</b> and{" "}
            <b className="text-danger">Stop</b> buttons. The audio recording
            will start playing automatically.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> Please don't remove your headset.
            You should wear it throughout the test.
          </li>
        </ul>

        <div>
          <img
            src={headset}
            alt="Head phone"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "1px solid #01579b",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Three;
